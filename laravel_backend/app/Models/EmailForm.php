<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailForm extends Model
{
    protected $table = 'email_form';

    // Mass assignable attributes
    protected $fillable = [
        'full_name',
        'work_email',
        "service",
        "budget",
        "project_description",
        "heard_from",
        "remarks",
        "status",

    ];
}
