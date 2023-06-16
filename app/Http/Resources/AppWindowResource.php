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
            'thumb' =>  $request->getSchemeAndHttpHost().$this->thumb,
            'version' => $this->version,
        

        ];
    }
}
