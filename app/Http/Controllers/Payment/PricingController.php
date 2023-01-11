<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\ProductPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use App\Models\Cart;
class PricingController extends Controller
{
    public function index(){

        $package_products = ProductPackage::where('state', true)->orderBy('id_priority')->get();
        session()->forget('cart');
        return Inertia::render('Payment/Pricing',compact('package_products'));
    }

    public function addToCart(Request $request){
        // dd($request);
        $request->session()->forget('cart');
        $cart = session()->get('cart',[] );
        $package = ProductPackage::find($request->package_product_id);
        // $oldCart = Session::has('cart') ? Session::get('cart') : null;
        if(isset($cart)) {
            $cart = [
                "name" => $package->name,
                "quantity" => 1,
                "price" => $package->price,
                "number_device" =>$request->number_device,
                'package_time' => $package->package_time,
                'discounts' => $package->save_money ? $package->save_money : 0,
                "totalPrice" => $package->price*$request->number_device,
            ];
        } else {
            $cart = [
                "name" => $package->name,
                "quantity" => 1,
                "price" => $package->price,
                "number_device" =>$request->number_device,
                'package_time' => $package->package_time,
                'discounts' => $package->save_money ? $package->save_money : 0,
                "totalPrice" => $package->price*$request->number_device -( $package->save_money),
            ];
        }
        // $cart->add($package->id,$package,$request->number_device);
        Session::put('cart', $cart);

        return redirect('/topup/order_final');
    }

    public function totalPrice($package, $discounts, $number_device){
        $total = $package->price*$request->number_device;
        $discount_price = ($total/100)*$disc
    }
    public function getOrderfinal()
    {
      
        $cart = Session::get('cart');
        if (Session::has('cart')) {
        
            $oldCart = Session::get('cart');

        
   
            return Inertia::render('Payment/Order',compact('oldCart'));
        } else {
            $oldCart =null;
            return Inertia::render('Payment/Order',compact('oldCart'));
        }
    }
}
