<?php

use App\Constant\Status;
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
                        'name' => Status::TICKET_STATUS_OPEN,
                        'description' => 'Ticket Open'
                    ],
                    [
                        'name' => Status::TICKET_STATUS_PENDING,
                        'description' => 'Ticket Pending'        
                    ],
                    [
                        'name' => Status::TICKET_STATUS_SOLVED,
                        'description' => 'Ticket Solved'        
                    ],
                    [
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
