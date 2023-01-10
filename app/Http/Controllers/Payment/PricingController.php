<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\ProductPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Session;
use App\Models\Cart;
class PricingController extends Controller
{
    public function index(){

        $package_products = ProductPackage::where('state', true)->orderBy('id_priority')->get();
        return Inertia::render('Payment/Pricing',compact('package_products'));
    }

    public function addToCart(Request $request){
        Session::forget('cart');
        $package = ProductPackage::find($request->package_product_id);
        $oldCart = Session('cart') ? Session::get('cart') : null;
        $cart = new Cart($oldCart);
        $cart->add( $package->id,$package);
        Session::put('cart', $cart);

        

        return redirect('/topup/order_final');
    }
    public function getOrderfinal()
    {
        $cart = Session::get('cart');
        if (Session::has('cart')) {
            $oldCart = Session::get('cart');
            $cart_new = new Cart($oldCart);
            return Inertia::render('Payment/Order', ['cart' => $cart, 'product_cart' => $cart_new->items, 'totalPrice' => $cart_new->totalPrice, 'totalQty' => $cart->totalQty, 'list_map' => $cart_new->list_map]);
        } else {
            return Inertia::render('Payment/Order');
        }
    }
}
