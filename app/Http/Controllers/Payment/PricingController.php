<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\ProductPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index(){

        $package_products = ProductPackage::where('state', true)->orderBy('id_priority')->get();
        return Inertia::render('Payment/Pricing',compact('package_products'));
    }

    public function addToCart(Request $request){
        
        // dd($request);
        return Inertia::render('Payment/Order');
    }
}
