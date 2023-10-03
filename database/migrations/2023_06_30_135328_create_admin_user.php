<?php

use App\Constant\Role;
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
        if (!User::find(Role::ADMING_ACC_ID)->exists()) {
            DB::table('users')->insert([
                'id' => Role::ADMING_ACC_ID,
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'role_id' => 1
            ]);
            
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $adminId = Role::ADMING_ACC_ID;
        DB::query("DELETE FROM users where id = '$adminId'");
    }
};
