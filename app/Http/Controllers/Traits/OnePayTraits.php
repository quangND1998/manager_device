<?php

/**
 * OnePay Abstract Request
 */

namespace App\Http\Controllers\Traits;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\_Const\Payments\OnePayTest;
trait OnePayTraits
{
    // do
    public $virtualPaymentClientURL_DO = 'https://onepay.vn/paygate/vpcpay.op';
    // qr
    public $virtualPaymentClientURL_QueryQR = 'https://onepay.vn/msp/api/v1/vpc/invoices/queries';
    public  $SECURE_SECRET = '6D0870CDE5F24F34F3915FB0045120DB';
    public function generateDataWithChecksum($data)
    {

        $vpcURL = 'https://mtf.onepay.vn/paygate/vpcpay.op?';
        ksort($data);

        $stringHashData = "";
        $appendAmp = 0;
        foreach ($data as $key => $value) {
            if (strlen($value) > 0) {
                if ($appendAmp == 0) {
                    $vpcURL .= urlencode($key) . '=' . urlencode($value);
                    $appendAmp = 1;
                } else {
                    $vpcURL .= '&' . urlencode($key) . "=" . urlencode($value);
                }
                if ((strlen($value) > 0) && ((substr($key, 0, 4) == "vpc_") || (substr($key, 0, 5) == "user_"))) {
                    $stringHashData .= $key . "=" . $value . "&";
                }
            }
        }
        $stringHashData = rtrim($stringHashData, "&");
        if (strlen($this->SECURE_SECRET) > 0) {
            // Thay hàm mã hóa dữ liệu
            $vpcURL .= "&vpc_SecureHash=" . strtoupper(hash_hmac('SHA256', $stringHashData, pack('H*', $this->SECURE_SECRET)));
        }

        return $vpcURL;
    }
    public function checkdatapayment($data)
    {
        $data['vpc_Merchant'] = config('constants.VPC_MERCHANT');
        $data['vpc_AccessCode'] = config('constants.VPC_ACCESSCODE');
        $data['vpc_Version'] = config('constants.VPC_VERSION');
        $data['vpc_Command'] = config('constants.VPC_COMMAND');
        $data['vpc_Locale'] = config('constants.VPC_LOCADE');

        // $data['vpc_Merchant'] = 'OP_HOLOMIA';
        // $data['vpc_AccessCode'] = 'E1508B04';
        // $data['vpc_Version'] = '2';
        // $data['vpc_Command'] = 'pay';
        // $data['vpc_Locale'] = 'en';

        $vpc_trait = $this->generateDataWithChecksum($data);
        return $vpc_trait;
    }
    public function responseDefault()
    {
        $SECURE_SECRET = $this->SECURE_SECRET;

        //dd($_GET);
        // get and remove the vpc_TxnResponseCode code from the response fields as we
        // do not want to include this field in the hash calculation
        $vpc_Txn_Secure_Hash = $_GET["vpc_SecureHash"];
        $vpc_MerchTxnRef = $_GET["vpc_MerchTxnRef"];

        unset($_GET["vpc_SecureHash"]);
        // set a flag to indicate if hash has been validated
        $errorExists = false;

        if (strlen($SECURE_SECRET) > 0 && $_GET["vpc_TxnResponseCode"] != "7" && $_GET["vpc_TxnResponseCode"] != "No Value Returned") {

            ksort($_GET);
            //$md5HashData = $SECURE_SECRET;
            //khởi tạo chuỗi mã hóa rỗng
            $md5HashData = "";
            // sort all the incoming vpc response fields and leave out any with no value
            foreach ($_GET as $key => $value) {
                //        if ($key != "vpc_SecureHash" or strlen($value) > 0) {
                //            $md5HashData .= $value;
                //        }
                //      chỉ lấy các tham số bắt đầu bằng "vpc_" hoặc "user_" và khác trống và không phải chuỗi hash code trả về
                if ($key != "vpc_SecureHash" && (strlen($value) > 0) && ((substr($key, 0, 4) == "vpc_") || (substr($key, 0, 5) == "user_"))) {
                    $md5HashData .= $key . "=" . $value . "&";
                }
            }
            //  Xóa dấu & thừa cuối chuỗi dữ liệu
            $md5HashData = rtrim($md5HashData, "&");

            //    if (strtoupper ( $vpc_Txn_Secure_Hash ) == strtoupper ( md5 ( $md5HashData ) )) {
            //    Thay hàm tạo chuỗi mã hóa
            if (strtoupper($vpc_Txn_Secure_Hash) == strtoupper(hash_hmac('SHA256', $md5HashData, pack('H*', $SECURE_SECRET)))) {
                // Secure Hash validation succeeded, add a data field to be displayed
                // later.
                $hashValidated = "CORRECT";
            } else {
                // Secure Hash validation failed, add a data field to be displayed
                // later.
                $hashValidated = "INVALID HASH";
            }
        } else {
            // Secure Hash was not validated, add a data field to be displayed later.
            $hashValidated = "INVALID HASH";
        }

        // Define Variables
        // ----------------
        // Extract the available receipt fields from the VPC Response
        // If not present then let the value be equal to 'No Value Returned'

        // Standard Receipt Data
        $amount = $this->null2unknown($_GET["vpc_Amount"]);
        // $acqResponseCode = $this->null2unknown($_GET["vpc_AcqResponseCode"]);
        $txnResponseCode = $this->null2unknown($_GET["vpc_TxnResponseCode"]);

        // 3-D Secure Data
        $verType = array_key_exists("vpc_VerType", $_GET) ? $_GET["vpc_VerType"] : "No Value Returned";
        $verStatus = array_key_exists("vpc_VerStatus", $_GET) ? $_GET["vpc_VerStatus"] : "No Value Returned";
        $token = array_key_exists("vpc_VerToken", $_GET) ? $_GET["vpc_VerToken"] : "No Value Returned";
        $verSecurLevel = array_key_exists("vpc_VerSecurityLevel", $_GET) ? $_GET["vpc_VerSecurityLevel"] : "No Value Returned";
        $enrolled = array_key_exists("vpc_3DSenrolled", $_GET) ? $_GET["vpc_3DSenrolled"] : "No Value Returned";
        $xid = array_key_exists("vpc_3DSXID", $_GET) ? $_GET["vpc_3DSXID"] : "No Value Returned";
        $acqECI = array_key_exists("vpc_3DSECI", $_GET) ? $_GET["vpc_3DSECI"] : "No Value Returned";
        $authStatus = array_key_exists("vpc_3DSstatus", $_GET) ? $_GET["vpc_3DSstatus"] : "No Value Returned";

        // *******************
        // END OF MAIN PROGRAM
        // *******************

        // FINISH TRANSACTION - Process the VPC Response Data
        // =====================================================
        // For the purposes of demonstration, we simply display the Result fields on a
        // web page.

        // Show 'Error' in title if an error condition
        $errorTxt = "";

        // Show this page as an error page if vpc_TxnResponseCode equals '7'
        if ($txnResponseCode == "7" || $txnResponseCode == "No Value Returned" || $errorExists) {
            $errorTxt = "Error ";
        }
        return $txnResponseCode;
    }
    private function getResponseDescription($responseCode)
    {

        switch ($responseCode) {
            case "0":
                $result = "Giao dịch thành công - Approved";
                break;
            case "1":
                $result = "Ngân hàng từ chối giao dịch - Bank Declined";
                break;
            case "3":
                $result = "Mã đơn vị không tồn tại - Merchant not exist";
                break;
            case "4":
                $result = "Không đúng access code - Invalid access code";
                break;
            case "5":
                $result = "Số tiền không hợp lệ - Invalid amount";
                break;
            case "6":
                $result = "Mã tiền tệ không tồn tại - Invalid currency code";
                break;
            case "7":
                $result = "Lỗi không xác định - Unspecified Failure ";
                break;
            case "8":
                $result = "Số thẻ không đúng - Invalid card Number";
                break;
            case "9":
                $result = "Tên chủ thẻ không đúng - Invalid card name";
                break;
            case "10":
                $result = "Thẻ hết hạn/Thẻ bị khóa - Expired Card";
                break;
            case "11":
                $result = "Thẻ chưa đăng ký sử dụng dịch vụ - Card Not Registed Service(internet banking)";
                break;
            case "12":
                $result = "Ngày phát hành/Hết hạn không đúng - Invalid card date";
                break;
            case "13":
                $result = "Vượt quá hạn mức thanh toán - Exist Amount";
                break;
            case "21":
                $result = "Số tiền không đủ để thanh toán - Insufficient fund";
                break;
            case "99":
                $result = "Người sủ dụng hủy giao dịch - User cancel";
                break;
            default:
                $result = "Giao dịch thất bại - Failured";
        }
        return $result;
    }

