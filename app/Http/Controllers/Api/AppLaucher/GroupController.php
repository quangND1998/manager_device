<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Events\DefaultAppEvent;
use App\Events\LaunchAppEvent;
use App\Events\LaunchAppWithTime;
use App\Events\SendDeviceActiveEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\GroupRequest;
use App\Http\Requests\LauchAppRequest;
use App\Http\Requests\RemoveOwnerDeviceRequest;
use App\Http\Requests\RequestAppGroupAction;
use App\Http\Requests\RequestAppGroupWithTime;
use App\Http\Requests\RequestApplication;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\DevicesResource;
use App\Http\Resources\GroupResource;
use App\Jobs\SendDeviceActiveJob;
use App\Models\Applicaion;
use App\Models\Devices;
use App\Models\Groups;
use App\Repositories\ApplicationRepository;
use App\Repositories\DeviceRepository;
use App\Repositories\GroupRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use App\Jobs\LaunchAppJob;
use App\Jobs\LaunchAppTimeLimit;
use App\Jobs\SetDefaultAppJob;
use App\Jobs\TimeEndGroupProcessing;
use App\Models\ApplicationDefault;
use Carbon\Carbon;

class GroupController extends Controller
{
    protected $application, $device, $group;




    public function __construct(ApplicationRepository $ApplicationRepository, DeviceRepository $deviceRepository, GroupRepository $groupRepository)
    {
        $this->application = $ApplicationRepository;
        $this->device = $deviceRepository;
        $this->group = $groupRepository;
        $this->middleware('permission:user-manager|Pro|Demo|Standard', ['only' => ['getGroups', 'groupByIdwithApp', 'groupById', 'store','update','ownerDevice','deleteOwnerDevice','delete','runAppGoup','runAppGroupWithTime','setAppDefaultGroup']]);
    }

    /**
     * Get groups 
     *
     * @var int $userId
     * @var int $postId
     *
     * @return boolean
     */

    public function getGroups()
    {
        $groups = $this->group->groups();
        // $devices = $this->device->get();
        // $applications = $this->application->applicationsByDeivces($devices);
        // $groups = Cache::remember('groups', 15, function () {
        //     return
        //         $this->group->groups();
        // });
        // $devices = Cache::remember('devices', 15, function () {
        //     return
        //          $this->device->devicesNoGroup();
        // });
        // $applications = Cache::remember('applications', 15, function () use($devices){
        //     return
        //         $this->application->applicationsByDeivces($devices);
        // });

        $response  = [
            'groups' =>GroupResource::collection($groups)
            // 'devices' =>   $devices 
        ];
        return response()->json($response, 200);
    }

    public function groupByIdwithApp(Request $request, $id)
    {

        if ($request->packageName) {
            $group = $this->group->withApplication($id);
            if (!$group) {
                return response()->json('Not found group', 404);
            } else {
                foreach($group->devices as $device){
                    SendDeviceActiveJob::dispatch($device)->onConnection('sync'); 
                   // broadcast(new SendDeviceActiveEvent($device));
                }
                $response  = [
                    'group' => new GroupResource($group),
                ];
                return response()->json($response, 200);
            }
        } else {
            return response()->json('Not found :packageName', 404);
        }
    }


    public function devices()
    {
        $devices = $this->device->get();
        return response()->json($devices, 200);
    }
    public function groupById(Request $request, $id)
    {
        $group = $this->group->show($request,$id);
      
        if (!$group) {
            return response()->json('Not found group', 404);
        } else {
            // $devices =   $this->device->get();
            // $applications = $this->application->applicationsByDeivces($devices);
            $response  = [
                'group' => new GroupResource($group),
                // 'devices' => DevicesResource::collection($devices),
                // 'applications' => ApplicationResource::collection($applications)
            ];
            return response()->json($response, 200);
        }
    }

