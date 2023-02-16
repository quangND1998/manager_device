<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UnInstallApkFile implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $device;
    public $apk;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($device, $apk)
    {
        $this->device = $device;
        $this->apk = $apk;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('apk-uninstall.'.$this->device->device_id);
    }

    public function broadcastWith()
    {


        return
            [
                'device_id' => $this->device->device_id,
                'apk' => $this->apk,
            
            ];
    }
}
