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
        Schema::dropIfExists('customers');

        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('customer_id')->primary()->index();
            $table->text('alias_customer_id')->nullable();
            $table->string('pic_name')->index();
            $table->string('phone_number', 20)->nullable()->index();
            $table->string('mobile_number', 20)->nullable()->index();
            $table->string('company')->nullable()->index();
            $table->mediumText('company_address')->nullable();
            $table->longText('additional_info')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
};
