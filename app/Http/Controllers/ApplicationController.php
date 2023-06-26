<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestApplication;
use App\Models\Applicaion;
use App\Models\Devices;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Repositories\ApplicationRepository;
use App\Http\Controllers\Traits\FileUploadTrait;
class ApplicationController extends Controller
{
    use FileUploadTrait;
    protected $application;
    function __construct(ApplicationRepository $ApplicationRepository)
    {
        $this->middleware('permission:user-manager', ['only' => ['changeDefault']]);
        $this->application = $ApplicationRepository;
    }

 

    public function index(Request $request)
    {

        $active = $request->input('default');
        if ($active) {
            $applications = Applicaion::with('device')->where(function ($query) use ($request) {
                $query->where('appName', 'LIKE', '%' . $request->name . '%');
                $query->where('default', 1);
            })->paginate(15)->appends(['name' => $request->name, 'default' => $request->input('default')]);
        } else {
            $applications = Applicaion::with('device')->where(function ($query) use ($request) {
                $query->where('appName', 'LIKE', '%' . $request->name . '%');
            })->paginate(15)->appends(['name' => $request->name, 'default' => $request->input('default')]);
        }

        return Inertia::render('Application/Index', compact('applications', 'active'));
    }

    public function applications(RequestApplication $request){
        return $this->application->applicationsByDeivces($request->devices);
    }
    public function saveApplication(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'applications' => 'required',
            'device_id' => 'required'

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $applications = $request->applications;
        $device_id = $request->device_id;

        $device= Devices::with('applications')->where('device_id', $request->device_id)->first();
        if($device){
            foreach ($device->applications as $app) {
                $extension = " ";
                $this->DeleteFolder($app->icon, $extension);
            }
        }
        foreach ($applications as $app) {
            $check_app = Applicaion::where('device_id', $device['id'])->where('packageName',  $app['packageName'])->first();
            if ($check_app) {
                $check_app->update([
                    'appName' => $app['appName'],
                    'icon' => $this->convertBase64toImage($app['icon']),
                    'packageName' => $app['packageName'],
                    'version' => $app['versionName'],
                    'device_id' => $device['id']
                ]);
            } else {
                Applicaion::create([
                    'appName' => $app['appName'],
                    'icon' => $this->convertBase64toImage($app['icon']),
                    'packageName' => $app['packageName'],
                    'version' => $app['versionName'],
                    'device_id' => $device['id']
                ]);
            }
        }
        if($device){
            $update_device = Device::with('applications')->find($device['id']);
            foreach ($update_device->applications as $app) {
                if (file_exists((public_path() . $app->icon))==false) {
                        $app->delete();
                }
            }
        }
        
        return response()->json('Create successfully', Response::HTTP_OK);
    }
    public function changeDefault(Request $request)
    {

        $app = Applicaion::findOrFail($request->id);
        $app->update(['default' => $request->default]);

        return back()->with('success', 'Set default app successfully');
    }
    public function convert()
    {
        $app = Applicaion::find(4);
        return $this->convertBase64toImage($app->icon);
    }

    public function convertBase64toImage($path)
    {

        $imageName = time() . Str::random(10) . '.' . 'png';
        $destinationpath = '/app_icon/';
        if (!file_exists(public_path() . $destinationpath)) {
            mkdir(public_path() . $destinationpath, 0777, true);
        }
        file_put_contents(public_path() . $destinationpath . $imageName, base64_decode($path));
        return $destinationpath . $imageName;
    }
}
