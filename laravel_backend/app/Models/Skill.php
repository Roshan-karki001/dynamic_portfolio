<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
   protected $table = 'skills';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'skill_name',
        'skill_icon',
        'level',
        'title',
        'title_icon',
        'tools',
        'currently_learning',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tools' => 'array',
        'currently_learning' => 'array',
    ];
}
