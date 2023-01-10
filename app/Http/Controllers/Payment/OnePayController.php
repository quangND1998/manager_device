<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Http\Controllers\Traits\OnePayTraits;
use Session;
use App\Cart;
use Illuminate\Support\Facades\URL;
class OnePayController extends Controller
{
    use OnePayTraits;
    public function postDataPayment(Request $request)
    {
            $current_date = Carbon::now()->format('YmdHs');
            $input_data = [];

            $input_data['vpc_Amount'] = 250000;
            $input_data['vpc_MerchTxnRef']  = date('YmdHis') . rand() ."_". Auth::user()->id;

            $input_data['vpc_OrderInfo'] = 'ORDER_LICENSE';
            $input_data['vpc_ReturnURL'] = URL::to('/') . '/payment/response_order';
            $input_data['vpc_TicketNo'] = $current_date;
            $input_data['AgainLink']  = urlencode($request->url());


            $vpcURL = $this->checkdatapayment($input_data);

            // return ($vpcURL);
            // return $vpcURL;
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
            $this->saveSuccessdata();
            $response = " Successful transaction";
        } elseif ($txnResponseCode != '0') {
            $response = " Pending transaction";
        } else {
            $response = "Fail transaction";
        }
        $convent = 25030;
        return view('guest.test_response', ['state' => $txnResponseCode, 'response' => $response, 'amount' => $_GET['vpc_Amount']/(100*$convent), 'data' => $_GET]);
    }
}
