<?php

namespace App\Http\Controllers;

use App\Models\Applicaion;
use App\Models\Devices;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;
class ApplicationController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:user-manager', ['only' => ['changeDefault']]);
    }

    public function index(Request $request){
        $active = $request->input('default');
        if($active){
            $applications = Applicaion::with('device')->where(function ($query) use ($request) {
                $query->where('appName', 'LIKE', '%' . $request->name . '%');
                $query->where('default', 1);
            })->paginate(15)->appends(['name' => $request->name, 'default'=>$request->input('default')]);
    
        }
        else{
                $applications = Applicaion::with('device')->where(function ($query) use ($request) {
                    $query->where('appName', 'LIKE', '%' . $request->name . '%');
                })->paginate(15)->appends(['name' => $request->name, 'default'=>$request->input('default')]);
        }
       
        return Inertia::render('Application/Index', compact('applications','active'));
    }
    

    public function saveApplication(Request $request){
        $applications = $request->applications;
        $device_id = $request->device_id;
    
        $device_id = Devices::where('device_id', $request->device_id)->first();
        foreach($applications as $app){   
            $check_app = Applicaion::where('device_id', $device_id['id'])->where('packageName',  $app['packageName'])->first();    
            if($check_app){
               $check_app->update([
                    'appName'=> $app['appName'],
                    'icon' => $app['icon'],
                    'packageName' => $app['packageName'],
                    'version' => $app['versionName'],
                    'device_id' => $device_id['id']
                ]);
             
            }else{
               Applicaion::create([
                    'appName'=> $app['appName'],
                    'icon' => $app['icon'],
                    'packageName' => $app['packageName'],
                    'version' => $app['versionName'],
                    'device_id' => $device_id['id']
                ]);
            }    
          
        }
        return response()->json('Create successfully', Response::HTTP_OK);



    }
    public function changeDefault(Request $request){

        $app = Applicaion::findOrFail($request->id);
        $app->update(['default'=> $request->default]);

        return back()->with('success', 'Set default app successfully');
    }


    public function convertBase64toImage($path){
 
        $imageName = time().Str::random(10).'.'.'png';
        $destinationpath= '/app_icon/';
        if (!file_exists($destinationpath)) {
            mkdir($destinationpath, 0777, true);
        }
        file_put_contents(public_path().$destinationpath.$imageName, base64_decode($path));
        return $destinationpath.$imageName;
        
    }
}
