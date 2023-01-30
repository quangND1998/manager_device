<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApkFile extends Model
{
    use HasFactory;
    protected $table = 'apk_files';
    protected $fillable = ['id',    'name',  'path',  'created_at',  'updated_at'];
    // protected $hidden = [
    //     'icon',
    //     // 'remember_token',
    // ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
