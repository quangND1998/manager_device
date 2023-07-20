<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ApplicationRepository;
use App\Http\Requests\RequestApplication;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\Device\DeviceResouce;

class AppController extends Controller
{
    protected $application;



    public function __construct(ApplicationRepository $ApplicationRepository)
    {
        $this->application = $ApplicationRepository;
    }

    /**
     * Get applications 
     *
     * @var int $userId
     * @var int $postId
     *
     * @return boolean
     */

    public function applications(RequestApplication $request)
    {   
        
        return ApplicationResource::collection($this->application->applicationsByDeivces($request->devices));
    }


    public function devices(Request $request){
        if($request->packageName){
            return DeviceResouce::collection($this->application->devices());
        }
        else{
            return response()->json('Not found :packageName', 404);
        }
       
    }




}
