<?php

namespace App\Filament\Resources\Home\Testimonials\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                 
                FileUpload::make('avatar_url')
                    ->label('avatar_url')
                    ->image()
                    ->disk('public') // stored in storage/app/public
                    ->directory('testimonials/avatar_url')
                    ->acceptedFileTypes(['image/jpeg', 'image/png'])
                    ->maxSize(1024)
                    ->imagePreviewHeight('150'),

                TextInput::make('full_name')
                    ->label('full_name'),

                TextInput::make('title')
                    ->label('Title'),

                TextInput::make('company_name')
                    ->label('Company Name'),

                TextInput::make('review_text')
                    ->label('Review Text')
                    ->maxLength(1000)
                    ->columnSpanFull(),

                TextInput::make('rating')
                    ->label('Rating')
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(5)
                    ->step(0.1),

                TextInput::make('linkedin_url')
                    ->label('LinkedIn URL')
                    ->url()
                    ->maxLength(255),

                Toggle::make('status')
                    ->label('Status')
                    ->default(true),
                //
            ]);
    }
}
