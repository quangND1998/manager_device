<?php

namespace App\Repositories;

use App\Models\Applicaion;
use App\Models\ApplicationDefault;
use App\Models\Devices;
use Carbon\Carbon;
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
        $user = Auth::user();
        $isExpired= Carbon::now()->gt($user->time_limit);
        return  $this->model()->whereIn('device_id', $devices)->get();
        // if ($user->hasPermissionTo('user-manager')) {
        //     return  $this->model()->whereIn('device_id', $devices)->get();
        // } elseif ($user->hasPermissionTo('Demo')) {
        //     // Tai khoan Lite tra ve cac app mac dinh
        //     return  $this->model()->whereIn('device_id', $devices)->get();
        // }
        // else {
        //     // Het time limit tra ve cac app mac dinh
        //     if($isExpired){
        //        return  $this->model()->whereIn('device_id', $devices)->get();
        //     }
        //     else{
        //         // Tra ve cac danh sach app cua cac device
        //         return  $this->model()->whereIn('device_id', $devices)->get();
        //     }
        // }
    }



    public function applications()
    {
        return   $this->model()->groupby('packageName')->get();
    }


    public function devices(){
        $user = Auth::user();
        $devices= Devices::with('applications')->where('user_id', $user->id)->get();
        return $devices;
    }

}
