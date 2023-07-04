<?php 
namespace App\Repositories;

use App\Models\Applicaion;
use App\Models\Devices;
use Illuminate\Support\Facades\Auth;

class DeviceLimitRepository extends BaseRepository
{
    protected function model()
    {
        return new Devices();
    }

    public function limitDevicesByCreated($limit){
        $user = Auth::user();
        return   $this->model()->where('user_id',$user->id)->orderBy('created_at','asc')->take($limit)->get();
    }

    public function changeEnabledDevice($devices){
        foreach($devices as $device){
             $device->update([
                'enabled'=> false
             ]);
        }
    }

}