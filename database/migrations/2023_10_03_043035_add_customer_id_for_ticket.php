<?php

use App\Models\Customer;
use App\Models\Ticket;
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
        Schema::table('tickets', function (Blueprint $table) {
            $table->uuid('customer_id')->nullable();
        });

        // update existing ticket to default to customer if requestor id is not null
        Ticket::query()
            ->each(function ($ticket) {
                if (!Customer::find($ticket->requestor_id)->unknown) {
                    $ticket->customer_id = $ticket->requestor_id;
                    $ticket->save();
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
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn('customer_id');
        });
    }
};
