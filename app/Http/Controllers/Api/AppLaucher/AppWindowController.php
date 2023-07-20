<?php

namespace App\Http\Controllers\Api\AppLaucher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\FileUploadTrait;
use App\Http\Resources\AppWindowResource;
use App\Models\AppWindow;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
class AppWindowController extends Controller
{
    use FileUploadTrait;

    public function __construct()
    {
       
        $this->middleware('permission:user-manager|Pro|Demo|Lite', ['only' => ['index', 'show', 'store', 'update','delete']]);
        // $this->middleware('permission:user-manager', ['only' => []]);
     
    }
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
            'icon' =>   'required',
            'thumb' =>   'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $middlepath = '/window/';
        $path = public_path($middlepath);

        if (!File::exists($path)) {

            File::makeDirectory($path, 0777, true);
        }
        $app = AppWindow::create([
            'name' => $request->name,
            'path' => $request->path,
            'version' => $request->version,
            'description' => $request->description,
            'packageName'=> $request->packageName,
            'size'=> $request->icon?  $request->size : null,
            'icon' => $this->convertBase64toImage($request->icon),
            'user_id' => Auth::user()->id,
            'thumb' => $request->file('thumb') ? $this->image($request->file('thumb'), $middlepath):null,
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
            'icon' =>   'nullable',
            'thumb' =>   'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $middlepath = '/window/';
        $path = public_path($middlepath);
        if (!File::exists($path)) {

            File::makeDirectory($path, 0777, true);
        }

        $app->update([
            'name' => $request->name,
            'path' => $request->path,
            'version' => $request->version,
            'description' => $request->description,
            'packageName'=> $request->packageName,
            'size'=>  $request->icon?  $request->size : $app->size,
            'icon' => $request->icon ? $this->convertBase64toImage($request->icon, $app->icon): $app->icon,
            'thumb' => $request->file('thumb') ? $this->update_image($request->file('thumb'), time(), $middlepath, $app->thumb) : $app->thumb,
        ]);
        return new AppWindowResource($app);
    }


    public function delete(AppWindow $app)
    {

        $extension = " ";
        $this->DeleteFolder($app->icon, $extension);
        $this->DeleteFolder($app->thumb, $extension);
        $app->delete();
        return new AppWindowResource($app);
    }
}
