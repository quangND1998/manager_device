<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Events\DefaultAppEvent;
use App\Events\LaunchAppEvent;
use App\Events\ReciveActiveDeviceEvent;
use App\Events\SendDeviceActiveEvent;
use App\Events\SendUpdateApplicationEvent;
use App\Events\ReciveUpdateApplicationEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\ActiveDeviceRequest;
use App\Http\Requests\LauchAppRequest;
use App\Http\Requests\setAppDefaultRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Devices;
use App\Models\Applicaion;
use App\Http\Resources\ApkResource;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\DevicesResource;
use App\Models\AppWindow;
use App\Models\Groups;
use App\Models\User;
use App\Models\Wifi;
use App\Repositories\DeviceRepository;
use Faker\DefaultGenerator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Traits\FileUploadTrait;
use App\Http\Resources\LocationResource;
use App\Events\LaunchAppWithTime;
use App\Http\Requests\RequestLaunchAppTime;
use App\Http\Resources\DeviceApiResource;
use App\Jobs\LaunchAppTimeLimit;
use App\Jobs\ReciveUpdateApplicationJob;
use App\Jobs\SendDeviceActiveJob;
use App\Jobs\SendUpdateApplicationJob;
use App\Jobs\LaunchAppJob;
use App\Jobs\SetDefaultAppJob;
use App\Jobs\TimeEndDeviceProcessing;
use App\Models\ApplicationDefault;
use Carbon\Carbon;
use App\Repositories\DeviceLimitRepository;

class ApiController extends Controller
{
    use FileUploadTrait;
    protected $deivce, $deviceLimitRepository;
    public function __construct(DeviceRepository $deviceRepository, DeviceLimitRepository $deviceLimitRepository)
    {
        $this->deivce = $deviceRepository;
        $this->deviceLimitRepository = $deviceLimitRepository;
        $this->middleware('permission:user-manager|Pro|Demo|Standard', ['only' => ['devices', 'saveName', 'delete', 'setDefaultApp', 'disableDefaultApp', 'launchApp', 'checkDevice', 'checkActiveDevice', 'showDevice', 'dashboard', 'sendUpdateDevice', 'launchAppTime', 'allDevice']]);
        // $this->middleware('permission:user-manager', ['only' => []]);

    }
    public function devices(Request $request)
    {

        $sortBy = $request->sortBy ? $request->sortBy : 'id';
        $sort_Direction = $request->sortDirection ?  $request->sortDirection : 'asc';
        return DevicesResource::collection($this->deivce->getDeivces(
            ['applications', 'default_app', 'user', 'last_login', 'app_running'],
            $request,
            ['name' => $request->term, 'sortBy' => $request->sortBy, 'sortDirection' => $request->sort_Direction],
            $sortBy,
            $sort_Direction

        ));
    }



