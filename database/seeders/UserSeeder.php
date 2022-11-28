<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user1 = User::create([
            'name' => 'Admin',
            'email' => 'admin@holomia.com',
            'password' => bcrypt('Abcd1234')
        ]);
        $user1->assignRole('administrator');
    }
}
