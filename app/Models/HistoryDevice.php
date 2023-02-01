<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryDevice extends Model
{
    use HasFactory;
    protected $table = 'history_devices';
    protected $fillable = ['id', 'device_id','time_login', 'created_at', 'updated_at'];

    public function device(){
        return $this->belongsTo(Devices::class,'device_id');
    }

    public function ipaddress(){
        return $this->hasOne(ipaddress::class,'history_id');
    }
}
