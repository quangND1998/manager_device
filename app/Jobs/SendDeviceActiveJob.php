<?php

namespace App\Jobs;

use App\Events\SendDeviceActiveEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendDeviceActiveJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $device;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( $device)
    {
        $this->device = $device;
    }

    public function handle()
    {
        broadcast( new SendDeviceActiveEvent($this->device));
    }
}
