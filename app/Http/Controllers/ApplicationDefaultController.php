<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApplicationDefault;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Traits\FileUploadTrait;
use Illuminate\Support\Facades\File;

class ApplicationDefaultController extends Controller
{
    use FileUploadTrait;

    function __construct()
    {
        $this->middleware('permission:user-manager', ['only' => ['index', 'store', 'update', 'delete']]);
    
    }
    public function index(Request $request){
        $applications = ApplicationDefault::where(function ($query) use ($request) {
            $query->where('appName', 'LIKE', '%' . $request->name . '%');
        })->paginate(15)->appends(['name' => $request->name]);

        return Inertia::render('ApplicationDefault/Index', compact('applications'));
    }


    public function store(Request $request){

        $this->validate($request, [
            'appName' => 'required|unique:application_defaults,appName',
            'version' => 'required',
            'packageName'=> 'required',
            'icon' =>   'required',
        ]);
      
        $middlepath = '/application/';
        $path = public_path($middlepath);

        if (!File::exists($path)) {

            File::makeDirectory($path, 0777, true);
        }
        $app = ApplicationDefault::create([
            'appName' => $request->appName,
            'version' => $request->version,
            'packageName'=> $request->packageName,
            'icon' => $this->convertBase64toImage($request->icon),
        ]);
        return back()->with('success', 'Create successfully');
        
    }


    public function update(Request $request, ApplicationDefault $app){

        $this->validate($request, [
            'appName' => 'required|unique:application_defaults,appName,' . $app->id,
            'version' => 'required',
            'packageName'=> 'required',
            'icon' =>   'nullable',
        ]);

        $middlepath = '/application/';
        $path = public_path($middlepath);

        if (!File::exists($path)) {

            File::makeDirectory($path, 0777, true);
        }
        $app->update([
            'appName' => $request->appName,
            'version' => $request->version,
            'packageName'=> $request->packageName,
            'icon' => $request->icon ? $this->convertBase64toImage($request->icon, $app->icon): $app->icon,
        ]);
        return back()->with('success', 'Update successfully');
        
    }

    public function delete(ApplicationDefault $app)
    {

        $extension = " ";
        $this->DeleteFolder($app->icon, $extension);
        $this->DeleteFolder($app->thumb, $extension);
        $app->delete();
        return back()->with("success","Delete successfully");
    }
}
