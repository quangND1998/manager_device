<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groups extends Model
{
    use HasFactory;
    protected $table = 'groups';
    protected $fillable = ['id', 'code','name','time', 'created_at', 'user_id','app_run_id' , 'updated_at'];
    public function getTimeAttribute($value)
    {
        return strtotime($value);
    }
    public function devices()
    {
        return $this->belongsToMany(Devices::class, 'group_device', 'group_id', 'device_id');
    }

    public function hasDevice($device_id)
    {
        foreach ($this->devices as $device) {
            if ($device->id == $device_id) {
                return true;
            }
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function app_running(){
        return $this->belongsTo(Applicaion::class,'app_run_id');
    }
}
