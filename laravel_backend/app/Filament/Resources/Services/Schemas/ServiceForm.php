<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;


class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('service_thumbnail')
                    ->label('service_thumbnail')
                    ->image()
                    ->disk('public')
                    ->directory('service_thumbnail')
                    ->acceptedFileTypes(['image/jpeg', 'image/png'])
                    ->maxSize(2024)
                    ->imagePreviewHeight('150'),

                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(
                        fn(string $operation, $state, Set $set) =>
                        $operation === 'create' ? $set('slug', Str::slug($state)) : null
                    ),
                TextInput::make('slug')
                    ->disabled()
                    ->dehydrated()
                    ->required()
                    ->maxLength(255),

                SpatieTagsInput::make('catagory_tags')
                    ->label('catagory_tags')
                    ->placeholder('Add catagory_tags (use comma or enter)')
                    ->columnSpanFull()
                    ->afterStateHydrated(fn($component, $state) => $component->state($state ?? []))
                    ->dehydrateStateUsing(fn($state) => $state ?? [])
                    ->dehydrated() // <-- this is crucial


            ]);
    }
}
