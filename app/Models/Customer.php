<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Customer extends Model
{
    use HasFactory;
    use HasUuids;
    use SoftDeletes;

    protected $primaryKey = 'customer_id';

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array
     */
    public function uniqueIds()
    {
        return ['customer_id'];
    }


    protected $fillable = [
        'email',
        'customer_id',
        'pic_name',
        'phone_number',
        'mobile_number',
        'company',
        'company_address',
        'additional_info'
    ];

    public function send()
    {
        return $this->morphMany(Messages::class, 'sender');
    }

    public function received()
    {
        return $this->morphMany(Messages::class, 'recipient');
    }

    // Query Scope: https://laravel.com/docs/9.x/eloquent#query-scopes
    public function scopeFilter($query, Request $request) {
        $searchTerm = $request->input('searchTerm');
        
        return $query->when($searchTerm,         
        fn($query) => $query->where(function (Builder $query) use ($searchTerm) {
            $query->where('pic_name', 'ILIKE', "%$searchTerm%")
            ->orWhere('alias_customer_id', 'ILIKE', "%$searchTerm%")
            ->orWhere('company', 'ILIKE', "%$searchTerm%");
        }));
    }
    
}
