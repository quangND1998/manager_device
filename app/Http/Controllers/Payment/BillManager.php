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
        $user = Auth::user();
        if($user->hasRole('administrator')){
            $payments = Payment::with('user')->orderBy('created_at')->paginate(10);
        }else{
            $payments = Payment::with('user')->where('user_id', Auth::user()->id)->orderBy('created_at')->paginate(10);

        }
        return Inertia::render('Payment/List',compact('payments'));
    }
}
