<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devices extends Model
{
    use HasFactory;
    protected $table = 'devices';
    protected $fillable = ['id',    'device_id',  'name', 'brand', 'os_version', 'battery',  'created_at', 'state',   'updated_at'];

    public function groups()
    {
        return $this->belongsToMany(Groups::class, 'group_device', 'device_id', 'group_id')->withPivot('state');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function applications(){
        return $this->hasMany(Applicaion::class,'device_id');
    }

    public function hasApp($packageName)
    {   
        if(count($this->applications->where('packageName',$packageName)->values()) >0){
            return true;
        }
        else{
            return false;
        }
    }

    

 
}
