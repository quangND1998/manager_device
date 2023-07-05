<?php

namespace App\Console\Commands;

use App\Models\HistoryMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class NotiExpireLicenseEnd extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:notiLicenseEnd';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notification User expired End';

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
        $users = User::with('history_mail')->where('time_limit','<=',$time_now)->where('active_mail',1)->get();
        foreach ($users as $user) {
            if ($user->history_mail == null) {
                // $this->sendMail($scan);
                $history_mail_noti = new HistoryMail();
                $history_mail_noti->time_send = 1;
                $history_mail_noti->user_id = $user->id;
                $history_mail_noti->save();
            } else {
                if ($user->history_mail->time_send < 2) {
                    // $this->sendMail($scan);
                    $user->history_mail->time_send += 1;
                    $user->history_mail->save();
                }
            }
        }
    
    }
}
