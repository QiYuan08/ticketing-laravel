<?php

namespace App\Models;

use App\Constant\MediaCollection;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Messages extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'internal_node',
        'payload',
        'from',
        'to',
    ];

    public function to() {
        return $this->belongsTo(User::class, 'to');
    }

    public function from() {
        return $this->belongsTo(User::class, 'from');
    }

    public function getMessageMedia() {
        return $this->getMedia(MediaCollection::MESSAGE_ATTACHMENT)->map(function($item){
            return [
                'attachment_name' => $item->file_name,
                'attachment_size' => $item->size,
                'link' => $item->getTemporaryUrl(Carbon::now()->addHours(2))
            ];
        });
    }
}
