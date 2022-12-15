<?php

namespace App\Http\Controllers;

use App\Models\Applicaion;
use App\Models\Devices;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index(Request $request){
        $applications = Applicaion::with('device')->where(function ($query) use ($request) {
            $query->where('appName', 'LIKE', '%' . $request->name . '%');
        })->paginate(15)->appends(['name' => $request->name]);
        
        return Inertia::render('Application/Index', compact('applications'));
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

}
