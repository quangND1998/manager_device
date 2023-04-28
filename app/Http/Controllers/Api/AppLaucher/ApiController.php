<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Events\DefaultAppEvent;
use App\Events\LaunchAppEvent;
use App\Events\ReciveActiveDeviceEvent;
use App\Events\SendDeviceActiveEvent;
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
use App\Models\User;
use App\Models\Wifi;
use App\Repositories\DeviceRepository;
use Faker\DefaultGenerator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class ApiController extends Controller
{
    protected $deivce;
    public function __construct(DeviceRepository $deviceRepository)
    {
        $this->deivce = $deviceRepository;
    }
    public function devices(Request $request)
    {
        $sortBy = $request->sortBy ? $request->sortBy : 'id';
        $sort_Direction = $request->sortDirection ?  $request->sortDirection : 'asc';
        return DevicesResource::collection($this->deivce->getDeivces(
            ['applications', 'default_app', 'user', 'last_login'],
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
        return new DevicesResource($device->load('applications', 'default_app', 'user', 'last_login'));
    }

    public function delete($id)
    {
        $device = Devices::with('applications')->find($id);
        if (!$device) {
            return response()->json('Not found Device', 404);
        }
        foreach ($device->applications as $app) {
            $extension = " ";
            $this->DeleteFolder($app->icon, $extension);
        }
        $device->applications()->delete();
        $device->delete();
        return new DevicesResource($device->load('applications', 'default_app', 'user', 'last_login'));
    }


    public function setDefaultApp(setAppDefaultRequest $request)
    {
        $devices = Devices::whereIn('id', $request->ids)->get();


        $application_share = Applicaion::where('packageName', $request->link_app)->first();

        foreach ($devices as $device) {
            $application = Applicaion::where('packageName', $request->link_app)->where('device_id', $device->id)->first();
            if ($device->hasApp($request->link_app)) {
                $device->app_default_id = $application ? $application->id :  $application_share->id;
                $device->save();
                broadcast(new DefaultAppEvent($device, $request->link_app));
            }
        }
        return DevicesResource::collection($devices->load('applications', 'default_app', 'user', 'last_login'));
    }

    public function disableDefaultApp($id)
    {
        $device = Devices::find($id);
        if (!$device) {
            return response()->json('Not found Device', 404);
        }
        $device->update(['app_default_id' => null]);
        return new DevicesResource($device->load('applications', 'default_app', 'user', 'last_login'));
    }



    public function lanchApp(setAppDefaultRequest $request)
    {

        $devices = Devices::whereIn('id', $request->ids)->get();

        foreach ($devices as $device) {
            if ($device->hasApp($request->link_app)) {
                broadcast(new LaunchAppEvent($device, $request->link_app));
            }
        }
        return response()->json('Lauch successfully', 200);
    }



    public function checkDevice()
    {
        $user = Auth::user();
        if ($user->hasPermissionTo('user-manager')) {
            $devices = Devices::get();
        } elseif ($user->hasPermissionTo('Lite')) {
            $devices = Devices::where('user_id', $user->id)->get();
        } else {
            $devices = Devices::where('user_id', $user->id)->get();
        }
        foreach ($devices as $device) {
            $device->active = false;
            $device->save();
            broadcast(new SendDeviceActiveEvent($device));
        }
        return response()->json('Run command sucessfully', 200);
    }


    public function checkActiveDevice(ActiveDeviceRequest $request)
    {

        $user = User::with('devices')->find($request->user_id);
        foreach ($user->devices as $device) {
            $device->active = false;
            $device->save();
            broadcast(new SendDeviceActiveEvent($device));
        }
        return response()->json('Run command sucessfully', 200);
    }
}
