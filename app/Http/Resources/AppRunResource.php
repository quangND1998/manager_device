<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppRunResource extends JsonResource
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
            'appName' => $this->appName,
            'packageName' => $this->packageName,
            'icon' =>  $request->getSchemeAndHttpHost().$this->icon,
            'version' => $this->version,
        ];
    }
}
