<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $table = 'faqs'; // Table name

    protected $fillable = [
        'faq_question',
        'faq_answer',
        'is_active',
    ];
}
