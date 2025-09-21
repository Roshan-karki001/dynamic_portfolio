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

    protected $appends = ['skill_icon_path'];

    
    public function getSkillIconPathAttribute() 
    {
        return $this->skill_icon ? asset('storage/' . $this->skill_icon) : null;
    }

}
