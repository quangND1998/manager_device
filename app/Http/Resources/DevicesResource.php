<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DevicesResource extends JsonResource
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
            'connect_wifi' => $this->connect_wifi,
            'active' => $this->active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'update_time' => $this->update_time,
            'enabled' => $this->enabled,
            'user' =>  new UserResource($this->user),
            'apllications' => ApplicationResource::collection($this->applications),
            'default_app' => new ApplicationResource($this->default_app),
            'last_login' => $this->last_login,
            'time' => $this->time,
            'app_running' =>new AppRunResource($this->app_running)

        ];
    }
}
