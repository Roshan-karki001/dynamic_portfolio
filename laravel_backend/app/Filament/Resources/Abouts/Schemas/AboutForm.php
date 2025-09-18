<?php

namespace App\Filament\Resources\Abouts\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;

class AboutForm
{
    public static function configure($form)
    {
        return $form->schema([
            Section::make('about Details')
                ->schema([
                    TextInput::make('story')
                        ->required()
                        ->maxLength(255),
                        
                    RichEditor::make('description')
                        ->required()
                        ->maxLength(1000)
                        ->columnSpanFull(),

                    SpatieTagsInput::make('interests_hobbies')
                        ->label('Tags')
                        ->placeholder('Add tags (use comma or enter)')
                        ->columnSpanFull()
                        ->afterStateHydrated(fn($component, $state) => $component->state($state ?? []))
                        ->dehydrateStateUsing(fn($state) => $state ?? [])
                        ->dehydrated() 

                ])
                ->columns(2),

            Section::make('Education')
                ->schema([
                    Repeater::make('education')
                        ->relationship('education')
                        ->schema([
                            TextInput::make('degree')->required()->maxLength(255),
                            TextInput::make('university')->required()->maxLength(255),
                            TextInput::make('start_year')->required(),
                            TextInput::make('end_year')->required(),
                            TextInput::make('gpa')->numeric()->maxLength(4),
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
