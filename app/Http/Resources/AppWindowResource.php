<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppWindowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' =>  $this->id,
            'name' => $this->name,
            'path' => $this->path,
            'packageName'=> $this->packageName,
            'description' => $this->description,
            'icon' =>  $request->getSchemeAndHttpHost().$this->icon,
            'thumb' => $this->thumb?  $request->getSchemeAndHttpHost().$this->thumb:null,
            'version' => $this->version,
            'size' => $this->size,
            'created_at' => $this->created_at,
        

        ];
    }
}
