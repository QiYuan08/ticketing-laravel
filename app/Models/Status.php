<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    public const TICKET_STATUS_OPEN = "OPEN";
    public const TICKET_STATUS_PENDING = "PENDING";
    public const TICKET_STATUS_SOLVED = "SOLVED";
    public const TICKET_STATUS_DELETED = "DELETED";

    public const TICKET_STATUS_OPEN_ID = 1;
    public const TICKET_STATUS_PENDING_ID = 2;
    public const TICKET_STATUS_SOLVED_ID = 3;
    public const TICKET_STATUS_DELETED_ID = 4;

    protected $primaryKey = 'status_id';

    protected $table = 'status';

    protected $fillable = [
        'name',
    ];
}
