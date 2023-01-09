<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserApiResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $credentials = $request->only('email', 'password');
        if (!($token = JWTAuth::attempt($credentials))) {

            return response()->json([
                'status' => 'error',
                'error' => 'Invalid username, password, security token',
                'msg' => 'Invalid username, password, security token'
            ], Response::HTTP_BAD_REQUEST);
        }
        $user = Auth::user();
        $response  = [
            'msg' => 'You are logged in!',
            'token' => $token,
            'user_name' => $user->name,
            'user' => $user
        ];
        return response()->json($response, Response::HTTP_OK);
    }

    public function refresh()
    {
        return response(JWTAuth::getToken(), Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $request->validate(['token' => 'required']);

        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json('You have successfully logged out.', Response::HTTP_OK);
        } catch (JWTException $e) {
            return response()->json('Failed to logout, please try again.', Response::HTTP_BAD_REQUEST);
        }
    }



    public function getUserByToken(Request $request){
        // try {
        //     JWTAuth::invalidate($request->input('token'));
        $user =  JWTAuth::user($request->input('token'));
        return new UserApiResource($user);
           
        //     return $user;
        //     return response()->json('You have successfully logged out.', Response::HTTP_OK);
        // } catch (JWTException $e) {
        //     return response()->json('Failed, please try again.', Response::HTTP_BAD_REQUEST);
        // }
    }

    public function create_user(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'role' => 'required'

        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $user = User::create([
            'name'=> $request->name,
            'email' => $request->email
        ]);
        $user->password = Hash::make($request->password);

        if($request->role =='Pro' || $request->role =='Pro2' || $request->role =='Manager' ||  $request->role =='Sub Admin' ){
            $role = Role::where('name','Pro')->first();
            $user->roles()->sync($role);

        }
        else if($request->role =='Admin'){
            $role = Role::where('name','administrator')->first();
            $user->roles()->sync($role);

        }
        else if($request->role =='Demo'){
            $role = Role::where('name',$request->role)->first();
            $user->roles()->sync($role);

        } else{
            $role = Role::where('name',$request->role)->first();
            $user->roles()->sync($role);

        }
        $user->save();
        return response()->json('Create successfully', Response::HTTP_OK);
    }

    public function update_user(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required'

        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $user = User::where('email', $request->email)->first();
        if($user){
            $user->update([
                'name'=> $request->name,
                'email' => $request->email
            ]);
        }
        
        if($request->role =='Pro' || $request->role =='Pro2' || $request->role =='Manager' ||  $request->role =='Sub Admin' ){
            $role = Role::where('name','Pro')->first();
            $user->roles()->sync($role);

        }
        else if($request->role =='Admin'){
            $role = Role::where('name','administrator')->first();
            $user->roles()->sync($role);

        }
        else if($request->role =='Demo'){
            $role = Role::where('name',$request->role)->first();
            $user->roles()->sync($role);

        } else{
            $role = Role::where('name',$request->role)->first();
            $user->roles()->sync($role);

        }

        $user->save();
        return response()->json('Update successfully', Response::HTTP_OK);
    }
    
    


}
