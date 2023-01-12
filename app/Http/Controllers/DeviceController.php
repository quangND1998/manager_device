<?php

namespace App\Http\Controllers;

use App\Events\ConnectWifiEvent;
use App\Events\DefaultAppEvent;
use App\Events\LaunchAppEvent;
use App\Models\Applicaion;
use App\Models\Devices;
use App\Models\Wifi;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DeviceController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:user-manager|Pro|Demo|Lite', ['only' => ['index','setDefaultApp','lanchApp']]);
        $this->middleware('permission:user-manager|Pro|Demo', ['only' => ['saveName','update', 'delete']]);
    }
    public function index(Request $request){
        $user = Auth::user();
        if($user->hasPermissionTo('user-manager')){
            $devices = Devices::with('applications','default_app','user')->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
            })->get();
  
            $applications = Applicaion::groupby('packageName')->get();
        }
        elseif($user->hasPermissionTo('Lite')){
            $devices = Devices::with('default_app','applications','user')->where('user_id',$user->id)->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
            })->get();
            $applications = Applicaion::where('default', true)->groupby('packageName')->get();
        }
        else{
            $devices = Devices::with('applications','default_app','user')->where('user_id',$user->id)->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
            })->get();
            $applications = Applicaion::groupby('packageName')->get();
        }
       
     
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

    public function setDefaultApp( Request $request){
        $this->validate($request,[
            'link_app' => 'required',

        ]);
        $ids = $request->ids;
        if($ids ==null){
            return back()->with('warning' ,"You must choose in checkbox !!!.");
        }
        $devices =Devices::whereIn('id', $ids)->get();
        $application = Applicaion::where('packageName',$request->link_app)->first();
        foreach($devices as $device){
         
            if($device->hasApp($request->link_app)){
                $device->app_default_id = $application->id;
                $device->save();
                broadcast(new DefaultAppEvent($device, $request->link_app));
            }
          
        }

        return back()->with('success', 'Lauch successfully');
     
    }

    public function default_app(Request $request){
        $user = Auth::user();
        if($user->hasPermissionTo('user-manager')|| $user->hasPermissionTo('Pro') ||$user->hasPermissionTo('Demo')){
        $this->validate($request,[
            'link_app' => 'required',

        ]);
        $device_id = $request->device_id;
        if($device_id ==null){
        
            return response()->json('Errors', Response::HTTP_BAD_REQUEST);
        }
        $device =Devices::where('device_id', $device_id)->first();
        $application = Applicaion::where('packageName',$request->link_app)->first();
        if($device && $device->hasApp($request->link_app) ){
            $device->app_default_id = $application->id;
            $device->save();
            
        }
        return response()->json('Successfully', Response::HTTP_OK);
        }   
        return response()->json("Don't have permission", Response::HTTP_BAD_REQUEST);
      
    }




    public function getDevice($id){
        $device = Devices::with('default_app')->where('device_id', $id)->first();
        if($device){
            $response  = [
                'device' => $device
            ];
            return response()->json($response, Response::HTTP_OK);
        }else{
            return response()->json('Device Not Fond',Response::HTTP_BAD_REQUEST);
        }
    
    }

    public function disableDefaultApp($id){
        $device = Devices::findOrFail($id);
        $device->update(['app_default_id'=>null]);
        return redirect('/devices')->with('success', 'Successfully');

    }

    
     

    

   
}
