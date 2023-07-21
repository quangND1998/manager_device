<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
class LaunchAppWithTime implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $device;
    public $app;
    public $time;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( $device, $app, $time)
    {
        $this->device = $device;
        $this->app = $app;
        $this->time = $time;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {

        return new Channel('lauch-app-time.'.$this->device->device_id);
    }

    public function broadcastWith()
    {

        return
            [
                'device_id' => $this->device->device_id,
                'app' => $this->app,
                'time' => $this->time,
            ];
    }

   


}