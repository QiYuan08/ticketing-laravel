<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public const ADMIN = 'Admin';
    public const AGENT = 'Agent'    ;
    public const CUSTOMER = 'Customer';

    protected $table = 'role';
    protected $primaryKey = 'role_id';

    protected $fillable = [
        'access_lvl'
    ];
}
