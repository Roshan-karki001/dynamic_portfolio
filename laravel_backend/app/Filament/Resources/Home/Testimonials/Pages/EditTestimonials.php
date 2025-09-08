<?php

namespace App\Filament\Resources\Home\Testimonials\Pages;

use App\Filament\Resources\Home\Testimonials\TestimonialsResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTestimonials extends EditRecord
{
    protected static string $resource = TestimonialsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
