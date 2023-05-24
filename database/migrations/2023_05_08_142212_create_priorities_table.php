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
            $table->id('prority_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });
        
        // Insert role into role table
        DB::table('priority')->insert([
            [   
                'priority_id' => 1,
                'name' => Priority::HIGH,
                'description' => 'High priority'
            ],
            [
                'priority_id' => 2,
                'name' => Priority::MEDIUM,
                'description' => 'Medium priority'        
            ],
            [
                'priority_id' => 3,
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
