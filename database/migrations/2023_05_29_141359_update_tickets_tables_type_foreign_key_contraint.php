<?php

use App\Models\Priority;
use App\Models\Status;
use App\Models\Ticket;
use App\Models\Type;
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
        // drop foreign key
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn(['priority_id', 'status_id', 'type_id']);
        });


        // add new foreign key
        Schema::table('tickets', function (Blueprint $table) {
            $table->foreignIdFor(Priority::class, 'priority_id')->nullable()->constrained('priority', 'priority_id')->onDelete('cascade')->change();
            $table->foreignIdFor(Status::class, 'status_id')->nullable()->constrained('status', 'status_id')->onDelete('cascade')->change();
            $table->foreignIdFor(Type::class, 'type_id')->nullable()->constrained('type', 'type_id')->onDelete('cascade')->change();
        });

        // populate new priorty, status, type
        Ticket::all()->map(function($ticket) {
            $ticket->priority_id = fake()->numberBetween(1,3);
            $ticket->status_id = fake()->numberBetween(1,4);
            $ticket->type_id = fake()->numberBetween(1,3);

            $ticket->save();
        });
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
