<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'services'; // Table name

    protected $fillable = [
        'title',
        'slug',
        'service_thumbnail',
        'catagory_tags',
    ];
    
    protected $appends = ['service_thumbnail_path'];

    
    public function getServiceThumbnailPathAttribute() 
    {
        return $this->service_thumbnail ? asset('storage/' . $this->service_thumbnail) : null;
    }

    protected $casts = [
        'catagory_tags' => 'array',
    ];
}
