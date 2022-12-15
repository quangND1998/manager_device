<?php

namespace App\Http\Controllers;

use App\Events\LaunchAppEvent;
use App\Models\Applicaion;
use App\Models\Devices;
use App\Models\Groups;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function index(Request $request)
    {

        $groups = Groups::with('devices.applications')->get();
        $groupId =  $request->input('group');
        $devices = Devices::doesntHave('groups')->get();
        $applications = Applicaion::groupby('packageName')->get();
        if (count($groups) > 0) {
            if ($groupId == null) {
                $current_group = $groups[0];
                // $group_id= $current_group->id;
            } else {
                $current_group = Groups::with('devices.applications')->findOrFail($groupId);
                // $group_id= $current_group->id;
            }
        } else {
            $current_group = [];
        }
        //$devices = Devices::whereNotIn('id', $current_group->devices->pluck('id'))->get();
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
                broadcast(new LaunchAppEvent($device, $request->link_app));
            }
        }
        return back()->with('success', 'Lauch successfully');
    }
}
