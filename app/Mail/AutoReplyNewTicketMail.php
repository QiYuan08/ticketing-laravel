<?php

namespace App\Mail;

use App\Models\Messages;
use App\Models\Ticket;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class AutoReplyNewTicketMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $mailData;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
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
            // replyTo: $this->mailData->references[0]
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

        Log::debug('received references', [$this->mailData->references]);

        
        if ($this->mailData->references) {
            $header->references($this->mailData->references);
        }

        //save the references to ticket
        Ticket::where('ticket_id', '=', $this->mailData->ticketID)
            ->update(['latest_reference' =>   $this->mailData->messageId]);

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
            view: 'email/reply_new_ticket',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
