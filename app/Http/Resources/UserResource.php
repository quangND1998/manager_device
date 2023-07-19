<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
class UserResource extends JsonResource
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
                'email' => $this->email,
                'name' => $this->name,
                'avatar' => $this->avatar ? $this->avatar : 'https://ui-avatars.com/api/?name=' . Str::slug($this->name) . '?background=0D8ABC&color=fff',
                'active_demo' => $this->active_demo,
                'time_limit' => $this->time_limit,
                'isExpired' => Carbon::now()->gt($this->time_limit) ? true: false,
                'numberDeviceExpried' =>$this->number_device -count($this->devices)
            ];
    }
}
