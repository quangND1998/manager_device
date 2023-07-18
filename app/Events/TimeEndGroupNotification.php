<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TimeEndGroupNotification  implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $user;
    public $group;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $group)
    {
        $this->user = $user;
        $this->group = $group;

    
    }

  
    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('time-play-notification.'.$this->user->id);
    }


    public function broadcastWith()
    {
        return
            [
                'group' => $this->group->id,
                'user_id' => $this->user->id
            ];
    }
}