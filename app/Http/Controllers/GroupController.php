<?php

namespace App\Http\Controllers;

use App\Events\DefaultAppEvent;
use App\Events\LaunchAppEvent;
use App\Models\Applicaion;
use App\Models\Devices;
use App\Models\Groups;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Arr;
use App\Jobs\LaunchAppJob;
use App\Jobs\LaunchAppTimeLimit;
use App\Jobs\SetDefaultAppJob;
use App\Jobs\TimeEndGroupProcessing;
use App\Models\ApplicationDefault;
use Carbon\Carbon;
use App\Repositories\GroupRepository;

class GroupController extends Controller
{
    protected $groupRepository;
    public function __construct(GroupRepository $groupRepository)
    {

        $this->groupRepository = $groupRepository;
        //$this->middleware('permission:user-manager|Pro|Demo|Standard', ['only' => ['getGroups', 'groupByIdwithApp', 'groupById', 'store','update','ownerDevice','deleteOwnerDevice','delete','runAppGoup','runAppGroupWithTime','setAppDefaultGroup']]);
    }
    public function index(Request $request)
    {

        $user = Auth::user();
        $groupId =  $request->input('group');
        $enabled =  $request->input('enabled');
        if ($user->hasPermissionTo('user-manager')) {
            $groups = Groups::with('devices.applications', 'app_running')->get();

            $nogroup_devices = Devices::with('applications')->doesntHave('groups')->get();
        } else if ($user->hasPermissionTo('Demo')) {

            $groups = Groups::with('devices.applications', 'app_running')->where('user_id', $user->id)->get();
            $nogroup_devices = Devices::with('applications')->doesntHave('groups')->where('user_id', $user->id)->get();
        } else {
            $groups = Groups::with('devices.applications', 'app_running')->where('user_id', $user->id)->get();
            $nogroup_devices = Devices::with('applications')->doesntHave('groups')->where('user_id', $user->id)->get();
        }

        if (count($groups) > 0) {
            if ($groupId == null) {
                $current_group = $groups[0];
                // $new_devices = array_merge($nogroup_devices,$current_group->devices);
            } else {

                $current_group = $this->groupRepository->show($request, $groupId);

                // $devices = $devices + $current_group->devices;
                // $devices = array_merge($nogroup_devices,$current_group->devices);
            }
        } else {
            $current_group = null;
        }
        if ($current_group) {
            $applications = Applicaion::whereIn('device_id', $current_group->devices->pluck('id'))->get();
        } else {
            $applications = [];
        }

        $devices = Arr::collapse([$nogroup_devices, $current_group->devices ?? []]);
        return Inertia::render('Group/Index', compact('groups', 'current_group', 'devices', 'applications', 'enabled'));
    }

    public function getDeviceGourps(Request $request, $id)
    {

        $groups = Groups::with(['devices' => function ($q) use ($request) {
            $q->deletewhere('user_id', Auth::user()->id)->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
            })->paginate(20)->appends(['term' => $request->term]);
        }])->findOrFail($id);
        return Inertia::render('Group/Index', compact('groups'));
    }


    public function store(Request $request)
    {

        $this->validate($request, [

            'name' => 'required',
            'devices' => 'required'

        ]);
        $devices = Devices::find($request->devices);
        $group = Groups::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id
        ]);
        $group->devices()->sync($devices);

        return back()->with('success', 'Create succesfully');
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, [

            'name' => 'required',
            'devices' => 'required'

        ]);
        $group = Groups::findOrFail($id);
        $devices = Devices::find($request->devices);
        $group->update([
            'name' => $request->name,
        ]);
        $group->devices()->sync($devices);

        return back()->with('success', 'Update succesfully');
    }

    public function ownerDevice(Request $request, $id)
    {
        $group = Groups::findOrFail($id);
        $devices = Devices::find($request->devices);

        $group->devices()->sync($devices);
        return back()->with('success', 'Update succesfully');
    }
    public function deleteOwnerDevice(Request $request, $id)
    {
        $group = Groups::findOrFail($request->group_id);
        $device = Devices::findOrFail($id);
        $group->devices()->detach($device);
        return back()->with('success', 'Delete succesfully');
    }



    public function delete($id)
    {
        $group = Groups::findOrFail($id);
        $group->delete();
        return back()->with('success', 'Delete succesfully');
    }


    public function runAppGoup(Request $request, $id)
    {

        $this->validate($request, [
            'link_app' => 'required',

        ]);
        $group = Groups::with('devices')->findOrFail($id);
        foreach ($group->devices as $device) {
            if ($device->hasApp($request->link_app)) {
                // broadcast(new LaunchAppEvent($device, $request->link_app));
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
            }
        }
        return back()->with('success', 'Lauch successfully');
    }

    public function setAppDefaultGroup(Request $request, $id)
    {
        $this->validate($request, [
            'link_app' => 'required',

        ]);
        $group = Groups::with('devices')->findOrFail($id);
        $application_default = ApplicationDefault::pluck('packageName')->toArray();
        $application_share = Applicaion::where('packageName', $request->link_app)->first();

        foreach ($group->devices as $device) {
            if ($device->hasApp($request->link_app)) {
                $application = Applicaion::where('packageName', $request->link_app)->where('device_id', $device->id)->first();
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
        return back()->with('success', 'Lauch successfully');
    }


    public function runAppGroupWithTime(Request $request, $id)
    {
        $this->validate($request, [
            'link_app' => 'required',
            'time' => 'required|numeric|gt:0'
        ]);
        $user = Auth::user();
        $group = Groups::with('devices')->find($id);
        if (!$group) {
            return response()->json('Not found group', 404);
        }

        foreach ($group->devices as $device) {
            if ($device->hasApp($request->link_app)) {
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
                LaunchAppTimeLimit::dispatch($device, $request->link_app, $request->time)->delay(now()->addMinutes($request->time));
            }
        }
        $group->time = Carbon::now()->addMinutes($request->time);
        $group->save();
        $user = Auth::user();
        TimeEndGroupProcessing::dispatch($user, $group)->delay(now()->addMinutes($request->time - 1)->addSeconds(30));
        return back()->with('success', 'Launch group successfully');
    }

  
}