    public function saveName(Request $request, $id)
    {
        $device = Devices::find($id);
        if (!$device) {
            return response()->json('Not found Device', 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                Rule::unique('devices')->ignore($device->id),
            ]

        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->only(['name']);
        $device->update($data);
        return new DevicesResource($device->load('applications', 'default_app', 'user', 'last_login', 'app_running'));
    }

    public function delete($id)
    {

        $device = Devices::with('applications')->find($id);
        $user = Auth::user();


        if (!$device) {
            return response()->json('Not found Device', 404);
        }

        if (!$user->hasPermissionTo('user-manager')) {
            if ($user->id !== $device->user_id) {
                return response()->json("You dont have permission", 403);
            }
        }
        foreach ($device->applications as $app) {
            $extension = " ";
            $this->DeleteFolder($app->icon, $extension);
        }
        $device->applications()->delete();
        $device->delete();
        // Update device
        if (!$user->hasPermissionTo('user-manager')) {
            $user_update = User::has('devices')->withCount('devices')->with('devices')->find($device->user_id);
            if ($user_update->devices_count > $user_update->number_device) {
                $this->deviceLimitRepository->updateDeviceLimit($user_update);
            } else {
                foreach ($user_update->devices as $item) {
                    $this->deviceLimitRepository->enabledDevice($item);
                }
            }
        }
        return new DevicesResource($device->load('applications', 'default_app', 'user', 'last_login', 'app_running'));
    }


    public function setDefaultApp(setAppDefaultRequest $request)
    {
        $devices = Devices::whereIn('id', $request->ids)->get();
        $application_default = ApplicationDefault::pluck('packageName')->toArray();

        $application_share = Applicaion::where('packageName', $request->link_app)->first();

        foreach ($devices as $device) {
            $application = Applicaion::where('packageName', $request->link_app)->where('device_id', $device->id)->first();
            if ($device->hasApp($request->link_app)) {
                if ($device->enabled == false) {
                    if (in_array($request->link_app, $application_default)) {
                        $device->app_default_id = $application ? $application->id :  $application_share->id;
                        $device->save();
                    }
                } else {
                    $device->app_default_id = $application ? $application->id :  $application_share->id;
                    $device->save();
                }

                //broadcast(new DefaultAppEvent($device, $request->link_app));
                SetDefaultAppJob::dispatch($device, $request->link_app)->onConnection('sync');
            }
        }
        return DevicesResource::collection($devices->load('applications', 'default_app', 'user', 'last_login', 'app_running'));
    }

    public function disableDefaultApp($id)
    {
        $device = Devices::find($id);
        if (!$device) {
            return response()->json('Not found Device', 404);
        }
        $device->update(['app_default_id' => null]);
        return new DevicesResource($device->load('applications', 'default_app', 'user', 'last_login', 'app_running'));
    }



    public function launchApp(setAppDefaultRequest $request)
    {

        $devices = Devices::whereIn('id', $request->ids)->get();

        foreach ($devices as $device) {
            if ($device->hasApp($request->link_app)) {
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
                //broadcast(new LaunchAppEvent($device, $request->link_app));
            }
        }
        return response()->json('Launch successfully', 200);
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
            $device->save();
            SendDeviceActiveJob::dispatch($device)->onConnection('sync');
            //broadcast(new SendDeviceActiveEvent($device));
        }
        return response()->json('Run command sucessfully', 200);
    }


    public function checkActiveDevice(ActiveDeviceRequest $request)
    {

        $user = User::with('devices')->find($request->user_id);
        foreach ($user->devices as $device) {
            $device->active = false;
            $device->save();
            SendDeviceActiveJob::dispatch($device)->onConnection('sync');
            // broadcast(new SendDeviceActiveEvent($device));
        }
        return response()->json('Run command sucessfully', 200);
    }

    public function showDevice($id)
    {
        $device = Devices::with('applications')->find($id);
        if (!$device) {

            return response()->json('Not found Device', 404);
        }
        $device->active = false;
        $device->save();

        SendDeviceActiveJob::dispatch($device)->onConnection('sync');
        //broadcast(new SendDeviceActiveEvent($device));
        return new DevicesResource($device->load('applications', 'default_app', 'user', 'last_login'));
    }

    public function dashboard()
    {
        // return !$user->hasPermissionTo('user-manager') ?

        $user = User::with(['devices.last_login.ipaddress', 'app_windows', 'groups' => function ($q) {
            $q->withCount('devices');
        }])->withCount('app_windows')->withCount('devices')->withCount('groups')->find(Auth::user()->id);

        $response  = [
            "app_windows_count" => $user->hasPermissionTo('user-manager') ? AppWindow::count() : $user->app_windows_count,
            "devices_count" => $user->hasPermissionTo('user-manager') ? Devices::count() : $user->devices_count,
            "groups_count" => $user->hasPermissionTo('user-manager') ? Groups::count() : $user->groups_count,
            "devices" =>  $user->hasPermissionTo('user-manager') ? Devices::get() : $user->devices,
            "groups" =>  $user->hasPermissionTo('user-manager') ? Groups::withCount('devices')->get() : $user->groups,
            "app_windows" =>  $user->hasPermissionTo('user-manager') ? AppWindow::get() : $user->app_windows,
            // "device_locations" => $user->hasPermissionTo('user-manager')? LocationResource::collection(Devices::with('last_login.ipaddress')->get()): LocationResource::collection($user->devices)

        ];
        return response()->json($response, Response::HTTP_OK);
    }
    public function sendUpdateDevice($id)
    {
        $device = Devices::with('applications')->find($id);

        if ($device) {
            //broadcast(new SendUpdateApplicationEvent($device));
            SendUpdateApplicationJob::dispatch($device)->onConnection('sync');
            return response()->json($device, Response::HTTP_OK);
        } else {
            return response()->json('Device Not Fond', Response::HTTP_BAD_REQUEST);
        }
    }

