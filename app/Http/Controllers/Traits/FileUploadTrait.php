<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\Request;
use ZipArchive;
use Illuminate\Support\Facades\File;
use RarArchiver;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;
use DirectoryIterator;
use Illuminate\Support\Str;
use App\Models\Project\text_pano;
use Illuminate\Support\Collection;
use Closure;

trait FileUploadTrait
{


  
    public function uploadFile($name, $image, $url_folder)
    {
        $current = Carbon::now()->format('YmdHs');
        $folder = $url_folder;
        $destinationpath = public_path($folder);

        $name = Str::slug($name) . '_' . time();
        $namefile =   $name . '.' . $image->getClientOriginalExtension();
        $image->move($destinationpath, $namefile);
        $image_url =  $folder . $namefile;
        return $image_url;
    }


    

   


  
    //update image ground
    public function image($file, $destinationpath)
    {
        $user_id = Auth::user()->id;
        $name = time() . $user_id . "_" . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
        $file->move($destinationpath, $name);
        $path = $destinationpath . $name;


        return $path;
    }
    public function UpdateAudio360($file, $destinationpath, $attribute)
    {
        $destinationpath_full = public_path() . "/" . $destinationpath;
        $user_id = Auth::user()->id;
        if ($attribute == null || file_exists($attribute) == false) {
            $file->move($destinationpath_full, time() . $user_id . "-" . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension());
            $path = $destinationpath . '/' . time() . $user_id . "-" . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
            return $path;
        } else {
            unlink($attribute);
            $file->move($destinationpath_full, time() . $user_id . "-" .  Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension());
            $path = $destinationpath . '/' . time() . $user_id . "-" . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
            return $path;
        }
    }

    public function UploadModel3D($file, $destinationpath)
    {
        $destinationpath_full = public_path() . "/" . $destinationpath;
        $user_id = Auth::user()->id;
        // if ($file->getClientOriginalExtension() == "obj" || $file->getClientOriginalExtension() == "mtl" || $file->getClientOriginalExtension() == "fbx") {
        $file->move($destinationpath_full, time() . $user_id . "-" . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension());
        $path = $destinationpath . '/' . time() . $user_id . "-" . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
        return $path;
        // } else {
        //     $path = "";
        //     return $path;
        // }
    }
    public function UpdateModel3D($file, $name, $destinationpath, $attribute)
    {
        $destinationpath_full = public_path() . "/" . $destinationpath;
        $user_id = Auth::user()->id;
        // if ($file->getClientOriginalExtension() == "obj" || $file->getClientOriginalExtension() == "mtl" || $file->getClientOriginalExtension() == "fbx") {

        if ($attribute == null || file_exists($attribute) == false) {
            $file->move($destinationpath_full, $name . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension());
            $path = $destinationpath . '/' . $name . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
            return $path;
        } else {
            unlink($attribute);
            $file->move($destinationpath_full, $name . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension());
            $path = $destinationpath . '/' . $name . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
            return $path;
        }
        // } else {
        //     $path = "";
        //     return $path;
        // }
    }

