<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class About extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mystory',
        'education',
        'hobby',
        'achievements',
    ];

    protected $casts = [
        'education' => 'array',
        'hobby' => 'array',
        'achievements' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
