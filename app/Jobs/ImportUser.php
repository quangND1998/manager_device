<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class ImportUser implements ShouldQueue
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

        if($this->user['role']['name_role'] =='Pro' || $this->user['role']['name_role'] =='Pro2' || $this->user['role']['name_role'] =='Manager' ||  $this->user['role']['name_role'] =='Sub Admin' ){
            $role= Role::where('name', 'Pro')->first();
            $user->roles()->sync($role);
        }
        else if($this->user['role']['name_role'] =='Admin'){
            $role= Role::where('name', 'administrator')->first();
            $user->roles()->sync($role);
        }
        else if($this->user['role']['name_role'] =='Demo'){
            $user->assignRole('Demo');

        } else{
            if(count($user->roles) ==0){
                $role= Role::where('name', 'Lite')->first();
                $user->roles()->sync($role);
            }
        
        }
    }
}
