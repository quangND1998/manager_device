<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Http\Controllers\Traits\OnePayTraits;
use App\Http\Controllers\Traits\PayPalTrait;
use Session;
use App\Models\Cart;
use App\Models\Payment;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\URL;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use PayPal\Exception\PayPalConnectionException;
use Illuminate\Support\Facades\Redirect;
class OnePayController extends Controller
{
    use OnePayTraits,PayPalTrait;
    public function paidgate(Request $request){
        $check_gate = $request->gate;

        if ($check_gate != "onepay") {
            $payment = $this->paidInvoicePaypal($request);
            try {
                $payment->create($this->_api_context);
            } catch (PayPalConnectionException $ex) {
                if (Config::get('app.debug')) {
                    Session::put('error', 'Connection timeout');
                    return Redirect::to('/');
                } else {
                    Session::put('error', 'Some error occur, sorry for inconvenient');
                    return Redirect::to('/');
                }
            }
            foreach ($payment->getLinks() as $link) {
                if ($link->getRel() == 'approval_url') {
                    $redirect_url = $link->getHref();
                    break;
                }
            }
            Session::put('paypal_payment_id', $payment->getId());
            if (isset($redirect_url)) {
                return Redirect::away($redirect_url);
            }
            Session::put('error', 'Unknown error occurred');
            return Redirect::to('/');
        } else {
            $vpcURL = $this->paidInvoieOnePay($request);
            return redirect()->to($vpcURL)->send();
        }
    }
    public function paidInvoieOnePay(Request $request)
    {
            $current_date = Carbon::now()->format('YmdHs');
            $cart = $request->session()->get('cart');
            $input_data = [];

            $input_data['vpc_Amount'] = $cart->totalPrice * 100 * 25300;
            $input_data['vpc_MerchTxnRef']  = date('YmdHis') . rand() ."_". Auth::user()->id;

            $input_data['vpc_OrderInfo'] = 'ORDER_LICENSE';
            $input_data['vpc_ReturnURL'] = URL::to('/') . '/payment/response_order';
            $input_data['vpc_TicketNo'] = $current_date;
            // $input_data['AgainLink']  = urlencode($_SERVER['HTTP_REFERER']);
            $input_data['AgainLink'] = urlencode($request->url);
            $vpcURL = $this->checkdatapayment($input_data);

            return ($vpcURL);

            // return redirect()->to($vpcURL);
    }
    public function paidInvoicePaypal(Request $request)
    {
            $user = Auth::user();
            $cart = $request->session()->get('cart');
            $amount = $cart->totalPrice;
            $payment = $this->payInvoiceWithpaypal($amount);
            // dd($payment);
            return $payment;
    }

    public function responsePaymentOrder()
    {
        $txnResponseCode = $this->responseDefault();
        $state = $this->getResponseDescription($txnResponseCode);
        $response = [
            'result' => 0,
            'message' => $state
        ];
        // dd($_GET);
        $convent = 25030;
        $amount = $_GET['vpc_Amount']/(100*$convent);
        $data = $_GET;
        if ($txnResponseCode == "0") {
            $this->saveSuccessdata($data);
            $response = " Successful transaction";
        } elseif ($txnResponseCode != '0') {
            $response = " Pending transaction";
        } else {
            $response = "Fail transaction";
        }
        // dd($data);
        // return view('guest.test_response', ['state' => $txnResponseCode, 'response' => $response, 'amount' => $_GET['vpc_Amount']/(100*$convent), 'data' => $_GET]);
        return Inertia::render('Payment/Response',compact('state','response','amount','data'));
    }
    public function saveSuccessdata($data){

        if (Session::has('cart')) {
            $cart = Session::get('cart');
            // dd($cart->items['number_device']);
            $des = $cart->items['item']->name . ', Number device : ' .$cart->items['number_device'];
            $user =  User::findOrFail(Auth::user()->id);
            $role = Role::where('name','Pro')->first();
            $user->roles()->sync($role);
            $this->savePayment($data,$des);
            // save bill
            Session::forget('cart');
        }

    }
    public function savePayment($data,$des)
    {
        // dd($data['vpc_Amount'] / 100);
        $check = payment::where('merch_TxnRef', $data['vpc_MerchTxnRef'])->count();
        if($check == 0){
            $payment = new Payment;
            $payment->pay_gate = "onepay";
            $payment->pay_type = $data['vpc_PayChannel'];
            $payment->amount = $data['vpc_Amount'] / 100;
            $payment->transID = $data['vpc_NetworkTransactionID'];
            $payment->merch_TxnRef = $data['vpc_MerchTxnRef'];
            $payment->card_number = $data['vpc_CardNum'];
            $payment->state = $data['vpc_Message'];
            $payment->description = $des;
            $payment->user_id = Auth::user()->id;
            $payment->save();

        }

    }
}
