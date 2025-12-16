<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameTable extends Model
{
    use HasFactory;
    protected $table = 'game';
    protected $fillable = ['id',    'title_game', 'image_game','content_game', 'visits_game','create_game','max_people','like_game','hastang_game', 'list_image'];
}
