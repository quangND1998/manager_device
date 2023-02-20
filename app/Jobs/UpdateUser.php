<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateUser  implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $user;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user)
    {
         $this->user =$user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
       
        if (!User::where('email', '=', $this->user['email'])->exists()) {  
            $user = User::create([
                'name'=> $this->user['name'],
                'email' => $this->user['email'],
            ]);
            $user->password = $this->user['password'];
         
            $user->save();
        }else{
            $user = User::where('email', $this->user['email'])->first(); 
            $user->update([
                'name'=> $this->user['name'],
                'email' => $this->user['email'],
            ]);
            $user->password = $this->user['password'];
            $user->save();  
        }
    }
}
