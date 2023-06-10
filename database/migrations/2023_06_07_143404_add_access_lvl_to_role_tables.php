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
        Schema::table('role', function (Blueprint $table) {
            $table->smallInteger('access_lvl',)->default(1);
        });

        Role::query()
        ->each(function ($role) {
            if ($role->name === Role::ADMIN) {
                $role->update(['access_lvl' => 4]);

            } else if ($role->name === Role::AGENT) {
                $role->update(['access_lvl' => 3]);
            
            } else {
                $role->update(['access_lvl', 2]);
            
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('role', function (Blueprint $table) {
            $table->dropColumn("access_lvl");
        });
    }
};
