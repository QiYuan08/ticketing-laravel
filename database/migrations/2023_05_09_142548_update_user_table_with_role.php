<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $role_id = DB::table('role')->where('name', '=', ROLE::AGENT)->first()->role_id;


        DB::table('users')
            ->update(['role_id' => $role_id]);
        
        // User::query()
        //     ->each(function ($user) use ($role_id) {
        //         $user->update(['role_id' => $role_id]);
        //     });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
