<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'User',
                'email' => 'user@user.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password'),
            ],
        ]);
    }
}
