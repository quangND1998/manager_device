<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\Wifi;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class WifiController extends Controller
{
    public function index(Request $request){


        $wifis = Wifi::with('devices')->where(function ($query) use ($request) {
            $query->where('SSID', 'LIKE', '%' . $request->ssid . '%');
        })->paginate(15)->appends(['name' => $request->ssid]);

        return Inertia::render('Wifi/Index', compact('wifis'));
    }

    public function store(Request $request){

        $this->validate($request,[
          
            'ssid' => 'required|unique:wifis,SSID',
            'password'=> 'required'

        ]); 
                Wifi::create([
                    'SSID'=> $request->ssid,
                    'password' => $request->password
                ]); 
        return back()->with('success', 'Create successfully');
    }

    public function update(Request $request,$id){
        $wifi = Wifi::findOrFail($id);
        $this->validate($request,[
            'ssid' => 'required|unique:wifis,SSID,'.$wifi->id,
            'password'=> 'required'

        ]); 
        $wifi->update([
            'SSID'=> $request->ssid,
            'password' => $request->password
        ]);
        return back()->with('success', 'Update successfully');
    }

    public function delete($id){
        $wifi = Wifi::findOrFail($id);
        $wifi->delete();
        return back()->with('success', 'Delete successfully');
    }
}
