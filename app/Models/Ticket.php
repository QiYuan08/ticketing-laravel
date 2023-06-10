<?php

namespace App\Models;

use App\Constant\Priority;
use App\Constant\Status;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
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

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['priority', 'status', 'type', 'requestor', 'assignee'];


    protected $primaryKey = 'ticket_id';
    protected $model = 'tickets';


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

    // auxliary function for scopeFilter function
    private function getVal(Request $request, $key) {
        return $request->get($key) === 'true' ? true : false;
    }

    public function scopeFilter($query, Request $request) {

        $searchTerm = $request->get('searchTerm');

        $query->when($request->get('searchTerm'), 
        fn($query) => $query->where(function (Builder $query) use ($searchTerm) {
            $query->where('subject', 'ILIKE', "%$searchTerm%")
            ->orWhere('ticket_id', 'ILIKE', "%$searchTerm%");
            // ->whereHas('assignee', function (Builder $query) use ($searchTerm) {
            //     $query->orWhere('name', 'ILIKE', "%$searchTerm%");
            // })
            // ->orWhereHas('requestor', function (Builder $query) use ($searchTerm) {
            //     $query->orWhere('name', 'ILIKE', "%$searchTerm%");
            // });
        }))
        ->where(function (Builder $query) use ($searchTerm) {
            $query->whereHas('requestor', function (Builder $query) use ($searchTerm) {
                $query->where('requestor_id', '=', request()->user()->id)
                ->when(
                    $searchTerm,
                    fn ($query) => $query->orWhere('pic_name', 'ILIKE', "%$searchTerm%")
                );
            });
            $query->orWhereHas('assignee', function (Builder $query) use ($searchTerm) {
                $query->where('assignee_id', '=', request()->user()->id)
                ->when(
                    $searchTerm,
                    fn ($query) => $query->orWhere('name', 'ILIKE', "%$searchTerm%")
                );
            });
        })
        ->where(function (Builder $query) use ($request) {
            $query->when( 
                $this->getVal($request, 'high'), 
                fn ($query, $value) => $query->orWhere('priority_id', '=', Priority::HIGH_ID)
            )
            ->when( 
                $this->getVal($request, 'medium'), 
                fn ($query, $value) => $query->orWhere('priority_id', '=', Priority::MEDIUM_ID)

            )
            ->when( 
                $this->getVal($request, 'low'), 
                fn ($query, $value) => $query->orWhere('priority_id', '=', Priority::LOW_ID)

            );
        })
        ->where(function (Builder $query) use ($request) {
            $query->when( 
                $this->getVal($request, 'open'), 
                fn ($query, $value) => $query->orWhere('status_id', '=', Status::TICKET_STATUS_OPEN_ID)

            )
            ->when( 
                $this->getVal($request, 'deleted'), 
                fn ($query, $value) => $query->orWhere('status_id', '=', Status::TICKET_STATUS_DELETED_ID)

            )
            ->when( 
                $this->getVal($request, 'pending'), 
                fn ($query, $value) => $query->orWhere('status_id', '=', Status::TICKET_STATUS_PENDING_ID)

            )
            ->when( 
                $this->getVal($request, 'solved'), 
                fn ($query, $value) => $query->orWhere('status_id', '=', Status::TICKET_STATUS_SOLVED_ID)

            );
        });
    }

}
