<?php

namespace App\Console\Commands;

use App\Mail\NotiMail;
use App\Models\HistoryMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Contracts\Role;

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
        $users = User::with('history_mail')->whereNotNull('time_limit')->where('time_limit','<=',$time_now)->where('active_mail',1)->get();
        foreach ($users as $user) {
            $role = Role::where('name', "Demo")->first();
            $user->roles()->detach();
            $user->roles()->attach($role->id);
            if ($user->history_mail == null) {
                $this->sendMail($user);
                $history_mail_noti = new HistoryMail();
                $history_mail_noti->time_send = 1;
                $history_mail_noti->user_id = $user->id;
                $history_mail_noti->save();
            } else {
                if ($user->history_mail->time_send < 2) {
                    $this->sendMail($user);
                    $user->history_mail->time_send += 1;
                    $user->history_mail->save();
                }
            }
        }
    
    }

    public function sendMail($user){
        $data = array('name'=>$user->name,'email'=>$user->email,'btn'=>'Log in and pick a plan', 'content'=>'
        Your HoloStartUp use time Package had been used up. <br><br> If you wish to continue using HoloStartUp, 
        you will need to select a plan now to avoid any interruption. 
        <br><br>
        We hope to continue with you on this journey. If you have any feedback, we would be happy to listen.
        <br>
                ','title' =>'[HoloStartUp] Please select a plan now. ');
                //Mail::to($user->email)->send(new NotiMail($data));
                Mail::to('quangnd620@wru.vn')->send(new NotiMail($data));
    }
}
