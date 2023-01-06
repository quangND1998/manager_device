<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::create(['name' => 'administrator']);
        $role->givePermissionTo(['user-manager', 'create-project','delete-user','create-user']);

        $role = Role::create(['name' => 'content-creator']);
        $role->givePermissionTo('create-project');
        $role = Role::create(['name' => 'Lite']);
        $role->givePermissionTo('Lite');
        $role = Role::create(['name' => 'Demo']);
        $role->givePermissionTo('Demo');
        $role = Role::create(['name' => 'Pro']);
        $role->givePermissionTo('Pro');
    }
}
