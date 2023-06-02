<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Ticket extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasFactory;
    use SoftDeletes;

    // on creating a model generate customer PK
    protected static function booted()
    {
        static::creating(function ($model) {
            $model->ticket_id = static::generateNewId();
        });
    }

    protected $primaryKey = 'ticket_id';
    protected $model = 'tickets';

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    protected $with = ['priority', 'status', 'type', 'requestor', 'assignee'];

    protected $fillable = [
        'status_id',
        'subject',
        'priority_id',
        'assignee_id',
        'type_id'
    ];
    
    public function messages()
    {
        return $this->hasMany(Messages::class, 'ticket_id');
    }

    public function priority() {
        return $this->belongsTo(Priority::class, 'priority_id');
    }

    public function status() {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function type() {
        return $this->belongsTo(Type::class, 'type_id');
    }

    public function requestor() {
        return $this->belongsTo(Customer::class, 'requestor_id', 'customer_id');
    }

    public function assignee() {
        return $this->belongsTo(User::class, 'assignee_id', 'id');
    }

    protected static function generateNewId(): string {
        $count = DB::table('tickets')->count() + 1;
        $date = Carbon::now()->format('ym');

        if ($count < 10) {
            $count = "000$count";
        } elseif ($count < 100) {
            $count = "00$count";
        } elseif ($count < 1000) {
            $count = "0$count";
        }

        return "$date$count";
    }

}
