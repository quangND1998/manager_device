<?php

namespace App\Http\Resources;

use App\Http\Resources\Device\DeviceResouce;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
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
            'name' => $this->name,
            'user_id' => $this->user_id,
            'devices' => DeviceResouce::collection($this->devices),
            'time' => $this->time,
            'app_running' =>new AppRunResource($this->app_running)

        ];
    }
}
