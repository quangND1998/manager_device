<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
class BillManager extends Controller
{
    public function index(){
        $payment = Payment::where('user_id', Auth::user()->id)->orderBy('created_at')->get();
        return Inertia::render('Payment/List',compact('payment'));
    }
}
