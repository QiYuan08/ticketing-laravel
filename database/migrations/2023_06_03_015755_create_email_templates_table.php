<?php

use App\Models\EmailTemplate;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_templates', function (Blueprint $table) {
            $table->uuid('template_id')->primary()->index();
            $table->string('template_name')->index();
            $table->longText('content');
            $table->timestamps();
        });

        // create default template
        EmailTemplate::create([
            'template_name' => 'Default',
            'content' => "p><span style=\"font-size: 10.0pt; font-family: 'Helvetica',sans-serif;\">Dear {{customer}},<br><br>We have received your request and the <strong>Case #{{ticketNumber}}</strong> has been assigned. Meanwhile, we suggest replying with case #{{ticketNumber}} in any further communication for easier reference.<br><br>While resolving your urgent issue is our top priority, each support request is replied to in the order it comes in. Rest assured that we&rsquo;re doing our very best to attend to your ticket as soon as we can!<br><em><br>** Kindly note that replying using subject #{{ticketNumber}} - #{{subject}} to make inquiries on the status will reset your support request and the ticket queue.</em></span></p><p><span style=\"font-size: 10.0pt; font-family: 'Helvetica',sans-serif;\"><br>Thank you for your patience.</span></p><p><span style=\"font-size: 10.0pt; font-family: 'Helvetica',sans-serif;\"><br>Sincerely,<br><br>MAGIT SOLUTIONS PTE LTD - Technical Support<br>--------------------<br>Case #{{ticketNumber}}<br>--------------------</span></p>"
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('email_templates');
    }
};
