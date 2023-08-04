<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Groups;
use Illuminate\Support\Facades\Auth;

class GroupRepository extends BaseRepository
{

    /**
     * Init model associate with this repository
     */
    protected function model()
    {
        return new Groups;
    }


    public function groups()
    {
        $user = Auth::user();
        return !$user->hasPermissionTo('user-manager') ?
            $this->model()->with('devices','app_running')->where('user_id', $user->id)->get()
            :  $this->model()->with('devices','app_running')->get();
    }

    public function show($request,$id)
    {
        $user = Auth::user();
    

        return !$user->hasPermissionTo('user-manager') ? $this->model()->with(['devices.default_app','devices.applications','app_running','devices'=>function($q) use ($request){
            $q->enabled($request->only('enabled'));
        }])->where('user_id', $user->id)->find($id) : $this->model()->with(['devices.default_app','devices.applications','app_running','devices'=>function($q) use ($request){
            $q->enabled($request->only('enabled'));
        }])->find($id);
    }

    public function withApplication($id)
    {
        $user = Auth::user();
    

        return !$user->hasPermissionTo('user-manager') ? $this->model()->with('devices')->where('user_id', $user->id)->find($id) : $this->model()->with('devices.default_app')->find($id);
    }
}
