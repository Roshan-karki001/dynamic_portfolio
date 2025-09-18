<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $table = 'abouts';

    // Mass assignable attributes
    protected $fillable = [
        'story',
        'achievements',
        "interests_hobbies",
    ];

    public function education()
    {
        return $this->hasMany(Education::class);
    }
}
