<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Traits\FileUploadTrait;
use Illuminate\Http\Response;
use App\Models\Image;
class RoomController extends Controller
{
    use FileUploadTrait;
    public function index(){
   
    	return RoomTable::get();


    }
    public function store(Request $request){
    
        $validator = Validator::make($request->all(), [
            'title_room' => 'required',
            'image_room'=> 'required|mimes:png,jpg',
            'content_room' => 'required',
            'like_room' => 'required|numeric|gt:0',
            'run_room' => 'required|numeric|gt:0',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $destinationpath= '/image/';
        if (!file_exists(public_path().$destinationpath)) {
            mkdir(public_path().$destinationpath, 0777, true);
        }
       $room= RoomTable::create([
            'title_room' => $request->title_room,
            'image_room' => $request->image_room,
            'content_room' => $request->content_room,
            'like_room' => $request->like_room,
            'run_room' => $request->run_room,
            'image_room' => $request->hasFile('image_room') ?$request->getSchemeAndHttpHost().$this->image($request->file('image_room'), $destinationpath):null,

        ]);

        return response()->json($room, Response::HTTP_OK);
    }
    public function delete($id){
        $room = RoomTable::find($id);
      
        if($room){
           
            $extension = " ";
            $this->DeleteFolder($room->image_room, $extension);

            $room->delete();
            return response()->json($room, Response::HTTP_OK);
           
        }
        else{

            $response=[
                'msg' => 'Not Found'
            ];
            return response()->json($response, Response::HTTP_BAD_REQUEST);
        }
    }

    public function get($id){
        $room = RoomTable::find($id);
        if($room){
            return response()->json($room, Response::HTTP_OK);
        }
        else{

            $response=[
                'msg' => 'Not Found'
            ];
            return response()->json($response, Response::HTTP_BAD_REQUEST);
        }
    }
    public function update(Request $request, $id){

        $room = RoomTable::find($id);
        if($room){
           
            $validator = Validator::make($request->all(), [
                'title_room' => 'required' ,
                'image_room'=> 'nullable|mimes:png,jpg',
                'content_room' => 'required',
                'like_room' => 'required|numeric|gt:0',
                'run_room' => 'required|numeric|gt:0',
    
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
            $destinationpath= '/image/';
            if (!file_exists(public_path().$destinationpath)) {
                mkdir(public_path().$destinationpath, 0777, true);
            }
            $name = time();
            
            $room->title_room = $request->title_room;
            $room->image_room  = $request->hasFile('image_room') ?$request->getSchemeAndHttpHost().$this->update_image($request->file('image_room'),time(), $destinationpath, $room->image_room): $room->image_room;

            $room->content_room = $request->content_room;
            $room->like_room = $request->like_room;
            $room->run_room = $request->run_room;
     
            $room->save();
            return response()->json($room, Response::HTTP_OK);
        }
        else{
            $response=[
                'msg' => 'Not Found'
            ];
            return response()->json($response, Response::HTTP_BAD_REQUEST);
        }
        return response()->json($room, Response::HTTP_OK);
    }
}
