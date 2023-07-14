<?php

namespace App\Jobs;

use App\Events\LaunchAppEvent;
use App\Events\TestEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class LaunchAppTimeLimit implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $device;
    public $app;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct( $device, $app)
    {
        $this->device = $device;
        $this->app = $app;
    }
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        broadcast(new LaunchAppEvent($this->device, $this->app));
    }
}
