<?php

namespace App\Filament\Resources\Home\Testimonials\Pages;

use App\Filament\Resources\Home\Testimonials\TestimonialsResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTestimonials extends ViewRecord
{
    protected static string $resource = TestimonialsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
