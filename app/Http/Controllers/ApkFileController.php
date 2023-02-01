<?php

namespace App\Http\Controllers;

use App\Events\InstallApkFile;
use App\Events\UnInstallApkFile;
use App\Models\ApkFile;
use App\Models\Devices;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\FileUploadTrait;
use App\Http\Resources\ApkResource;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApkFileController extends Controller
{
    use FileUploadTrait;

    public function index(){
        $user = Auth::user();
        if($user->hasPermissionTo('user-manager')){
            $list_apk = ApkFile::with('user')->get();
        }
        else{
            $list_apk = ApkFile::with('user')->where('user_id',$user->id)->get();
        }
        $list_apk = ApkResource::collection($list_apk);
        return Inertia::render('APK/Index',compact('list_apk'));
      
    }
    public function store(Request $request){
  
        $this->validate($request,[
            'name' => 'required',
            'path' => 'required'
    
        ]);
    
        $allowedfileExtension =['apk'];
        if($request->hasFile('path')){
            $extension = $request->file('path')->getClientOriginalExtension();
            $check=in_array($extension,$allowedfileExtension);
           
            if (!$check) {
                return redirect()->route('apk.index')->with('error', 'not upload unsuccessfully');
            }
        }
    

        $destinationpath= '/apk/';
        if (!file_exists(public_path().$destinationpath)) {
            mkdir(public_path().$destinationpath, 0777, true);
        }
        ApkFile::create([
            'name' => $request->name,
            'path' => $request->hasFile('path') ? $this->image($request->file('path'), $destinationpath):null,
            'user_id' => Auth::user()->id
        ]);
        return redirect()->route('apk.index')->with('success', 'Connect successfully');
    }
    public function update(Request $request, $id){
        $this->validate($request,[
            'name' => 'required',
        
    
        ]);
        $allowedfileExtension =['apk'];
        if($request->hasFile('path')){
            $extension = $request->file('path')->getClientOriginalExtension();
            $check=in_array($extension,$allowedfileExtension);
            if (!$check) {
                return redirect()->route('apk.index')->with('error', 'not upload unsuccessfully');
            }
        }
       
       
        $apk = ApkFile::findOrFail($id);
        $destinationpath= '/apk/';
        if (!file_exists(public_path().$destinationpath)) {
            mkdir(public_path().$destinationpath, 0777, true);
        }
     
        $apk->update([
            'name' => $request->name,
            'path' => $request->hasFile('path') ? $this->update_image($request->file('path'),time(), $destinationpath, $apk->path): $apk->path,
        ]);
        return back()->with('success', 'Connect successfully');
    }

    public function delete($id){
        $apk = ApkFile::findOrFail($id);
        $extension = " ";
        $this->DeleteFolder($apk->path,$extension);

        $apk->delete();
        return back()->with('success', 'Delete successfully');

    }

    public function installApk(Request $request){
        $this->validate($request,[
            'path' => 'required',

        ]);
       
        $ids = $request->ids;
        if($ids ==null){
            return back()->with('warning' ,"You must choose in checkbox !!!.");
        }
        $devices =Devices::whereIn('id', $ids)->get();
      
        foreach($devices as $device){
            broadcast(new InstallApkFile($device, $request->root().$request->path));
          
        }

        return back()->with('success', 'Install successfully');
    }

    public function UninstallApk(Request $request){
         $this->validate($request,[
            'link_app' => 'required',

        ]);
     
        $ids = $request->ids;
        if($ids ==null){
            return back()->with('warning' ,"You must choose in checkbox !!!.");
        }
        $devices =Devices::whereIn('id', $ids)->get();
      
        foreach($devices as $device){
            if($device->hasApp($request->link_app)){
                broadcast(new UnInstallApkFile($device, $request->link_app));
            }
          
        }
        return back()->with('success', 'Uninstall successfully');
    }
    



}
