<?php

use App\Models\Customer;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\Ticket;
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
        Schema::dropIfExists('tickets');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('users');

        // update users table
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary()->index();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->foreignIdFor(Role::class, 'role_id')->nullOnDelete()->constrained('role', 'role_id');
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();

        });

        // update tickets table
        Schema::create('tickets', function(Blueprint $table) {
            $table->string('ticket_id')->primary()->index();
            $table->foreignIdFor(Customer::class, 'requestor_id')->nullable()->constrained('customers', 'customer_id');
            $table->foreignIdFor(User::class, 'assignee_id')->nullable()->constrained('users');
            $table->foreignIdFor(Priority::class, 'priority_id')->nullable()->constrained('priority', 'priority_id')->nullOnDelete()->cascadeOnUpdate()->change();
            $table->foreignIdFor(Status::class, 'status_id')->nullable()->constrained('status', 'status_id')->nullOnDelete()->cascadeOnUpdate()->change();
            $table->foreignIdFor(Type::class, 'type_id')->nullable()->constrained('type', 'type_id')->nullOnDelete()->cascadeOnUpdate()->change();
            $table->string('subject')->index();
            $table->softDeletes();
            $table->timestamps();
            
        });
        
        // update messages table
        Schema::create('messages', function (Blueprint $table) {
            $table->uuid('message_id')->primary()->index();
            $table->string('ticket_id');
            $table->boolean('internal_node');
            $table->uuidMorphs('sender');
            $table->uuidMorphs('recipient');
            $table->json('cc')->nullable();
            $table->foreign('ticket_id')->references('ticket_id')->on('tickets');
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
    }
};