    public function updateAppDevice(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'applications' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $device = Devices::with('applications')->where('device_id', $id)->first();
        if ($device) {
            $applications = $request->applications;
            if ($device) {
                foreach ($device->applications as $app) {
                    $extension = " ";
                    $this->DeleteFolder($app->icon, $extension);
                }
            }
            foreach ($applications as $app) {
                $check_app = Applicaion::where('device_id', $device->id)->where('packageName',  $app['packageName'])->first();
                if ($check_app) {
                    $check_app->update([
                        'appName' => $app['appName'],
                        'icon' => $this->Base64toImage($app['icon'], $check_app->icon),
                        'packageName' => $app['packageName'],
                        'version' => $app['versionName'],
                        'device_id' =>  $device->id
                    ]);
                } else {
                    Applicaion::create([
                        'appName' => $app['appName'],
                        'icon' => $this->Base64toImage($app['icon']),
                        'packageName' => $app['packageName'],
                        'version' => $app['versionName'],
                        'device_id' =>  $device->id
                    ]);
                }
            }


            $update_device = Devices::with('applications')->find($device->id);
            if ($update_device) {
                foreach ($update_device->applications as $app) {
                    if (file_exists((public_path() . $app->icon)) == false) {
                        $app->delete();
                    }
                }
            }

            //broadcast(new ReciveUpdateApplicationEvent($device));
            ReciveUpdateApplicationJob::dispatch($device)->onConnection('sync');
            return response()->json(Response::HTTP_OK);
        } else {
            return response()->json('Device Not Fond', Response::HTTP_BAD_REQUEST);
        }
    }

    public function findDevice($id)
    {
        $device = Devices::with('applications', 'default_app', 'user', 'last_login', 'app_running')->where('device_id', $id)->first();
        if ($device) {
            $device->active = true;
            $device->save();
            return new DevicesResource($device);
        } else {
            return response()->json('Device Not Fond', Response::HTTP_BAD_REQUEST);
        }
    }

    public function launchAppTime(RequestLaunchAppTime $request)
    {
        $devices = Devices::whereIn('id', $request->ids)->get();
        $user = Auth::user();
        foreach ($devices as $device) {
            if ($device->hasApp($request->link_app)) {
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
                // broadcast(new LaunchAppEvent($device, $request->link_app));
                TimeEndDeviceProcessing::dispatch($device, $user)->delay(now()->addMinutes($request->time - 1)->addSeconds(30));
                LaunchAppTimeLimit::dispatch($device, $request->link_app, $request->time)->delay(now()->addMinutes($request->time));
                $device->time = Carbon::now()->addMinutes($request->time);
                $application = Applicaion::where('packageName', $request->link_app)->where('device_id', $device->id)->first();
                if ($application) {
                    $device->app_run_id = $application->id;
                }
                $device->save();
                // dispatch(new LaunchAppTimeLimit($device,$request->link_app))->delay(now()->addSecond($request->time))
            }
        }
        return response()->json('Launch successfully', 200);
    }

    public function allDevice()
    {
        $devices = $this->deivce->allDevice();

        return DeviceApiResource::collection($devices);
    }


  
}
