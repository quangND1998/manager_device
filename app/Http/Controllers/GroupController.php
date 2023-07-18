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
use Carbon\Carbon;

class GroupController extends Controller
{

    
    public function index(Request $request)
    {

        $user= Auth::user();
        $groupId =  $request->input('group');
        if($user->hasPermissionTo('user-manager')){
            $groups = Groups::with('devices.applications')->get();
            
            $nogroup_devices = Devices::with('applications')->doesntHave('groups')->get();
            $applications = Applicaion::groupby('packageName')->whereIn('device_id',$nogroup_devices->pluck('id'))->get();
        }
        else if($user->hasPermissionTo('Lite')){
           
            $groups = Groups::with('devices.applications')->where('user_id',$user->id)->get();
            $nogroup_devices = Devices::with('applications')->doesntHave('groups')->where('user_id',$user->id)->get();
            $applications = Applicaion::where('default', true)->groupby('packageName')->get();
        }
        else{
            $groups = Groups::with('devices.applications')->where('user_id',$user->id)->get();
            $nogroup_devices = Devices::with('applications')->doesntHave('groups')->where('user_id',$user->id)->get();
            $applications = Applicaion::groupby('packageName')->whereIn('device_id',$nogroup_devices->pluck('id'))->get();
        }

        if (count($groups) > 0) {
            if ($groupId == null) {
                $current_group = $groups[0];
                // $new_devices = array_merge($nogroup_devices,$current_group->devices);
            } else {
                $current_group = $groups->find($groupId);
               
                // $devices = $devices + $current_group->devices;
                // $devices = array_merge($nogroup_devices,$current_group->devices);
            }
        } else {
            $current_group = null;
        
        }

        $devices= Arr::collapse([$nogroup_devices, $current_group->devices?? []]);
        return Inertia::render('Group/Index', compact('groups', 'current_group', 'devices','applications'));
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

    public function setAppDefaultGroup(Request $request, $id){
        $this->validate($request, [
            'link_app' => 'required',

        ]);
        $group = Groups::with('devices')->findOrFail($id);
        $application = Applicaion::where('packageName',$request->link_app)->first();
        foreach ($group->devices as $device) {
            if ($device->hasApp($request->link_app)) {
                $device->app_default_id = $application->id;
                $device->save();
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
       
        $group = Groups::with('devices')->find($id);
        if (!$group) {
            return response()->json('Not found group', 404);
        }
      
        foreach ($group->devices as $device) {
            if ($device->hasApp($request->link_app)) {
                LaunchAppJob::dispatch($device, $request->link_app)->onConnection('sync');
                LaunchAppTimeLimit::dispatch($device,$request->link_app, $request->time)->delay(now()->addMinutes($request->time));
            }
        }
        $group->time = Carbon::now()->addMinutes($request->time);
        $group->save();
        $user = Auth::user();
        TimeEndGroupProcessing::dispatch($user, $group)->delay(now()->addMinutes($request->time -1)->addSeconds(30));
        return back()->with('success', 'Launch group successfully');
    }
}
