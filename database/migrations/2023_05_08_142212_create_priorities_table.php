<?php

use App\Models\Priority;
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
        Schema::create('priority', function (Blueprint $table) {
            $table->id('priority_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });
        
        // Insert role into role table
        DB::table('priority')->insert([
            [   
                'name' => Priority::HIGH,
                'description' => 'High priority'
            ],
            [
                'name' => Priority::MEDIUM,
                'description' => 'Medium priority'        
            ],
            [
                'name' => Priority::LOW,
                'description' => 'Low priority'        
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('priority');

    }
};
