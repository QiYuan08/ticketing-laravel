<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $primaryKey = 'ticket_id';
    protected $model = 'tickets';

    protected $with = ['priority', 'status', 'type'];
    
    public function messages()
    {
        return $this->hasMany(Messages::class);
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

}
