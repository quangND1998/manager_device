<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\GameTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Traits\FileUploadTrait;
use Illuminate\Http\Response;
use App\Models\Image;

class GameController extends Controller
{
    //
    use FileUploadTrait;
    public function index(){
   
    	return GameTable::get();


    }
}
