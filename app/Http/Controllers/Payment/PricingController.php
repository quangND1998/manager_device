<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index(){
        return Inertia::render('Payment/Pricing');
    }
}
