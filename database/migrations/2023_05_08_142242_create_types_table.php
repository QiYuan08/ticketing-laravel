<?php

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
        Schema::create('type', function (Blueprint $table) {
            $table->id('type_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Insert role into role table
        DB::table('type')->insert([
            [   
                'name' => 'Maintenance',
                'description' => ''
            ],
            [
                'name' => 'Sales',
                'description' => ''        
            ],
            [
                'name' => 'Reporting',
                'description' => ''        
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('type');
    }
};