    private function null2unknown($data)
    {
        return ($data == "") ? "No Value Returned" : $data;
    }

    private function unicode2ascii($string)
    {
        $string_unicode = 'é,è,ẻ,ẽ,ẹ,ê,ế,ề,ể,ễ,ệ,ý,ỳ,ỷ,ỹ,ỵ,ú,ù,ủ,ũ,ụ,ư,ứ,ừ,ử,ữ,ự,í,ì,ỉ,ĩ,ị,ó,ò,ỏ,õ,ọ,ô,ố,ồ,ổ,ỗ,ộ,ơ,ớ,ờ,ở,ỡ,ợ,á,à,ả,ã,ạ,â,ấ,ầ,ẩ,ẫ,ậ,ă,ắ,ằ,ẳ,ẵ,ặ,đ,ð,ď,É,È,Ẻ,Ẽ,Ẹ,Ê,Ế,Ề,Ể,Ễ,Ệ,Ý,Ỳ,Ỷ,Ỹ,Ỵ,Ú,Ù,Ủ,Ũ,Ụ,Ư,Ứ,Ừ,Ử,Ữ,Ự,Í,Ì,Ỉ,Ĩ,Ị,Ó,Ò,Ỏ,Õ,Ọ,Ô,Ố,Ồ,Ổ,Ỗ,Ộ,Ơ,Ớ,Ờ,Ở,Ỡ,Ợ,Á,À,Ả,Ã,Ạ,Â,Ấ,Ầ,Ẩ,Ẫ,Ậ,Ă,Ắ,Ằ,Ẳ,Ẵ,Ặ,Ð,Ď,Đ';
        $string_abc = 'e,e,e,e,e,e,e,e,e,e,e,y,y,y,y,y,u,u,u,u,u,u,u,u,u,u,u,i,i,i,i,i,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,d,d,d,E,E,E,E,E,E,E,E,E,E,E,Y,Y,Y,Y,Y,U,U,U,U,U,U,U,U,U,U,U,I,I,I,I,I,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,D,D,D';

        $string_unicode_array = explode(",", $string_unicode);
        $string_abc_array = explode(",", $string_abc);

        $string = str_replace($string_unicode_array, $string_abc_array, $string);

        return $string;
    }

}
