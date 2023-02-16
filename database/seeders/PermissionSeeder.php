<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Artisan::call('cache:clear');
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'user-manager']);
        Permission::create(['name' => 'create-user']);
        Permission::create(['name' => 'delete-user']);
        Permission::create(['name' => 'create-project']);
        Permission::create(['name' => 'Lite']);
        Permission::create(['name' => 'Demo']);
        Permission::create(['name' => 'Pro']);
    }
}
