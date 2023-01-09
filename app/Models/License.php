<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class License extends Model
{
    protected $table = 'licenses';
    protected $fillable = ['id',    'time_free_start',  'time_free_current','time_limit', 'device_limit', 'user_id',   'created_at',  'updated_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
 
}
