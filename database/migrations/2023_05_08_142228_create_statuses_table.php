<?php

use App\Models\Status;
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
        Schema::create('status', function (Blueprint $table) {
            $table->id('status_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

                // Insert role into role table
                DB::table('status')->insert([
                    [   
                        'status_id' => 1,
                        'name' => Status::TICKET_STATUS_OPEN,
                        'description' => 'Ticket Open'
                    ],
                    [
                        'status_id' => 2,

                        'name' => Status::TICKET_STATUS_PENDING,
                        'description' => 'Ticket Pending'        
                    ],
                    [
                        'status_id' => 3,

                        'name' => Status::TICKET_STATUS_SOLVED,
                        'description' => 'Ticket Solved'        
                    ],
                    [
                        'status_id' => 4,
                        'name' => Status::TICKET_STATUS_DELETED,
                        'description' => 'Ticket Deleted'        
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
        Schema::dropIfExists('status');
    }
};
