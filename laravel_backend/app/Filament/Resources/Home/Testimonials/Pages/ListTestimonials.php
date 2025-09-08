<?php

namespace App\Filament\Resources\Home\Testimonials\Pages;

use App\Filament\Resources\Home\Testimonials\TestimonialsResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTestimonials extends ListRecords
{
    protected static string $resource = TestimonialsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
