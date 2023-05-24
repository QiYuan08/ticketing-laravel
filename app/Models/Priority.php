<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    use HasFactory;

    public const HIGH = 'High';
    public const MEDIUM = 'Medium'    ;
    public const LOW = 'Low';

    public const HIGH_ID = 1;
    public const MEDIUM_ID = 2;
    public const LOW_ID = 3;

    protected $primaryKey = 'priority_id';

    protected $table = 'priority';

    protected $fillable = [
        'name',
    ];

}
