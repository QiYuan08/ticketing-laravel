<?php

namespace App\Mail;

use App\Constant\MediaCollection;
use App\Models\Ticket;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Support\Str;

class GeneralMail extends Mailable
{
    use Queueable, SerializesModels;

    public $mailData;
    public $message;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mailData, $message)
    {
        $this->mailData = $mailData;
        $this->message = $message;
        $this->afterCommit = true;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: $this->mailData->subject,
        );
    }

    /**
    * Get the message headers.
    */
    public function headers(): Headers
    {
        $header = new Headers (
            messageId: $this->mailData->messageId,
        );

        if ($this->mailData->references) {
            $header->references($this->mailData->references);
        }

        //save the references to ticket
        Ticket::where('ticket_id', '=', $this->mailData->ticketID)
            ->update(['latest_reference' =>  $this->mailData->messageId]);

        return $header;
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
    
        return new Content(
            view: 'email/general_mail',
            // text: $this->mailData->content
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return \Illuminate\Mail\Mailables\Attachment[]
     */
    public function attachments()
    {  
       return $this->message
                ->getMedia(MediaCollection::MESSAGE_ATTACHMENT)
                ->map(function ($media){
                    return Attachment::fromStorageDisk('do_spaces', $media->getPath());
               })->toArray();
    }
}
