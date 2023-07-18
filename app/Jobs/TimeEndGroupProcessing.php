<?php

namespace App\Jobs;

use App\Events\TimeEndGroupNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TimeEndGroupProcessing implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $user;
    public $group;
   
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user, $group)
    {
        $this->user = $user;
        $this->group = $group;
       
    
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        broadcast( new TimeEndGroupNotification($this->user, $this->group));
    }
}