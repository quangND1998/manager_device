<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ipaddress extends Model
{
    use HasFactory;
    protected $table = 'ipaddresses';
    protected $fillable = ['id', 'ip','country_code','country_name','region_code', 'region_name','zip_code','time_zone','latitude','longitude','history_id','created_at', 'updated_at'];

    public function device(){
        return $this->hasOne(Devices::class,'device_id');
    }

    public function history_device(){
        return $this->belongsTo(HistoryDevice::class,'history_id');
    }
   
}
