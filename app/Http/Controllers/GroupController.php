<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\Groups;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function index(Request $request){

        $groups = Groups::where('user_id', Auth::user()->id)->where(function ($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->term . '%');
        })->paginate(20)->appends(['term' => $request->term]);
        return Inertia::render('Group/Index', compact('groups'));
    }

    public function getDeviceGourps(Request $request, $id){

        $groups = Groups::with(['devices' => function($q) use ($request){
            $q->deletewhere('user_id', Auth::user()->id)->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
            })->paginate(20)->appends(['term' => $request->term]);
        }])->findOrFail($id);
        return Inertia::render('Group/Index', compact('groups'));
    }


    public function store(Request $request){
        $this->validate($request,[
          
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


    public function update(Request $request, $id){
        $this->validate($request,[
          
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

    public function ownerDevice(Request $request, $id){
        $group = Groups::findOrFail($id);
        $devices = Devices::find($request->devices);
        $group->update([
            'name' => $request->name,
        ]);
        $group->devices()->sync($devices);
        return back()->with('success', 'Update succesfully');

    }

    public function delete($id){
        $group = Groups::findOrFail($id);
        $group->delete();
        return back()->with('success', 'Delete succesfully');

    }
}

