<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;

class PermisssionController extends Controller
{
    public function index(){
        $permissions = Permission::paginate(20);
       
        return response()->json($permissions, Response::HTTP_OK);
    }


    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $permission = Permission::create($request->all());
        return response()->json($permission, Response::HTTP_OK);
    }
    public function get($id){
        $permission = Permission::find($id);
        if($permission){
            return response()->json($permission, Response::HTTP_OK);
        }
        else{

            $response=[
                'msg' => 'Not Found'
            ];
            return response()->json($response, Response::HTTP_BAD_REQUEST);
        }
    }
    public function update(Request $request, $id){
        $permission = Permission::find($id);
        if($permission){

            $validator = Validator::make($request->all(), [
                'name' => 'required|unique:permissions,name,' . $permission->id,
    
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), Response::HTTP_BAD_REQUEST);
            }

            $permission->name = $request->name;
            $permission->save();
            return response()->json($permission, Response::HTTP_OK);
        }
        else{
            $response=[
                'msg' => 'Not Found'
            ];
            return response()->json($response, Response::HTTP_BAD_REQUEST);
        }
        return response()->json($permission, Response::HTTP_OK);
    }
    public function delete($id){
      
        $permission = Permission::find($id);
        if($permission){

            $permission->delete();
            return response()->json($permission, Response::HTTP_OK);
        }
        else{

            $response=[
                'msg' => 'Not Found'
            ];
            return response()->json($response, Response::HTTP_BAD_REQUEST);
        }
    }


}
