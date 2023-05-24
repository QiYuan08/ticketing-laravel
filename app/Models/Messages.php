<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Messages extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasFactory;

    public function to() {
        return $this->belongsTo(User::class, 'to');
    }

    public function from() {
        return $this->belongsTo(User::class, 'from');
    }
}
