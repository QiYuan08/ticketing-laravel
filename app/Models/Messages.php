<?php

namespace App\Models;

use App\Constant\MediaCollection;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Messages extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasFactory;
    use HasUuids;

    protected $primaryKey = 'message_id';

    protected $with = [
        'recipient',
        'sender',
    ];

    protected $fillable = [
        'ticket_id',
        'internal_node',
        'payload',
        'recipient_id',
        'recipient_type',
        'sender_id',
        'sender_type',
        'in_reply_to',
        'messageId',
        'source_ticket',
    ];

    public function recipient() {
            return $this->morphTo();
    }    

    public function sender() {
        return $this->morphTo();
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

    public static function getReferences($ticketId){        
        return Messages::where('ticket_id', '=', $ticketId)->orderBy('created_at', 'asc')->get()->pluck('messageId')->toArray();
    }
}
