<?php

namespace App\Models\StudyCase;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CaseStudy extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cases'; // Table name

    protected $fillable = [
        'title',
        'slug',
        'description',
        'link',
        'thumbnail',
        'company',
        'year',
        'industry',
        'cases_tags',
    ];

    /**
     * Relationship: A CaseStudy has many CaseWorks
     */

    protected $casts = [
        'cases_tags' => 'array',
    ];

     protected $appends = ['thumbnail_path']; // Include the accessor in JSON responses

    /**
     * Accessor to get full URL of logo
     */
    public function getthumbnailPathAttribute()
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;

    }

    public function works()
    {
        return $this->hasMany(CaseWork::class, 'case_id');
    }

    /**
     * Relationship: A CaseStudy has many Images
     */
    public function images()
    {
        return $this->hasMany(CaseImage::class, 'case_id');
    }
}
