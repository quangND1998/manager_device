<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\ProductPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    
    public function index(){
        $packages = ProductPackage::get();
        return Inertia::render('Package/Index', compact('packages'));
    }
}
