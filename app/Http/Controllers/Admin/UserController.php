<?php

namespace App\Http\Controllers\Admin;

use App\Errors\InertiaErrors;
use App\Http\Controllers\Controller;
use App\Http\Controllers\InertiaController;
use App\Jobs\ImportUser;
use App\Jobs\UpdateUser;
use App\Models\Devices;
use App\Models\HistoryDevice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class UserController extends InertiaController
{

    public function __construct()
    {
        $this->middleware('permission:user-manager|create-user|delete-user|list_device', ['only' => ['index']]);
        $this->middleware('permission:create-user', ['only' => ['store', 'update']]);
        $this->middleware('permission:delete-user', ['only' => ['destroy']]);
    }
    public function index(Request $request)
    {
        // $user = User::with('roles')->find(1);
        // $role= $user->roles->where('name', 'Lite')->first();
        // return $role;
        $user = Auth::user();
        $filters = $request->all('term');
        $users = $this->queryUser($user, $request);
        // if ($user->hasPermissionTo('users_manager')) {
        //     $roles = Role::get();
        // }
        $roles = Role::get();
        return Inertia::render('Admin/User', compact('filters', 'users', 'roles'));
    }

    public function queryUser($user, $request)
    {

        if ($user->hasRole('administrator')) {
            return User::with('roles',  'owner')->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
                $query->orwhere('email', 'LIKE', '%' . $request->term . '%');
                // $query->orwhere('phone', 'LIKE', '%' . $request->term . '%');
            })->paginate(20)->appends($request->term);
        } else {

            return User::with('roles', 'owner')->where('created_byId', $user->id)->where(function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->term . '%');
                $query->orwhere('email', 'LIKE', '%' .  $request->term . '%');
                // $query->orwhere('phone', 'LIKE', '%' .  $request->term . '%');
            })->paginate(20)->appends($request->term);
        }
    }

    public function store(Request $request)
    {

        $this->validate(
            $request,
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'phone' => 'nullable|unique:users,phone|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
                'roles' => 'required',
                'time_limit' => 'nullable|date|after:tomorrow',
                'number_device' => 'nullable|numeric|gt:-1',
                'password' => 'nullable'
            ]
        );

        $user = User::create($request->all());
        $roles = $request->input('roles') ? $request->input('roles') : [];
        $user->assignRole($roles);
        $user->created_byId = Auth::user()->id;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        return back()->with('success', 'Create user successfully');
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $this->validate(
            $request,
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'phone' => 'nullable|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|unique:users,phone,' . $user->id,
                'roles' => 'required',
                'time_limit' => 'nullable|date|after:tomorrow',
                'number_device' => 'nullable|numeric|gt:-1',
                'password' => 'nullable'
            ]
        );
       
        $user->update($request->all());
        $roles = $request->input('roles') ? $request->input('roles') : [];
        $user->syncRoles($roles);
        $user->created_byId = Auth::user()->id;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        return back()->with('success', 'Update user successfully');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->back()->with('success', "Xóa tài khoản  thành công");
    }

    public function importUser(Request $request)
    {

        $this->validate(
            $request,
            [
                'check' => 'required',

            ]
        );
        if ($request->check == 'us') {
            $response = Http::post(env('API_MISSIONX_US') . '/api/v1/logindata', [
                'email' => 'holomiadev@gmail.com',
                'password' => 'HoLoMX@210904*#',
            ]);

            $data = $response->json();
            foreach ($data['users'] as $user) {

                dispatch(new ImportUser($user));
            }
        }

        if ($request->check == 'china') {
            $response = Http::post(env('API_MISSIONX_CN') . '/api/v1/logindata', [
                'email' => 'holomiadev@gmail.com',
                'password' => 'HoLoMX@210904*#',
            ]);
            $data = $response->json();
            foreach ($data['users'] as $user) {

                dispatch(new ImportUser($user));
            }
        }

        return redirect('/users')->with('success', 'Import user successfully');
    }

    public function updateUsers(Request $request)
    {
        $this->validate(
            $request,
            [
                'check' => 'required',

            ]
        );

        if ($request->check == 'us') {
            $response = Http::post(env('API_MISSIONX_US') . '/api/v1/logindata', [
                'email' => 'holomiadev@gmail.com',
                'password' => 'HoLoMX@210904*#',
            ]);

            $data = $response->json();
            foreach ($data['users'] as $user) {

                dispatch(new UpdateUser($user));
            }
        }

        if ($request->check == 'china') {
            $response = Http::post(env('API_MISSIONX_CN') . '/api/v1/logindata', [
                'email' => 'holomiadev@gmail.com',
                'password' => 'HoLoMX@210904*#',
            ]);
            $data = $response->json();
            foreach ($data['users'] as $user) {

                dispatch(new UpdateUser($user));
            }
        }

        return redirect('/users')->with('success', 'Import user successfully');
    }


    public function detail($id)
    {
        $user = User::with('roles')->findOrFail($id);
        return Inertia::render('User/Index', compact('user'));
    }

    public function list_device($id, Request $request)
    {
        $sortBy = $request->sortBy ? $request->sortBy : 'id';
        $sortDirection = $request->sortDirection ?  $request->sortDirection : 'asc';
        $user = User::with('roles')->findOrFail($id);
        $devices = Devices::with('user', 'default_app', 'last_login')->where('user_id', $id)->where(function ($query) use ($request) {
            $query->where('name', 'LIKE', '%' . $request->term . '%');
        })->orderBy('active', 'desc')->orderBy($sortBy, $sortDirection)->paginate(15)->appends(['page' => $request->page, 'name' => $request->term, 'sortBy' => $request->sortBy, 'sortDirection' => $request->sortDirection]);
        return Inertia::render('User/Devices', compact('user', 'devices'));
    }

    public function history_login($id)
    {
        $user = User::with('roles', 'devices')->findOrFail($id);
        $devices = $user->devices->pluck('id');
        $histories = HistoryDevice::with(['ipaddress', 'device.user'])->whereIn('device_id', $devices)->orderBy('id', 'desc')->paginate(15);
        return Inertia::render('User/History', compact('user', 'histories'));
    }
}
