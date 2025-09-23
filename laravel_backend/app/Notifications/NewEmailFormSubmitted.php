<?php

namespace App\Notifications;

use App\Models\EmailForm;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewEmailFormSubmitted extends Notification
{
    use Queueable;

    public EmailForm $form;

    public function __construct(EmailForm $form)
    {
        $this->form = $form;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Form Submission')
            ->greeting('Hello!')
            ->line('A new form has been submitted:')
            ->line('**Name:** ' . $this->form->full_name)
            ->line('**Email:** ' . $this->form->work_email)
            ->line('**Subject:** ' . $this->form->subject)
            ->line('**Message:**')
            ->line($this->form->message)
            ->action('View Submissions', url('/admin/forms'))
            ->line('Thank you.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'New Form Submission',
            'body' => $this->form->full_name . ' submitted a form with subject: "' . $this->form->subject . '"',
            'url' => url('/email-forms' . $this->form->id),
        ];
    }
}
