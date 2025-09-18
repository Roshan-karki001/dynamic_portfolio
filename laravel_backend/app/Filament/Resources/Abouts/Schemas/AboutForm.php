<?php

namespace App\Filament\Resources\Abouts\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;
use Filament\Forms\Components\DatePicker;

class AboutForm
{
    public static function configure($form)
    {
        return $form->schema([
            Section::make('about Details')
                ->schema([
                    Textarea::make('story')
                        ->required()
                        ->columnSpanFull()
                        ->maxLength(1000),
                        
                    SpatieTagsInput::make('achievements')
                        ->label('Achievements')
                        ->placeholder('Add tags (use comma or enter)')
                        ->columnSpanFull()
                        ->afterStateHydrated(fn($component, $state) => $component->state($state ?? []))
                        ->dehydrateStateUsing(fn($state) => $state ?? [])
                        ->dehydrated() // <-- this is crucial
                        ->default([]),

                    SpatieTagsInput::make('interests_hobbies')
                        ->label('Interests & Hobbies')
                        ->placeholder('Add tags (use comma or enter)')
                        ->columnSpanFull()
                        ->afterStateHydrated(fn($component, $state) => $component->state($state ?? []))
                        ->dehydrateStateUsing(fn($state) => $state ?? [])
                        ->dehydrated() // <-- this is crucial
                        ->default([]),
                ])
                ->columns(2),

            Section::make('Education')
                ->schema([
                    Repeater::make('education')
                        ->relationship('education')
                        ->schema([
                            TextInput::make('degree')->required()->maxLength(255),
                            TextInput::make('university')->required()->maxLength(255),
                            DatePicker::make('start_year')->required(),
                            DatePicker::make('end_year')->required(),
                            TextInput::make('gpa')
                                ->label('GPA')
                                ->numeric()
                                ->required()
                                ->minValue(0)
                                ->maxValue(4)
                                ->step(0.01),

                            Textarea::make('short_description'),
                        ])
                        ->label('Education')
                        ->collapsible()
                        ->addActionLabel('Add Education')
                        ->columns(2),
                ])->columns(1),
        ]);
    }
}
