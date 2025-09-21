<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'project_logo',
        'title',
        'slug',
        'description',
        'date',
        'done_by',
        'tech_used',
        'key_highlight',
        'code_link',
        'demo_link',
        'status',
        'is_active',
    ];

    /**
     * Casts for attributes
     */
    protected $appends = ['project_logo_path'];

    
    public function getProjectLogoPathAttribute() 
    {
        return $this->project_logo ? asset('storage/' . $this->project_logo) : null;
    }

     protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug) && !empty($project->title)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }
    protected $casts = [
        'tech_used' => 'array',
        'key_highlight' => 'array',
        'is_active' => 'boolean',
    ];
}
