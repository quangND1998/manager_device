<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Http\Controllers\Traits\OnePayTraits;
class OnePayController extends Controller
{
    use OnePayTraits;
    public function postDataPayment(Request $request)
    {
            $input_data = [];

            $input_data['vpc_Amount'] = 200* 100 * 25301;
            $input_data['vpc_MerchTxnRef']  = date('YmdHis') . rand() ."_". Auth::user()->id;

            $input_data['vpc_OrderInfo'] = 'ORDER_LICENSE';
            $input_data['vpc_ReturnURL'] = URL::to('/') . '/user/payment/response_order';
            $input_data['vpc_TicketNo'] = $current_date;
            $input_data['AgainLink']  = urlencode($_SERVER['HTTP_REFERER']);

            // dd($_POST);

            $vpcURL = $this->checkdatapayment($input_data);

            // return $input_data;
            //Session::forget('cart');

            return redirect($vpcURL);
    }

    public function responsePaymentOrder()
    {
        $txnResponseCode = $this->responseDefault();
        $response = [
            'result' => 0,
            'message' => $this->getResponseDescription($txnResponseCode)
        ];
        //dd($_GET);
        if ($txnResponseCode == "0") {
            // Session::forget('cart');
            // dd(Session::get('cart'));
            $this->saveSuccessdata();
            $response = " Successful transaction";
            //$response['result'] = 1;
        } elseif ($txnResponseCode != '0') {
            // $state = $this->savePaymentOrder($_GET, 'Pending', 'order_map', 'faile');
            $response = " Pending transaction";
            // $response['message'] = $this->getResponseDescription($txnResponseCode);
        } else {
            // $state = $this->savePaymentOrder($_GET, 'error', 'order_map', 'faile');
            $response = "Fail transaction";
            //$response['message'] = $this->getResponseDescription(100);
        }
        $convent = config::get('constants.VALUE_CONVERT_USD_TO_VN');
        //dd($_GET);
        //return $response;
        // $pdf = PDF::loadView('guest.test_response');
        return view('guest.test_response', ['state' => $txnResponseCode, 'response' => $response, 'amount' => $_GET['vpc_Amount']/(100*$convent), 'data' => $_GET]);
        // return $pdf->download('invoice.pdf');
    }
}
