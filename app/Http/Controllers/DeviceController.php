<?php

namespace App\Http\Controllers;

use App\Events\ConnectWifiEvent;
use App\Events\DefaultAppEvent;
use App\Events\LaunchAppEvent;
use App\Events\ReciveActiveDeviceEvent;
use App\Events\SendDeviceActiveEvent;
use App\Models\Applicaion;
use App\Models\Devices;
use App\Models\Wifi;
use App\Models\HistoryDevice;
use App\Models\ipaddress;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Http\Controllers\Traits\LoginTrait;
use App\Http\Controllers\Traits\FileUploadTrait;
use App\Http\Resources\ApkResource;
use App\Http\Resources\ApplicationResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use App\Models\ApplicationDefault;
use App\Repositories\DeviceLimitRepository;

use App\Http\Resources\DevicesResource;
use App\Events\SendUpdateApplicationEvent;
use App\Jobs\ReciveActiveDeviceJob;
use App\Jobs\SendDeviceActiveJob;
use App\Jobs\LaunchAppJob;
use App\Jobs\LaunchAppTimeLimit;
use App\Jobs\SetDefaultAppJob;
use App\Jobs\TimeEndDeviceProcessing;

class DeviceController extends Controller
{
    use LoginTrait, FileUploadTrait;
    protected $deviceLimitRepository;
    function __construct(DeviceLimitRepository $deviceLimitRepository)
    {
        $this->deviceLimitRepository = $deviceLimitRepository;
        $this->middleware('permission:user-manager|Pro|Demo|Lite|Standard', ['only' => ['index', 'setDefaultApp', 'launchApp']]);
        $this->middleware('permission:user-manager|Pro|Demo|Lite|Standard', ['only' => ['saveName', 'update', 'delete']]);
     
    }
    public function index(Request $request)
    {
        // dd(Carbon::now()->addMinutes(0)->addSeconds(30));
        $user = Auth::user();
        $sortBy = $request->sortBy ? $request->sortBy : 'id';
        $sort_Direction = $request->sortDirection ?  $request->sortDirection : 'asc';
        $enabled = $request->enabled;
        if ($user->hasPermissionTo('user-manager')) {

            $devices = Devices::with('applications', 'default_app', 'user', 'last_login')->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
                $query->orwhere('device_id', 'LIKE', '%' . $request->term . '%');
            })->enabled($request->only('enabled'))->orderBy($sortBy, $sort_Direction)->paginate(10)->appends(['page' => $request->page, 'name' => $request->term, 'sortBy' => $request->sortBy, 'sortDirection' => $request->sortDirection]);

           
            $applications = Applicaion::whereIn('device_id', $devices->pluck('id'))->get();
        } elseif ($user->hasPermissionTo('Demo')) {

            $devices = Devices::with('default_app', 'applications', 'user', 'last_login')->where('user_id', $user->id)->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
                $query->orwhere('device_id', 'LIKE', '%' . $request->term . '%');
            })->enabled($request->only('enabled'))->orderBy($sortBy, $sort_Direction)->paginate(10)->appends(['page' => $request->page, 'name' => $request->term, 'sortBy' => $request->sortBy, 'sortDirection' => $request->sortDirection]);
            // $applications = ApplicationDefault::get();

            $applications = Applicaion::whereIn('device_id', $devices->pluck('id'))->get();
        } else {

            $devices = Devices::with('applications', 'default_app', 'user', 'last_login')->where('user_id', $user->id)->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
                $query->orwhere('device_id', 'LIKE', '%' . $request->term . '%');
            })->enabled($request->only('enabled'))->orderBy($sortBy, $sort_Direction)->paginate(10)->appends(['name' => $request->term, 'sortBy' => $request->sortBy, 'sortDirection' => $request->sort_Direction]);
            $isExpired= Carbon::now()->gt($user->time_limit);
           
            // Neu chua het han
            if($isExpired){
                $applications = Applicaion::whereIn('device_id', $devices->pluck('id'))->get();
            }
            else{
                $applications = Applicaion::whereIn('device_id', $devices->pluck('id'))->get();
            }
            
           

        }

        $apk_files = ApkResource::collection($user->apk_files);

        $wifis = Wifi::get();
        $count = $devices->total();
        $firstItem = $devices->firstItem();
        $lastItem = $devices->lastItem();
        // dd($lastItem);

        // return $firstItem;
        return Inertia::render('Devices/Index', compact('devices','enabled', 'applications', 'wifis', 'apk_files', 'sortBy', 'count', 'firstItem', 'lastItem', 'sort_Direction'));
    }



    public function saveName(Request $request,  $id)
    {

        $device = Devices::findOrFail($id);
        $this->validate($request, [
            'name' => 'required|unique:devices,name,' . $device->id
        ]);
        $device->update([
            'name' => $request->name
        ]);


        return back()->with('success', 'Update successfully');
    }


    public function delete($id)
    {
        $user= Auth::user();
        $device = Devices::with('applications')->findOrFail($id);
        foreach ($device->applications as $app) {
            $extension = " ";
            $this->DeleteFolder($app->icon, $extension);
        }
        $device->applications()->delete();
        $device->delete();
        if(!$user->hasPermissionTo('user-manager')){
            $user_update= User::has('devices')->withCount('devices')->with('devices')->find($user->id);
           
            if( $user_update->devices_count > $user_update->number_device){
                $this->deviceLimitRepository->updateDeviceLimit($user_update);
            }
            else{
                foreach($user_update->devices as $item){
                    $this->deviceLimitRepository->enabledDevice($item);
                }
            }
        }
      
        return back()->with('success', 'Delete succsessfully');
    }

    public function store(Request $request)
    {


        $device = Devices::where('device_id', $request->device_id)->first();

        if ($device) {
            $validator =  Validator::make($request->all(),   [
                'device_id' => 'required|unique:devices,device_id,' . $device->id,
                'name' => 'required',
                'brand' => 'required',
                'os_version' => 'required',
                'battery' => 'required'

            ]);
        } else {
            $validator =  Validator::make($request->all(),   [
                'device_id' => 'required|unique:devices,device_id',
                'name' => 'required',
                'brand' => 'required',
                'os_version' => 'required',
                'battery' => 'required',
                

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
                'user_id' => Auth::user()->id,
                'active' => true,
                'serial' => $request->serial
            ]);
        } else {
            $device = Devices::create([
                'device_id' => $request->device_id,
                'name' => $request->name,
                'brand' => $request->brand,
                'os_version' => $request->os_version,
                'battery' => $request->battery,
                'connect_wifi' => $request->connect_wifi,
                'user_id' => Auth::user()->id,
                'active' => true,
                'serial' => $request->serial
            ]);
        }

        $new_history_login = HistoryDevice::create([
            'device_id' => $device->id,
            'time_login' => Carbon::now()
        ]);
        $device->update([
            'update_time' =>Carbon::createFromFormat('Y-m-d H:i:s', $new_history_login->updated_at,'UTC')->setTimezone('+7')
        ]);
        $new_ip = new ipaddress();
        $new_ip->ip =  $this->getOriginalClientIp($request);
        $new_ip->history_id = $new_history_login->id;
        $new_ip->save();
        $this->checkaddressIp($new_ip);

        return response()->json('Create successfully', Response::HTTP_OK);
    }
    public function launchApp(Request $request)
    {

        $this->validate($request, [
            'link_app' => 'required',

        ]);

        $ids = $request->ids;
        if ($ids == null) {
            return back()->with('warning', "You must choose in checkbox !!!.");
        }
        $devices = Devices::whereIn('id', $ids)->get();

        foreach ($devices as $device) {
            if ($device->hasApp($request->link_app)) {
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
                //broadcast(new LaunchAppEvent($device, $request->link_app));
            }
        }

        return back()->with('success', 'Lauch successfully');
    }

    public function connectWifi(Request $request)
    {


        $this->validate($request, [
            'ssid' => 'required',
            'password' => 'required',

        ]);

        $ids = $request->ids;
        if ($ids == null) {
            return back()->with('warning', "You must choose in checkbox !!!.");
        }
        $devices = Devices::whereIn('id', $ids)->get();

        foreach ($devices as $device) {

            broadcast(new ConnectWifiEvent($device, $request->ssid, $request->password));
        }

        return back()->with('success', 'Connect successfully');
    }

    public function setDefaultApp(Request $request)
    {
        $this->validate($request, [
            'link_app' => 'required',

        ]);
        $ids = $request->ids;
        if ($ids == null) {
            return back()->with('warning', "You must choose in checkbox !!!.");
        }
        $devices = Devices::whereIn('id', $ids)->get();
        $application_share = Applicaion::where('packageName', $request->link_app)->first();
        foreach ($devices as $device) {

            $application = Applicaion::where('packageName', $request->link_app)->where('device_id', $device->id)->first();
            if ($device->hasApp($request->link_app))  {
                $device->app_default_id = $application ? $application->id :  $application_share->id;
                $device->save();
                SetDefaultAppJob::dispatch($device, $request->link_app)->onConnection('sync');
                //broadcast(new DefaultAppEvent($device, $request->link_app));
            }
        }

        return back()->with('success', 'Launch successfully');
    }

    public function default_app(Request $request)
    {
        $user = Auth::user();
        if ($user->hasPermissionTo('user-manager') || $user->hasPermissionTo('Pro') || $user->hasPermissionTo('Demo')) {
            $this->validate($request, [
                'link_app' => 'required',

            ]);
            $device_id = $request->device_id;
            if ($device_id == null) {

                return response()->json('Errors', Response::HTTP_BAD_REQUEST);
            }
            $device = Devices::where('device_id', $device_id)->first();
            $application_share = Applicaion::where('packageName', $request->link_app)->first();
            if ($device && $device->hasApp($request->link_app)) {
                $application = Applicaion::where('packageName', $request->link_app)->where('device_id', $device->id)->first();
                $device->app_default_id = $application ? $application->id :  $application_share->id;
                $device->save();
            }
            return response()->json('Successfully', Response::HTTP_OK);
        }
        return response()->json("Don't have permission", Response::HTTP_BAD_REQUEST);
    }




    public function getDevice($id)
    {
        $device = Devices::with('default_app')->where('device_id', $id)->first();
        if ($device) {
            $response  = [
                'device' => $device
            ];
            return response()->json($response, Response::HTTP_OK);
        } else {
            return response()->json('Device Not Fond', Response::HTTP_BAD_REQUEST);
        }
    }

    public function disableDefaultApp($id)
    {
        $device = Devices::findOrFail($id);
        $device->update(['app_default_id' => null]);
        return redirect('/devices')->with('success', 'Successfully');
    }

    public function checkDevice()
    {
        $user = Auth::user();

        if ($user->hasPermissionTo('user-manager')) {
            $devices = Devices::get();
        } elseif ($user->hasPermissionTo('Demo')) {
            $devices = Devices::where('user_id', $user->id)->get();
        } else {
            $devices = Devices::where('user_id', $user->id)->get();
        }
        foreach ($devices as $device) {
            $device->active = false;
           
            // if($device->last_login !==null){
            //     $device->update_time = Carbon::createFromFormat('Y-m-d H:i:s', $device->last_login->created_at,'UTC')->setTimezone('+7');
            // }
            $device->save();
            //broadcast(new SendDeviceActiveEvent($device));
            SendDeviceActiveJob::dispatch($device)->onConnection('sync');
        }
        return redirect()->route('device.index');
    }


    public function checkActiveDevice(Request $request)
    {

        $user = User::with('devices')->find($request->user_id);
        // return $user;


        foreach ($user->devices as $device) {
            $device->active = false;
            $device->save();
            //broadcast(new SendDeviceActiveEvent($device));
            SendDeviceActiveJob::dispatch($device)->onConnection('sync');
        }

        return back();
    }
    public function getActiveDevice($id)
    {
        $device = Devices::where('device_id', $id)->first();

        if ($device) {
            ReciveActiveDeviceJob::dispatch($device)->onConnection('sync');
           // broadcast(new ReciveActiveDeviceEvent($device));
            $device->active = true;
            $device->save();

            return response()->json(Response::HTTP_OK);
        } else {
            return response()->json('Device Not Fond', Response::HTTP_BAD_REQUEST);
        }
    }

    public function activeDevice(Request $request, $id)
    {

        $device = Devices::where('device_id', $id)->first();

        if ($device) {

            $device->active = true;
            $device->battery = $request->battery;
            $device->save();
            ReciveActiveDeviceJob::dispatch($device)->onConnection('sync');
            //ReciveAc::dispatch($device)->onConnection('sync');
            //broadcast(new ReciveActiveDeviceEvent($device));

            return response()->json(Response::HTTP_OK);
        } else {
            return response()->json('Device Not Fond', Response::HTTP_BAD_REQUEST);
        }
    }

    public function changeEnabled(Request $request){
        $device = Devices::findOrFail($request->id);
        $device->update(['enabled' => $request->enabled]);

        return back()->with('success', 'Change enabled app successfully');
    }   

   
    public function deivceDetail($id){
        $device = Devices::with('applications')->find($id);
        if (!$device) {

            return response()->json('Not found Device', 404);
        }
        $device->active = false;
        $device->save();

        SendDeviceActiveJob::dispatch($device)->onConnection('sync');
       // broadcast(new SendDeviceActiveEvent($device));
        return Inertia::render('Devices/Detail', compact('device'));
    }
    

    public function findDevice($id){
        $device = Devices::with('applications', 'default_app', 'user', 'last_login')->where('device_id', $id)->first();
        if ($device) {
            $device->active = true;
            $device->save();
            return response()->json($device->load('applications', 'default_app', 'user', 'last_login'), 200);
        } else {
            return abort(404);
        }
    }


    public function launchAppTime(Request $request){
     
        $this->validate($request, [
            'link_app' => 'required',
            'ids' => 'required|array',
            'time' => 'required|numeric|gt:0'
        ]);
        $user = Auth::user();
        $devices = Devices::whereIn('id', $request->ids)->get();
        foreach ($devices as $device) {
            if ($device->hasApp($request->link_app)) {
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
                TimeEndDeviceProcessing::dispatch($device,$user)->delay(now()->addMinutes($request->time -1)->addSeconds(30));
                LaunchAppTimeLimit::dispatch($device,$request->link_app, $request->time)->delay(now()->addMinutes($request->time));
                $device->time = Carbon::now()->addMinutes($request->time);
                $device->save();
            }
        }
      
        return back()->with(['success'=>'Launch app successfully', 'time'=> $request->time]);

    }

  
}
