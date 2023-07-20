<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Illuminate\Auth\AuthenticationException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Exception;
class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        // $this->reportable(function (Throwable $e) {
        //     //
        // });
        // $this->renderable(function (NotFoundHttpException $e, $request) {
        //     return Inertia::render('Error', ['status' => $e->getStatusCode()]);
        // });
        // $this->renderable(function (AccessDeniedHttpException $e, $request) {
        //     return Inertia::render('Error', ['status' => $e->getStatusCode()]);
        // });

        $this->renderable(function (\Spatie\Permission\Exceptions\UnauthorizedException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                                'responseMessage' => 'You do not have the required authorization.',
                                'responseStatus'  => 403,
                            ],403);
            }
        });
      
        
    }
    // public function render($request, Throwable  $exception)
    // {

    //     if($exception instanceof \Spatie\Permission\Exceptions\UnauthorizedException ){
    //         return response()->json([
    //             'responseMessage' => 'You do not have the required authorization.',
    //             'responseStatus'  => 403,
    //         ],403);
    //     }
    //     return parent::render($request, $exception);
    // }

}
