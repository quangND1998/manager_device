<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryMail extends Model
{
    use HasFactory;
    protected $table = 'history_mails';
    protected $fillable = ['id', 'time_send',  'user_id',  'created_at',  'updated_at'];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
