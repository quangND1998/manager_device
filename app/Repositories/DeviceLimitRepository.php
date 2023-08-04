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

    public function limitDevicesByCreated($limit, $user){

        return   $this->model()->where('user_id',$user->id)->orderBy('created_at','asc')->take($limit)->get();
    }

    public function skipDevicesByCreated($limit,$user){
        $count = count($user->devices);
        $take =$count - $limit;
        return $this->model()->where('user_id',$user->id)->orderBy('created_at','asc')->skip($limit)->take( $take)->get();
    }

    public function enabledDevice($device){

             $device->update([
                'enabled'=> true
             ]);
        
    }
    public function disableDevice($device){

        $device->update([
           'enabled'=> false
        ]);
   
    }

    public function updateDeviceLimit($user){
        $limit_devices = $this->limitDevicesByCreated($user->number_device,$user);
    
        $skip_devices = $this->skipDevicesByCreated($user->number_device,$user);
        if(count($limit_devices) >0){
            foreach($limit_devices as $device){
                $this->enabledDevice($device);
            }
        }
        if(count( $skip_devices) >0){
            foreach($skip_devices as $device){
                $this->disableDevice($device);
            }
        }

    }

    public function updateDeviceUnRestricted($user){
        foreach($user->devices as $device){
            $this->enabledDevice($device);
        }  
    }


}