<?php

use App\Models\Priority;
use App\Models\Status;
use App\Models\Type;
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
        // fix primary key value
        Schema::table('priority', function (Blueprint $table) {
            $table->renameColumn('prority_id', 'priority_id');
        });

        // populate priority
        $priority = [
            'High',
            'Medium',
            'Low'
        ];

        foreach ($priority as $prio) {
            Priority::create([
                'name' => $prio
            ]);
        }

        // populate type
        $types = [
            'Maintenance',
            'Sales'
        ];

        foreach ($types as $type) {
            Type::create([
                'name' => $type
            ]);
        }

        // populate status
        $statuses = [
            'OPEN',
            'PENDING',
            'SOLVED',
            'DELETED'
        ];

        foreach ($statuses as $status) {
            Status::create([
                'name' => $status
            ]);
        }
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
