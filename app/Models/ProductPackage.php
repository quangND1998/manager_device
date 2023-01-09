<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPackage extends Model
{
    use HasFactory;

    protected $table = 'product_packages';
    protected $fillable = ['id',    'name',  'price','save_money', 'package_time', 'state',   'created_at',  'updated_at'];


}
