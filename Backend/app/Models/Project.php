<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'long_description',
        'image',
        'tech',
        'category',
        'status',
        'github',
        'demo',
        'date',
        'team',
        'highlights',
    ];

    // Cast JSON fields to arrays automatically
    protected $casts = [
        'tech' => 'array',
        'highlights' => 'array',
    ];

    // Relationship: A project belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
