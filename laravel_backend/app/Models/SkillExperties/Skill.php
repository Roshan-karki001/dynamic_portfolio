<?php

namespace App\Models\SkillExperties;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
   protected $table = 'skills';
   
    protected $fillable = [
        'skill_name',
        'skill_icon',
        'level',
        'title',
        'title_icon',
  
    ];

   
}
