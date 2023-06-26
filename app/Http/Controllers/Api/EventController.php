<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EventTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Traits\FileUploadTrait;
use Illuminate\Http\Response;
// use Illuminate\Http\Request;
use App\Models\Image;

class EventController extends Controller
{
    //

    use FileUploadTrait;
    public function index(){
   
    	return EventTable::get();
       

    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name_event' => 'required',
            'avata_event'=> 'required|mimes:png,jpg',
            'email_event' => 'required',
            'image_event' => 'required|mimes:png,jpg',
            'content_event' => 'required',
            'category_event' => 'required',
            'member_event' => 'required|numeric|gt:0',
            'time_event' => 'required',
            
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $destinationpath= '/image/';
        if (!file_exists(public_path().$destinationpath)) {
            mkdir(public_path().$destinationpath, 0777, true);
        }
       $event= EventTable::create([
            'name_event' => $request->name_event,
            'avata_event' => $request->avata_event,
            'email_event' => $request->email_event,
            'image_event' => $request->image_event,
            'content_event' => $request->content_event,
            'category_event' => $request->category_event,
            'member_event' => $request->member_event,
            'time_event' => $request->time_event,

            'avata_event' => $request->hasFile('avata_event') ?$request->getSchemeAndHttpHost().$this->image($request->file('avata_event'), $destinationpath):null,
            'image_event' => $request->hasFile('image_event') ?$request->getSchemeAndHttpHost().$this->image($request->file('image_event'), $destinationpath):null,
        ]);

        return response()->json($event, Response::HTTP_OK);
    }

    public function delete($id){
        $event = EventTable::find($id);
      
        if($event){
           
            $extension = " ";
            $this->DeleteFolder($event->image_event, $extension);
            $this->DeleteFolder($event->avata_event, $extension);

            $event->delete();
            return response()->json($event, Response::HTTP_OK);
           
        }
        else{

            $response=[
                'msg' => 'Not Found'
            ];
            return response()->json($response, Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(Request $request, $id){

        $event = EventTable::find($id);
        if($event){
           
            $validator = Validator::make($request->all(), [
                'name_event' => 'required',
            'avata_event'=> 'required|mimes:png,jpg',
            'email_event' => 'required',
            'image_event' => 'required|mimes:png,jpg',
            'content_event' => 'required',
            'category_event' => 'required',
            'member_event' => 'required|numeric|gt:0',
            'time_event' => 'required',
    
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
            $destinationpath= '/image/';
            if (!file_exists(public_path().$destinationpath)) {
                mkdir(public_path().$destinationpath, 0777, true);
            }
            $name = time();
            
            $event->name_event = $request->name_event;
            $event->avata_event  = $request->hasFile('avata_event') ?$request->getSchemeAndHttpHost().$this->update_image($request->file('avata_event'),time(), $destinationpath, $event->avata_event): $event->avata_event;

            $event->email_event = $request->email_event;
            $event->image_event  = $request->hasFile('image_event') ?$request->getSchemeAndHttpHost().$this->update_image($request->file('image_event'),time(), $destinationpath, $event->image_event): $event->image_event;
            $event->content_event = $request->content_event;
            $event->category_event = $request->category_event;
            $event->member_event = $request->member_event;
            $event->time_event = $request->time_event;
     
            $event->save();
            return response()->json($event, Response::HTTP_OK);
        }
        else{
            $response=[
                'msg' => 'Not Found'
            ];
            return response()->json($response, Response::HTTP_BAD_REQUEST);
        }
        return response()->json($event, Response::HTTP_OK);
    }
}
