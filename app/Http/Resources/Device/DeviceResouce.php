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
        return
        [
            'id' => $this->id,
            'device_id' => $this->device_id,
            'name' => $this->name,
            'brand' => $this->brand,
            'battery' => $this->battery,
            'is_install' =>  $this->hasApp($request->packageName) ? true:false,
        ];
    }
}
