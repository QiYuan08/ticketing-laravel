<?php

use App\Models\Role;
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
        // Insert role into role table
        DB::table('role')->insert([
            [   
                'name' => Role::ADMIN,
                'description' => 'Can manage all settings and users'
            ],
            [
                'name' => Role::AGENT,
                'description' => 'Can manage all tickets'        
            ],
            [
                'name' => Role::CUSTOMER,
                'description' => 'End users'        
            ]
        ]);

        Schema::table('users', function (Blueprint $table) {
            $table->foreignIdFor(Role::class, 'role_id')->constrained('role', 'role_id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::table('user', function (Blueprint $table) {
        //     $table->dropForeign('users_role_id_foreign');
        //     $table->dropColumn('role_id');
        // });
    }
};
