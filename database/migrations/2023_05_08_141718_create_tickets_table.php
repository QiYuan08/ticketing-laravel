<?php

use App\Models\Priority;
use App\Models\Status;
use App\Models\Type;
use App\Models\User;
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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id('ticket_id');
            $table->string('subject');
            $table->foreignIdFor(User::class, 'requestor_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignIdFor(User::class, 'assignee_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignIdFor(Priority::class, 'priority_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignIdFor(Status::class, 'status_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignIdFor(Type::class, 'type_id')->nullable()->constrained('users')->onDelete('cascade');
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
        Schema::dropIfExists('tickets');
    }
};
