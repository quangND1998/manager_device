<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ApplicationRepository;
use App\Http\Requests\RequestApplication;
use App\Http\Resources\ApplicationResource;

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
}
