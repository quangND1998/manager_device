<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\ProductPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:user-manager', ['only' => ['index', 'store', 'update', 'delete', 'changeState']]);
    }

    public function index()
    {
        $package_products = ProductPackage::orderBy('id_priority', 'asc')->get();
        return Inertia::render('Package/Index', compact('package_products'));
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'price' => 'required|numeric|gt:0',
            'save_money' => 'nullable|numeric|between:0,100',
            'package_time' => 'required|numeric|gt:0'
        ]);
   
        $package = ProductPackage::create([
            'name' => $request->name,
            'price' => $request->price,
            'save_money' => $request->save_money,
            'package_time' => $request->package_time,
        ]);

        return back()->with('success', 'Create successfully');
    }
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'price' => 'required|numeric|gt:0',
            'save_money' => 'nullable|numeric|between:0,100',
            'package_time' => 'required|numeric|gt:0'
        ]);
 
        $package = ProductPackage::findOrFail($id);
        $package->update([
            'name' => $request->name,
            'price' => $request->price,
            'save_money' => $request->save_money,
            'package_time' => $request->package_time,
        ]);

        return back()->with('success', 'Update successfully');
    }
    public function delete($id)
    {
        $package = ProductPackage::findOrFail($id);
        $package->delete();
        return back()->with('success', 'Delete successfully');
    }
    public function changeState(Request $request)
    {


        $package = ProductPackage::findOrFail($request->id);
        $package->update(['state' => $request->state]);

        return back()->with('success', 'Change State successfully');
    }

    public function sort(Request $request)
    {
        $data = $request->data;
        for ($i = 0; $i < count($data); $i++) {
            ProductPackage::findOrFail($data[$i]['id'])->update(['id_priority' => $i]);
        }
        return redirect()->back()->with('success', 'Sort  successfully');
    }
}
