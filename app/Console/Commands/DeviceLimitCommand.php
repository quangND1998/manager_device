<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Repositories\DeviceLimitRepository;
use Illuminate\Console\Command;

class DeviceLimitCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'device:limit';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(DeviceLimitRepository $deviceLimitRepository)
    {
       
        $users= User::has('devices')->withCount('devices')->with('devices')->get();
       
        $limit_users= $users->filter(function ($user, $key) {
                return $user->devices_count > $user->number_device;
        });
        foreach($limit_users as $user){
            $deviceLimitRepository->updateDevice($user);
        }
    }
}
