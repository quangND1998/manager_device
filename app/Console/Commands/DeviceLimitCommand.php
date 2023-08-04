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
        //Những tài khoản có số lượng device sở hữu lớn hơn giới hạn
        $limit_users= $users->filter(function ($user, $key) {
                return $user->devices_count > $user->number_device;
        });
        //Cập nhật device sở hữu lớn hơn giới hạn
        foreach($limit_users as $user){
            $deviceLimitRepository->updateDeviceLimit($user);
        }
        // Những tài khoản có số lượng device sở hữu nhỏ hơn giới hạn
        $unlimit_users =  $users->filter(function ($user, $key) {
            return  $user->devices_count < $user->number_device  ;
        });
        //Cập nhật device sở hữu nhỏ hơn giới hạn
        foreach($unlimit_users as $user){
            $deviceLimitRepository->updateDeviceUnRestricted($user);  
        }
        
     
    }
}
