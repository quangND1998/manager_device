<?php

namespace App\Http\Controllers;

use App\Events\InstallApkFile;
use App\Models\ApkFile;
use App\Models\Devices;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\FileUploadTrait;
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
        return Inertia::render('APK/Index',compact('list_apk'));
      
    }
    public function store(Request $request){
        $this->validate($request,[
            'name' => 'required',
            'path' => 'required|mimes:application/vnd.android.package-archive'
    
        ]);
      

        $destinationpath= '/apk/';
        if (!file_exists(public_path().$destinationpath)) {
            mkdir(public_path().$destinationpath, 0777, true);
        }
        $apk = ApkFile::create([
            'name' => $request->name,
            'path' => $request->hasFile('path') ? $this->image($request->file('path'), $destinationpath):null,
            'user_id' => Auth::user()->id
        ]);
        return back()->with('success', 'Connect successfully');
    }
    public function update(Request $request, $id){
        $this->validate($request,[
            'name' => 'required',
            'path' => 'nullable|mimes:application/vnd.android.package-archive'
    
        ]);
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

        $this->DeleteFolder($apk->path);

        $apk->delete();
        return back()->with('success', 'Delete successfully');

    }


}
