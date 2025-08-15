<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'url',
    ];

    public function technologies()
    {
        return $this->belongsToMany(Technology::class, 'project_technology');
    }
}
