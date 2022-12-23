<?php

namespace App\Http\Controllers;

use App\Events\ConnectWifiEvent;
use App\Events\LaunchAppEvent;
use App\Models\Applicaion;
use App\Models\Devices;
use App\Models\Wifi;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index(Request $request){
        $devices = Devices::with('applications')->where(function ($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->term . '%');
        })->get();
        $applications = Applicaion::groupby('packageName')->get();
        $wifis = Wifi::get();
        return Inertia::render('Devices/Index',compact('devices','applications','wifis'));
    }

    public function saveName(Request $request,  $id){

        $device = Devices::findOrFail($id);
        $this->validate($request,[
            'name' => 'required|unique:devices,name,'.$device->id
        ]);
        $device->update([
            'name' => $request->name
        ]);


        return back()->with('success', 'Update successfully');
    }


    public function delete($id){
        $device = Devices::with('applications')->findOrFail($id);
        $device->applications()->delete();
        $device->delete();
        return back()->with('success', 'Delete succsessfully');
    }
    
    public function store(Request $request){


        $device = Devices::where('device_id', $request->device_id)->first();

        if($device){
            $validator =  Validator::make($request->all(),   [
                'device_id' => 'required|unique:devices,device_id,'.$device->id,
                'name' => 'required',
                'brand' => 'required',
                'os_version' => 'required',
                'battery' => 'required'
    
            ]);
        }
        else{
            $validator =  Validator::make($request->all(),   [
                'device_id' => 'required|unique:devices,device_id',
                'name' => 'required',
                'brand' => 'required',
                'os_version' => 'required',
                'battery' => 'required'
    
            ]);
        }
       
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $device = Devices::where('device_id', $request->device_id)->first();
        if ($device) {
            $device->update([
                'device_id' => $request->device_id,
                'deviceName' => $request->deviceName,
                'brand' => $request->brand,
                'os_version' => $request->os_version,
                'battery' => $request->battery,
                'connect_wifi' => $request->connect_wifi,
                'user_id' => Auth::user()->id
            ]);
          
        } else {
            $device = Devices::create([
                'device_id' => $request->device_id,
                'name' => $request->name,
                'brand' => $request->brand,
                'os_version' => $request->os_version,
                'battery' => $request->battery,
                'connect_wifi' => $request->connect_wifi,
                'user_id' => Auth::user()->id
            ]);
           
        }
        return response()->json('Create successfully', Response::HTTP_OK);

    }
    public function lanchApp(Request $request){

        $this->validate($request,[
            'link_app' => 'required',

        ]);
     
        $ids = $request->ids;
        if($ids ==null){
            return back()->with('warning' ,"You must choose in checkbox !!!.");
        }
        $devices =Devices::whereIn('id', $ids)->get();
      
        foreach($devices as $device){
            if($device->hasApp($request->link_app)){
                broadcast(new LaunchAppEvent($device, $request->link_app));
            }
          
        }

        return back()->with('success', 'Lauch successfully');
    }
    
    public function connectWifi(Request $request){


        $this->validate($request,[
            'ssid' => 'required',
            'password'=>'required',

        ]);
        

        $ids = $request->ids;
        if($ids ==null){
            return back()->with('warning' ,"You must choose in checkbox !!!.");
        }
        $devices =Devices::whereIn('id', $ids)->get();
      
        foreach($devices as $device){

            broadcast(new ConnectWifiEvent($device, $request->ssid, $request->password));
        }

        return back()->with('success', 'Connect successfully');
    }


    public function getDevice(){
        $user = Auth::user();
        $user = Auth::user();
        $response  = [
            'user' => $user
        ];
        return response()->json($response, Response::HTTP_OK);
    }


   
}
