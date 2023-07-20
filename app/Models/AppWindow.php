<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppWindow extends Model
{
    use HasFactory;
    protected $table = 'app_windows';

    protected $fillable = ['id', 'name','description','thumb','size', 'url_vice', 'url_pico', 'url_apk', 'path', 'version', 'user_id', 'icon', 'packageName', 'created_at',  'updated_at'];
    // protected $hidden = [
    //     'icon',
    //     // 'remember_token',
    // ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
