<?php

namespace App\Mail;

use App\Constant\MediaCollection;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Headers;

class SiteVisitMail extends Mailable implements ShouldQueue
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
            view: 'email/site_visit_mail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
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
