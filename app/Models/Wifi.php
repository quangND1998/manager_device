<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wifi extends Model
{
    use HasFactory;
    protected $table = 'wifis';
    protected $fillable = ['id', 'SSID',  'password',   'created_at',  'updated_at'];

    public function devices()
    {
        return $this->belongsTo(Devices::class, 'device_id');
    }
}
