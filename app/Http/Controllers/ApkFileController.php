<?php

namespace App\Http\Controllers;

use App\Events\InstallApkFile;
use App\Models\ApkFile;
use App\Models\Devices;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\FileUploadTrait;
class ApkFileController extends Controller
{
    use FileUploadTrait;
    public function install(Request $request){
        $this->validate($request,[
            'link_install' => 'nullable',
            'path' => 'required_without:link_install|mimes:application/vnd.android.package-archive'
        

        ]);
        
        $ids = $request->ids;
        if($ids ==null){
            return back()->with('warning' ,"You must choose in checkbox !!!.");
        }
        $devices =Devices::whereIn('id', $ids)->get();
        if($request->link_install){
            foreach($devices as $device){
                broadcast(new InstallApkFile($device, $request->path));
            }
        }
        elseif($request->hasFile('path')){
            $destinationpath= '/apk/';
            if (!file_exists(public_path().$destinationpath)) {
                mkdir(public_path().$destinationpath, 0777, true);
            }
            $apk = ApkFile::create([
                'name' => time(),
                'path' => $request->hasFile('path') ? $this->image($request->file('path'), $destinationpath):null
            ]);
            foreach($devices as $device){
                broadcast(new InstallApkFile($device, $apk->path));
            }
        }
      
        

        return back()->with('success', 'Connect successfully');
    }
}
