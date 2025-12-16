<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationDefault extends Model
{
    use HasFactory;

    use HasFactory;
    protected $table = 'application_defaults';
    protected $fillable = ['id',    'appName',  'packageName','icon', 'version', 'created_at',  'updated_at'];
  
    
 
}
