<?php

namespace App\Repositories;

use App\Models\Devices;
use Illuminate\Support\Facades\Auth;

class DeviceRepository extends BaseRepository
{
    /**
     * Init model associate with this repository
     */
    protected function model()
    {
        return new Devices;
    }

    /**
     * getDeivces post
     *
     * @var int $userId
     * @var int $postId
     *
     * @return boolean
     */
    public function getDeivces($relations, $request, $appends, $sortBy, $sort_Direction)
    {
        $user = Auth::user();
        return !$user->hasPermissionTo('user-manager') ? $this->model()->with($relations)->where('user_id', $user->id)->where(function ($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->term . '%')
                ->orWhere('device_id', 'LIKE', '%' . $request->term . '%');
        })->orderBy($sortBy, $sort_Direction)->paginate(10)->appends($appends) :  $this->model()->with($relations)->where(function ($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->term . '%')
                ->orWhere('device_id', 'LIKE', '%' . $request->term . '%');
        })->orderBy($sortBy, $sort_Direction)->paginate(10)->appends($appends);
    }


    public function get(array $relations=[])
    {
        // $relations=['applications', 'default_app', 'user', 'last_login']
        $user = Auth::user();
        return !$user->hasPermissionTo('user-manager') ?
            $this->model()->with($relations)->where('user_id', $user->id)->get()
            :  $this->model()->with($relations)->get();
    }
}
