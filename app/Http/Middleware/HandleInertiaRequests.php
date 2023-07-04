<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Http\Resources\UserResource;
use App\Models\ApplicationDefault;
use Illuminate\Support\Facades\Session;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ?  new UserResource($request->user()) :  $request->user(),
                // 'roles'=>  Auth::user()->roles,
                'can' => $request->user() ? $request->user()->getPermissionArray() : [],
                'roles' => $request->user() ? $request->user()->getRolesArray() : [],
                // 'owner' => $request->user() ? User::find($request->user()['created_byId']) : null
            ],
            // 'default_applications' =>  ApplicationDefault::get(),
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'warning' => $request->session()->get('warning')

                ];
            },
            'cart' => $request->session()->get('cart'),
        ]);
    }
}
