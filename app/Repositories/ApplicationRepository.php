<?php

namespace App\Repositories;

use App\Models\Applicaion;
use App\Models\Devices;
use Illuminate\Support\Facades\Auth;

class ApplicationRepository extends BaseRepository
{
    /**
     * Init model associate with this repository
     */
    protected function model()
    {
        return new Applicaion;
    }

    /**
     * Remove bookmark post
     *
     * @var int $userId
     * @var int $postId
     *
     * @return boolean
     */
    public function applicationsByDeivces($devices)
    {
        return Applicaion::whereIn('device_id', $devices)->get();
    }


    public function applications()
    {
        return  Applicaion::groupby('packageName')->get();
    }


    public function devices(){
        $user = Auth::user();
        $devices= Devices::with('applications')->where('user_id', $user->id)->get();
        return $devices;
    }

}
