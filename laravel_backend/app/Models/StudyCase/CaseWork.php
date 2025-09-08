<?php

namespace App\Models\StudyCase;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CaseWork extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cases_works';

    protected $fillable = [
        'case_id',
        'title',
        'slug',
        'description',
    ];

    /**
     * Relationship: A CaseWork belongs to a CaseStudy
     */
    public function caseStudy()
    {
        return $this->belongsTo(CaseStudy::class, 'case_id');
    }

    /**
     * Relationship: A CaseWork has many Outcomes
     */
    public function outcomes()
    {
        return $this->hasMany(CaseWorkOutcome::class, 'case_work_id');
    }
}
