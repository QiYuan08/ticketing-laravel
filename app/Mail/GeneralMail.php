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
use Illuminate\Support\Facades\Log;

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

    // /**
    //  * Build the message.
    //  *
    //  * @return $this
    //  */
    // public function build()
    // {
    //     return $this->subject($this->mailData->subject)
    //                 ->view('email/general_mail')
    //                 ->attach($this->message->getFirstMedia(MediaCollection::MESSAGE_ATTACHMENT)->mailAttachment());
    // }

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

    //     Log::debug('Sending mail with attachment', ['attachmentPath' => $this->message
    //     ->getMedia(MediaCollection::MESSAGE_ATTACHMENT)
    //     ->map(function ($media){
    //         return Attachment::fromStorageDisk('do_spaces', $media->getPath());
    //    })->toArray()]);

       return $this->message
                ->getMedia(MediaCollection::MESSAGE_ATTACHMENT)
                ->map(function ($media){
                    return Attachment::fromStorageDisk('do_spaces', $media->getPath());
               })->toArray();
    }
}