    public function update_image($file, $name, $middlepath, $attribute)
    {

        $destinationpath = public_path() . "/" . $middlepath;

        $user_id = Auth::user()->id;
        $name = $name . "-" . Str::slug($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();

        if ($attribute == null || file_exists($attribute) == false) {
            $file->move($destinationpath, $name);
            $path = $middlepath . $name;
        } else {
            if (Str::contains($attribute, 'default')) {

                $file->move($destinationpath, $name);
                $path = $middlepath . $name;
            } else {
                unlink($attribute);
                $file->move($destinationpath, $name);
                $path = $middlepath . $name;
            }
        }

        return $path;
    }


  

    

    public function update_image_360($file, $destinationpath, $attribute)
    {

        $user_id = Auth::user()->id;
        $name = time() . $user_id . "." . $file->getClientOriginalName();

        if ($attribute == null || file_exists($attribute) == false) {
            $file->move($destinationpath, $name);
            $path = $destinationpath . "/" . $name;
        } else {
            unlink($attribute);
            $file->move($destinationpath, $name);
            $path = $destinationpath . "/" . $name;
        }

        return $path;
    }


    //upload folder image Map
    public function uploadfloder_image($file, $extracto)
    {
        $zip = new ZipArchive;
        $user_id = Auth::user()->id;
        if ($file->getClientOriginalExtension() == "zip") {
            $zip->open($file->getRealPath());
            $zip->extractTo($extracto);
            $string = explode(".zip", $file->getClientOriginalName())[0] . "-" . time() . $user_id;
            File::copyDirectory($extracto . '/' . explode(".zip", $file->getClientOriginalName())[0], $extracto . '/' . $string);
            File::deleteDirectory($extracto . '/' . explode(".zip", $file->getClientOriginalName())[0]);
            $path =  $extracto . '/' . $string . '/';
        }
        return $path;
    }

    public function updatefloder_image($file, $extracto, $attribute)
    {

        $zip = new ZipArchive;
        $user_id = Auth::user()->id;
        if ($file->getClientOriginalExtension() == "zip") {
            File::deleteDirectory($attribute); //xoa dc file nay
            $zip->open($file->getRealPath());
            $zip->extractTo($extracto);
            $string = explode(".zip", $file->getClientOriginalName())[0] . "-" . time() . $user_id;
            File::copyDirectory($extracto . '/' . explode(".zip", $file->getClientOriginalName())[0], $extracto . '/' . $string);
            File::deleteDirectory($extracto . '/' . explode(".zip", $file->getClientOriginalName())[0]);
            $path =  $extracto . '/' . $string . '/';
        }
        return $path;
    }
    public function DeleteFolder($attribute)
    {

        if (file_exists($attribute)) {
            if (is_dir($attribute)) {
                File::deleteDirectory($attribute); //xoa dc file nay
            } else {
                unlink($attribute);
            }
    
        }
    }
    public function createFolder($public, $name)
    {

        $path = $public . $name;
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        return $path;
    }
    public function createFolderChild($public, $nameParent, $name)
    {
        $path = $public . $nameParent . '/' . $name;
        if (!file_exists($path)) {
            mkdir($path, 0777);
        }

        return $path;
    }

    public function getAllFolder($public, $name)
    {

        $dir = new DirectoryIterator($public . $name);


        $array =  [];
        foreach ($dir as $fileinfo) {
            if ($fileinfo->isDir() && !$fileinfo->isDot()) {
                $array[] = $fileinfo->getFilename();
            }
        }
        return $array;
    }

    public function getAllFolderPano($public, $name)
    {

        $dir = new DirectoryIterator($public . $name);

        $array =  [];

        foreach ($dir as $fileinfo) {
            if ($fileinfo->isDir() && !$fileinfo->isDot()) {
                $array[] = $fileinfo->getFilename();
            }
        }
        return $array;
    }
    public function getAllFolderPath($path)
    {
        $dir = new DirectoryIterator($path);
        return $dir;
        $array =  [];
        foreach ($dir as $fileinfo) {
            if ($fileinfo->isDir() && !$fileinfo->isDot()) {
                $array[] = $fileinfo->getFilename();
            }
        }
        return $array;
    }
    public function uploadMultiple($path, $files)
    {
        foreach ($files as $file) {
            $name = time() . '-' . $file->getClientOriginalName();
            $file->move($path, $name);
            $data[] = $name;
        }
    }
 
    public function getAllImage($public, $name)
    {
        $dir = new DirectoryIterator($public . $name);

        $array =  [];
        foreach ($dir as $fileinfo) {
            if (!$fileinfo->isDir()) {
                $array[] = $fileinfo->getFilename();
            }
        }
        return $array;
    }
    public function getAllImagePath($path)
    {
        $dir = new DirectoryIterator($path);

        $array =  [];
        foreach ($dir as $fileinfo) {
            if (!$fileinfo->isDir()) {
                $array[] = $fileinfo->getFilename();
            }
        }
        return $array;
    }
    public function update_image2D($file, $destinationpath, $attribute)
    {

        $user_id = Auth::user()->id;
        $name = time() . $user_id . "." . $file->getClientOriginalName();

        if ($attribute == null || file_exists($attribute) == false) {
            $file->move($destinationpath, $name);
            $path = $name;
        } else {
            unlink($attribute);
            $file->move($destinationpath, $name);
            $path = $name;
        }

        return $path;
    }

  
    public function outImgToXYZ($i, $j, $faceIdx, $faceSize)
    {
        $a = 2.0 * (float) $i / $faceSize;
        $b = 2.0 * (float) $j / $faceSize;

        switch ($faceIdx) {
            case 0:
                return [-1.0, 1.0 - $a, 3.0 - $b];
                break; # back
            case 1:
                return [$a - 3.0, -1.0, 3.0 - $b];
                break; # left
            case 2:
                return [1.0, $a - 5.0, 3.0 - $b];
                break; # front
            case 3:
                return [7.0 - $a, 1.0, 3.0 - $b];
                break; # right
            case 4:
                return [$b - 1.0, $a - 5.0, 1.0];
                break; # top
            case 5:
                return [5.0 - $b, $a - 5.0, -1.0];
                break; # bottom
        }

        return [0, 0, 0];
    }
    public function clip($x, $min, $max)
    {
        if ($x > $max) return $max;
        if ($x < $min) return $min;
        return $x;
    }
  
  
    public function createPath($booth)
    {
        $public  =  'VirtualExpo/booths/';
        if (!is_dir($public)) {
            mkdir($public, 0777, true);
        }

        $booth_path_id = $public . $booth->id . '/';
        if (!is_dir($booth_path_id)) {
            mkdir($booth_path_id, 0777, true);
        }
        $logo_path = $booth_path_id . 'images/';
        if (!is_dir($logo_path)) {
            mkdir($logo_path, 0777, true);
        }
        return $logo_path;
    }
    public function createPathLow($booth)
    {
        $public  =  'VirtualExpo/booths/';
        if (!is_dir($public)) {
            mkdir($public, 0777, true);
        }

        $booth_path_id = $public . $booth->id . '/';
        if (!is_dir($booth_path_id)) {
            mkdir($booth_path_id, 0777, true);
        }
        $logo_path = $booth_path_id . 'image_low/';
        if (!is_dir($logo_path)) {
            mkdir($logo_path, 0777, true);
        }
        return $logo_path;
    }


    public function getSize($path)
    {
        if (($path !== null)  && file_exists($path)) {
            return File::size($path);
        } else {
            return 0;
        }
    }

}
