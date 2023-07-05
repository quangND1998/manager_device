<?php

namespace App\Console\Commands;

use App\Models\HistoryMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class NotiExpireTimeLimit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:notiTimelimit';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notification User expire timelimit';

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
    public function handle()
    {
        $time_now = Carbon::now();
        $limit_20 = Carbon::now()->addDays(10);
        $users = User::with('history_mail')->where('time_limit','<=',$limit_20)->where('time_limit','>=',$time_now)->where('active_mail',1)->get();
        foreach($users as $user){

            if($user->history_mail == null){
                $history_noti_mail = new HistoryMail();
                $history_noti_mail->time_send = 1;
                $history_noti_mail->user_id = $user->id;
                $history_noti_mail->save();
            }
            // else{
            //     if($user->historyMailNoti->noti_timelimit < 2 && $user->time_limit < $limit_7){
            //         $this->sendMail($user);
            //         $user->historyMailNoti->noti_timelimit += 1;
            //         $user->historyMailNoti->save();
            //     }
            // }
        }
    }
}