    public function store(GroupRequest $request)
    {


        $devices = Devices::find($request->devices);
        $group = Groups::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id
        ]);
        $group->devices()->sync($devices);

        return response()->json($group->load(['devices.applications']), 200);
    }


    public function update(UpdateGroupRequest $request, $id)
    {

        $group = Groups::find($id);
        if (!$group) {
            return response()->json('Not found group', 404);
        }
        $devices = Devices::find($request->devices);
        $group->update([
            'name' => $request->name,
        ]);
        $group->devices()->sync($devices);

        return response()->json(new GroupResource($group->load(['devices.default_app'])), 200);
    }

    public function ownerDevice(RequestApplication $request, $id)
    {
        $group = Groups::find($id);
        if (!$group) {
            return response()->json('Not found group', 404);
        }
        $devices = Devices::find($request->devices);

        $group->devices()->sync($devices);
        return response()->json($group->load(['devices.default_app']), 200);
    }
    public function deleteOwnerDevice(RemoveOwnerDeviceRequest $request, $id)
    {
        $group = Groups::find($request->group_id);
        if (!$group) {
            return response()->json('Not found group', 404);
        }
        $device = Devices::findOrFail($id);
        $group->devices()->detach($device);
        if($request->packageName){
        
            return response()->json(new GroupResource($group), 200);
        }
        else{
            return response()->json($group->load(['devices.default_app']), 200);
        }
       
    }

    // public function deleteOwnerDeviceGame(RemoveOwnerDeviceRequest $request, $id)
    // {
    //     $group = Groups::find($request->group_id);
    //     if (!$group) {
    //         return response()->json('Not found group', 404);
    //     }
    //     $device = Devices::findOrFail($id);
    //     $group->devices()->detach($device);
    //     return response()->json(new GroupResource($group), 200);
    // }




    public function delete($id)
    {
        $group = Groups::findOrFail($id);
        if (!$group) {
            return response()->json('Not found group', 404);
        }
        $group->delete();
        return response()->json($group, 200);
    }


    public function runAppGoup(RequestAppGroupAction $request, $id)
    {

        $group = Groups::with('devices')->find($id);
        if (!$group) {
            return response()->json('Not found group', 404);
        }
        foreach ($group->devices as $device) {
            if ($device->hasApp($request->link_app)) {
                //broadcast(new LaunchAppEvent($device, $request->link_app));
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
            }
        }
        return response()->json($group->load(['devices.applications']), 200);
    }

    public function runAppGroupWithTime(RequestAppGroupWithTime $request, $id)
    {
        
        $group = Groups::with('devices')->find($id);
        if (!$group) {
            return response()->json('Not found group', 404);
        }
    
        foreach ($group->devices as $device) {
            if ($device->hasApp($request->link_app)) {
                //broadcast(new LaunchAppEvent($device, $request->link_app));
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
                LaunchAppTimeLimit::dispatch($device,$request->link_app, $request->time)->delay(now()->addMinutes($request->time));
            }
        }
        $group->time = Carbon::now()->addMinutes($request->time);
        $application = Applicaion::where('packageName', $request->link_app)->first();
        if($application){
            $group->app_run_id = $application->id;
        }
        $group->save();
        $user = Auth::user();
        TimeEndGroupProcessing::dispatch($user, $group)->delay(now()->addMinutes($request->time -1)->addSeconds(30));
        return response()->json($group->load(['devices.applications']), 200);
    }



    public function setAppDefaultGroup(RequestAppGroupAction $request, $id)
    {

        $group = Groups::with('devices')->findOrFail($id);
        $application = Applicaion::where('packageName', $request->link_app)->first();
        $application_default = ApplicationDefault::pluck('packageName');
        $application_share = Applicaion::where('packageName', $request->link_app)->first();
        foreach ($group->devices as $device) {
            if ($device->hasApp($request->link_app))  {
                if(!$device->enabled && in_array($request->link_app, $application_default)){
                    $device->app_default_id = $application ? $application->id :  $application_share->id;
                    $device->save();
                }
                else{
                    $device->app_default_id = $application ? $application->id :  $application_share->id;
                    $device->save();
                }
                // broadcast(new DefaultAppEvent($device, $request->link_app));
                SetDefaultAppJob::dispatch($device, $request->link_app)->onConnection('sync');
            }
        }
        return response()->json($group->load('devices.default_app'), 200);
    }
}
