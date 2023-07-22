<?php

namespace App\Jobs;

use App\Events\TimeEndDeviceNotification;
use App\Models\Devices;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TimeEndDeviceProcessing implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $device;
    public $user;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct( $device, $user)
    {
        $this->device = $device;
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        broadcast( new TimeEndDeviceNotification($this->device,$this->user));
    }
}
