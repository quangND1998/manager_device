<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ConnectWifiEvent  implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $ssid;
    public $password;
    public $device;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($device,$ssid, $password)
    {
        $this->device = $device;
        $this->ssid = $ssid;
        $this->password = $password;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('connect-wifi.'.$this->device->device_id);
    }

    public function broadcastWith()
    {
        return
            [
                'device_id' => $this->device->device_id,
                'ssid' => $this->ssid,
                'password'=> $this->password
            
            ];
    }
}
