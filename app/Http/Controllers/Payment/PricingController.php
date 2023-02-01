<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\ProductPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
class PricingController extends Controller
{
    public function index(){
        Session::forget('cart');
        $package_products = ProductPackage::where('state', true)->orderBy('id_priority')->get();
        session()->forget('cart');
        return Inertia::render('Payment/Pricing',compact('package_products'));
    }
    public function free(Request $request){
        // $package = ProductPackage::findOrFail($request->package_product_id);
        // dd($package);
        $user =  User::with('roles')->findOrFail(Auth::user()->id);
        if($user->active_demo == 0){
            $role = Role::where('name','Demo')->first();
            $user->time_limit = 1;
            $user->active_demo = 1;
            $user->roles()->sync($role);
            $user->save();
            // return back()->with('success', 'Change account Demo succsessfully');

            return redirect('/devices')->with('success', 'Change account Demo succsessfully');
        }
        return redirect('/devices')->with('success', 'Account have one use Demo');
        // return back()->with('error', 'Account have one use Demo');

    }

    public function addToCart(Request $request){
        // dd($request);
        $request->session()->forget('cart');
        $cart = session()->get('cart',[] );
        $package = ProductPackage::find($request->package_product_id);

        $cart = new Cart;
        $cart->add( $package->id,$package,$request->number_device);
        Session::put('cart', $cart);
        return redirect('/topup/order_final');
    }
    public function updateCart(Request $request){
        $cart = $request->session()->get('cart');
        $cart->updateNumberDevice($cart->items,$request->number_device);
        Session::put('cart', $cart);
        return redirect('/topup/order_final');
    }
    public function getOrderfinal(Request $request)
    {
        // $cart = Session::get('cart');
        $cart = $request->session()->get('cart');
        $item = $cart->items;
        // dd($item);

        return Inertia::render('Payment/Order',compact('cart','item'));

    }
    public function gate(Request $request){
        $cart = $request->session()->get('cart');
        $item = $cart->items;
        return Inertia::render('Payment/Gate',compact('cart','item'));
    }
    public function checkout(Request $request)
    {
        $cart = $request->session()->get('cart');
        $item = $cart->items;
        return Inertia::render('Payment/Checkout',compact('cart','item'));
    }
    public function response(Request $request)
    {
        return Inertia::render('Payment/Response');
    }
    public function response_paypal(Request $request){
        // return $request;
        // $payment_id = Session::get('paypal_payment_id');
        // /** clear the session payment ID **/
        // Session::forget('paypal_payment_id');
        // if (empty(Input::get('PayerID')) || empty(Input::get('token'))) {
        //     Session::put('error', 'Payment failed');
        //     return Redirect::to('/');
        // }
        // $payment = Payment::get($payment_id, $this->_api_context);
        // $execution = new PaymentExecution();
        // $execution->setPayerId($request->PayerID);
        // dd($execution);

        if($request->PayerID != null){
            $cart = $request->session()->get('cart');
            $item = $cart->items;
            $transaction = $request->paymentId;
            $this->saveSuccessdataPaypal($request);
            // dd($cart);
            return Inertia::render('Payment/Response_paypal',compact('cart','item','transaction'))->with('success', 'Transaction payment success!');
        }else{
            return Inertia::render('Payment/Response_paypal')->with('danger', 'Payment failed.');
        }
    }
    public function saveSuccessdataPaypal($data){

        if (Session::has('cart')) {
            $cart = Session::get('cart');
            $timelimit = Carbon::now()->addDays($cart->items['item']->package_time);
            $des = $cart->items['item']->name . ', Number device : ' .$cart->items['number_device'];
            $user =  User::findOrFail(Auth::user()->id);
            $user->number_device = $cart->items['number_device'];
            $user->time_limit = $timelimit;
            $user->save();
            $role = Role::where('name','Pro')->first();
            $user->roles()->sync($role);
            $this->savePaymentPayPal($data,$des,$cart->items);
            // save bill
            Session::forget('cart');
        }

    }
    public function savePaymentPayPal($data,$des,$items)
    {
        // dd($items['price']);
        // dd($data['vpc_Amount'] / 100);
        $check = payment::where('merch_TxnRef', $data->paymentId)->count();
        if($check == 0){
            $payment = new Payment;
            $payment->pay_gate = "paypal";
            $payment->pay_type = 'web';
            $payment->amount = $items['price'];
            $payment->transID = $data->paymentId;
            $payment->merch_TxnRef = $data->paymentId;
            $payment->card_number = "";
            $payment->state = "Approved";
            $payment->description = $des;
            $payment->user_id = Auth::user()->id;
            $payment->save();

        }

    }
}
