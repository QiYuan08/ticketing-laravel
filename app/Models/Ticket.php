<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Ticket extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasFactory;

    protected $primaryKey = 'ticket_id';
    protected $model = 'tickets';

    protected $with = ['priority', 'status', 'type'];

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
        return $this->belongsTo(User::class, 'requestor_id');
    }

    public function assignee() {
        return $this->belongsTo(User::class, 'assignee_id');
    }

}
