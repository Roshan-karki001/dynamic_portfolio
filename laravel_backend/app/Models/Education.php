<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'education';

    // Mass assignable attributes
    protected $fillable = [
        "about_id",
        'degree',
        'university',
        "start_year",
        "end_year",
        "gpa",
        "short_description",
    ];


    public function about()
    {
        return $this->belongsTo(About::class);
    }
}
