<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table('messages', function (Blueprint $table) {
            $table->string('in_reply_to')->index()->nullable();
            $table->string('messageId')->index()->nullable();
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->string('latest_reference')->index()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->dropColumn('in_reply_to');
            $table->dropColumn('messageId');
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn('latest_reference')->nullable();
        });
    }
};
