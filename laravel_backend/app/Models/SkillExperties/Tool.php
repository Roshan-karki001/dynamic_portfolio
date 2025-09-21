<?php

namespace App\Models\SkillExperties;

use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    protected $table = 'tools';

    protected $fillable = [
        'tools',
        'currently_learning',
        'skill_id', // make sure you add this FK in your migration
    ];

    protected $casts = [
        'tools' => 'array',
        'currently_learning' => 'array',
    ];

    
}
