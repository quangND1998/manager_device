<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomTable extends Model
{
    use HasFactory;
    protected $table = 'room';
    protected $fillable = ['id',    'title_room', 'image_room','content_room', 'like_room','run_room', 'created_at',  'updated_at'];
}
