<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicaion extends Model
{
    use HasFactory;
    protected $table = 'applications';
    protected $fillable = ['id',    'appName',  'packageName','default', 'icon', 'version', 'device_id',  'created_at',  'updated_at'];

    public function device()
    {
        return $this->belongsTo(Devices::class, 'device_id');
    }
 
 

}
