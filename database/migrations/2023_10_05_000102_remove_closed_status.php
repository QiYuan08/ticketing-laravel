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
        DB::table('tickets')
            ->where('status_id', '=', 5)
            ->update(['status_id' => Status::TICKET_STATUS_SOLVED_ID]);
        
        DB::table('status')
            ->where('name', '=', 'CLOSED')
            ->delete();
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
