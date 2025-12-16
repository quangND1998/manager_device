<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventTable extends Model
{
    use HasFactory;
    protected $table = 'event';
    protected $fillable = ['id',    'name_event', 'avata_event','email_event', 'image_event','content_event','category_event','member_event','time_event', 'created_at',  'updated_at'];
}
