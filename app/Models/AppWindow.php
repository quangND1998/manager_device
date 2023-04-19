<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppWindow extends Model
{
    use HasFactory;


    protected $fillable = ['id',    'name',  'path', 'user_id', 'icon',  'created_at',  'updated_at'];
    // protected $hidden = [
    //     'icon',
    //     // 'remember_token',
    // ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
