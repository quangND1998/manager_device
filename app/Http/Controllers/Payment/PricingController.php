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
use App\Models\Payment;
use App\Http\Controllers\Traits\PayPalTrait;
class PricingController extends Controller
{
    use PayPalTrait;
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
        if($user->hasPermissionTo('user-manager')){

            return back();
        }
        if($user->active_demo == 0){
            $role = Role::where('name','Demo')->first();
            $user->time_limit = Carbon::now()->addDays($request->time_trail);
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

        $this->validate($request,[
            'number_device' => 'required|numeric|min:2|not_in:0'
        ]);
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
        $result = $this->responsePayPal($request);
        if ($result->getState() == 'approved') {
            $cart = $request->session()->get('cart');
            $item = $cart->items;
            $transaction = $request->paymentId;
            $this->saveSuccessdataPaypal($request,$result);
            // dd($cart);
            return Inertia::render('Payment/Response_paypal',compact('cart','item','transaction'))->with('success', 'Transaction payment success!');
        }else{
            return Inertia::render('Payment/Response_paypal')->with('danger', 'Payment failed.');
        }
    }
    public function saveSuccessdataPaypal($data,$result){

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
            $this->savePaymentPayPal($result,$des,$cart->items);
            // save bill
            Session::forget('cart');
        }

    }
    public function savePaymentPayPal($data,$des,$items)
    {
        // dd($data->payer);
        // dd($data);
        $check = Payment::where('merch_TxnRef', $data->id)->count();
        if($check == 0){
            $payment = new Payment;
            $payment->pay_gate = "paypal";
            $payment->pay_type = $data->payer->payment_method;
            $payment->amount =  $data->transactions[0]->amount->total;
            $payment->transID = $data->id;
            $payment->merch_TxnRef = $data->id;
            $payment->card_number = $data->cart;
            $payment->state = $data->state;
            $payment->description = $des;
            $payment->user_id = Auth::user()->id;
            $payment->save();

        }

    }
}
