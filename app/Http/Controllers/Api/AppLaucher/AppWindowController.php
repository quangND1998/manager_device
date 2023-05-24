<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\FileUploadTrait;
use App\Http\Resources\AppWindowResource;
use App\Models\AppWindow;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AppWindowController extends Controller
{
    use FileUploadTrait;
    public function index()
    {
        $window_apps = AppWindow::where('user_id', Auth::user()->id)->get();
    
        return AppWindowResource::collection($window_apps);
    }

    public function show($id)
    {
        $window_apps = AppWindow::find($id);
        if($window_apps){
            return  new AppWindowResource($window_apps);
        }
        else{
            return response()->json('Not found', 404);
        }
    
       
    }


    public function store(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'path' => 'required',
            'version' => 'required',
            'packageName'=> 'required',
            'icon' =>   'required|image|mimes:jpeg,png,jpg|max:2048',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }



        $middlepath = '/window/';
        $path = public_path($middlepath);
        if (!Storage::exists($path)) {

            Storage::makeDirectory($path, 0777, true, true);
        }

        $app = AppWindow::create([
            'name' => $request->name,
            'path' => $request->path,
            'version' => $request->version,
            'packageName'=> $request->packageName,
            'icon' => $this->image($request->file('icon'), $middlepath),
            'user_id' => Auth::user()->id
        ]);
        return new AppWindowResource($app);
    }


    public function update(Request $request, AppWindow $app)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'path' => 'required',
            'version' => 'required',
            'packageName'=> 'required',
            'icon' =>   'nullable|image|mimes:jpeg,png,jpg|max:2048',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $middlepath = '/window/';
        $path = public_path($middlepath);
        if (!Storage::exists($path)) {

            Storage::makeDirectory($path, 0777, true, true);
        }

        $app->update([
            'name' => $request->name,
            'path' => $request->path,
            'version' => $request->version,
            'packageName'=> $request->packageName,
            'icon' => $request->file('icon') ? $this->update_image($request->file('icon'), time(), $middlepath, $app->icon) : $app->icon,
        ]);
        return new AppWindowResource($app);
    }


    public function delete(AppWindow $app)
    {

        $extension = " ";
        $this->DeleteFolder($app->icon, $extension);
        $app->delete();
        return new AppWindowResource($app);
    }
}
