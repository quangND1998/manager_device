<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LauchAppGroupEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $group;
    public $app;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($group, $app)
    {
        $this->group = $group;
        $this->app = $app;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('lauch-group.'.$this->group->id);
    }

    public function broadcastWith()
    {
        return
            [
             
                'app' => $this->app,
            
            ];
    }


}
