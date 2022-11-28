<?php

namespace App\Http\Controllers\Admin;

use App\Errors\InertiaErrors;
use App\Http\Controllers\Controller;
use App\Http\Controllers\InertiaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;

class UserController extends InertiaController
{

    public function __construct()
    {
        $this->middleware('permission:user-manager|create-user|delete-user', ['only' => ['index']]);
        $this->middleware('permission:create-user', ['only' => ['store', 'update']]);
        $this->middleware('permission:delete-user', ['only' => ['destroy']]);
    }
    public function index(Request $request)
    {

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
                'phone' => 'required|unique:users,phone|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
                'roles' => 'required',
            ]
        );

        $user = User::create($request->all());
        $roles = $request->input('roles') ? $request->input('roles') : [];
        $user->assignRole($roles);
        $user->created_byId = Auth::user()->id;
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
                'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|unique:users,phone,' . $user->id,
                'roles' => 'required',
            ]
        );

        $user->update($request->all());
        $roles = $request->input('roles') ? $request->input('roles') : [];
        $user->syncRoles($roles);
        $user->created_byId = Auth::user()->id;
        $user->save();
        return back()->with('success', 'Update user successfully');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->back()->with('success', "Xóa tài khoản  thành công");
    }
}
