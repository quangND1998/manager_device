<?php

namespace App\Http\Resources\Device;

use Illuminate\Http\Resources\Json\JsonResource;

class DeviceResouce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $application = $this->application($request, $this);
        return  
        [
            'id' => $this->id,
            'device_id' => $this->device_id,
            'name' => $this->name,
            'brand' => $this->brand,
            'battery' => $this->battery,
            'active' => $this->active,
            'application_version' =>  $application ? $application->version : null,
            'is_install' =>  $this->hasApp($request->packageName) ? true:false,
        ];
    }

    public function application($request, $device){
        return $device->applications()->where('packageName',$request->packageName)->first();
    }


}
