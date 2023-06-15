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
            $this->model()->with('devices')->where('user_id', $user->id)->get()
            :  $this->model()->with('devices')->get();
    }

    public function show($id)
    {
        $user = Auth::user();
    

        return !$user->hasPermissionTo('user-manager') ? $this->model()->with('devices')->where('user_id', $user->id)->find($id) : $this->model()->with('devices')->find($id);
    }
}
