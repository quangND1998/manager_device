<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LaunchAppEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $device;
    public $app;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( $device, $app)
    {
        $this->device = $device;
        $this->app = $app;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('lauch-app.'.$this->device->device_id);
    }

    public function broadcastWith()
    {
        return
            [
                'device_id' => $this->device->device_id,
                'app' => $this->app,
            
            ];
    }


}
