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
        if($user->active_demo == 1){
            $role = Role::where('name','Demo')->first();
            $user->time_limit = 1;
            $user->active_demo = 0;
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
}
