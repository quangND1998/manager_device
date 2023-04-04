<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestApplication;
use App\Http\Resources\ApplicationResource;
use Illuminate\Http\Request;
use App\Repositories\ApplicationRepository;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class ApplicationController extends Controller
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
}
