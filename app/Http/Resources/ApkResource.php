<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\File;
class ApkResource extends JsonResource
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
            'path' =>($this->path !== null && file_exists(public_path().$this->path)) ? $this->path : null,
            'size' =>($this->path !== null && file_exists(public_path().$this->path)) ? File::size(public_path().$this->path) : 0,
            'extension' => $this->path !== null ? pathinfo(public_path($this->path), PATHINFO_EXTENSION) : null,
            'user' => $this->user

        ];
    }
}
