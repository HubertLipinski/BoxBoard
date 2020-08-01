<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('role_user')->insert([
            [
                'user_id' => '1',
                'role_id' => '1',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'user_id' => '2', //admin
                'role_id' => '2',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);
    }
}
