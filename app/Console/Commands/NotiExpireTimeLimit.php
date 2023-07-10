<?php

namespace App\Console\Commands;

use App\Mail\NotiMail;
use App\Models\HistoryMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

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
        $users = User::with('history_mail')->whereNotNull('time_limit')->where('time_limit', '<=', $limit_20)->where('time_limit', '>=', $time_now)->where('active_mail', 1)->get();
        foreach ($users as $user) {

            if ($user->history_mail == null) {
                $this->sendMail($user);
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

    public function sendMail($user)
    {
        $data = array('name' => $user->name, 'email' => $user->email, 'btn' => 'Log in and pick a plan', 'content' => '
        Your HoloStartUp license is ending soon. <br><br>
        If you wish to continue using MissionX, 
        you will need to select a plan now to avoid any interruption. 
        <br><br>
        We hope to continue with you on this journey. If you have any feedback, we would be happy to listen.
                ', 'title' => '[HoloStartUp] Your HoloStartUp license is ending soon.');
         //Mail::to($user->email)->send(new NotiMail($data));
         Mail::to('quangnd620@wru.vn')->send(new NotiMail($data));
    }
}
