<?php

namespace App\Filament\Resources\CaseStudies\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;

class CaseStudyForm
{
    public static function configure($form)
    {
        return $form->schema([

            // Section 1: Case Details
            Section::make('Case Details')
                ->schema([
                    TextInput::make('title')
                        ->required()
                        ->live(onBlur: true)
                        ->maxLength(255)
                        ->afterStateUpdated(
                            fn(string $operation, $state, Set $set) =>
                            $operation === 'create' ? $set('slug', Str::slug($state)) : null
                        ),

                    TextInput::make('slug')
                        ->disabled()
                        ->dehydrated()
                        ->required()
                        ->maxLength(255),

                    RichEditor::make('description')
                        ->required()
                        ->maxLength(1000)
                        ->columnSpanFull(),

                    TextInput::make('link')
                        ->url()
                        ->maxLength(255),

                    SpatieTagsInput::make('cases_tags')
                        ->label('Tags')
                        ->placeholder('Add tags (use comma or enter)')
                        ->columnSpanFull()
                        ->afterStateHydrated(fn($component, $state) => $component->state($state ?? []))
                        ->dehydrateStateUsing(fn($state) => $state ?? [])
                        ->dehydrated() // <-- this is crucial




                ])
                ->columns(2),

            // Section 2: Company Info
            Section::make('Company Info')
                ->schema([
                    TextInput::make('company')->maxLength(255),
                    TextInput::make('year')->numeric()->minValue(1900)->maxValue(now()->year),
                    TextInput::make('industry')->maxLength(255),
                ])
                ->columns(2),

            // Section 3: Thumbnail
            Section::make('Thumbnail')
                ->schema([
                    FileUpload::make('thumbnail')
                        ->label('Thumbnail')
                        ->image()
                        ->disk('public')
                        ->directory('case-studies/thumbnails') // stored in storage/app/public/case-studies/thumbnails
                        ->acceptedFileTypes(['image/jpeg', 'image/png'])
                        ->maxSize(1024) // 1MB
                        ->imagePreviewHeight('250')
                        ->helperText('Upload a thumbnail image (Max: 1MB).')
                        ->columnSpanFull(),
                ]),

            // Section 4: Works & Outcomes
            Section::make('Works & Outcomes')
                ->schema([
                    Repeater::make('works')
                        ->relationship('works')
                        ->schema([
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

                            Textarea::make('description')->label('Description'),

                            // Nested Outcomes inside each Work
                            Repeater::make('outcomes')
                                ->relationship('outcomes')
                                ->schema([
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

                                    TextInput::make('stats')->maxLength(255),
                                ])
                                ->label('Outcomes')
                                ->collapsible()
                                ->addActionLabel('Add Outcome'),
                        ])
                        ->label('Case Works')
                        ->collapsible()
                        ->addActionLabel('Add Work')
                        ->columns(2),
                ]),

            // Section 5: Images (CaseImage relationship)
            Section::make('Images')
                ->schema([
                    Repeater::make('images')
                        ->relationship('images') // CaseStudy::images()
                        ->schema([
                            FileUpload::make('image')
                                ->label('Upload Image')
                                ->image()
                                ->disk('public')
                                ->directory('case-studies/images')
                                ->maxSize(1024) // 1MB
                                ->required(),
                        ])

                        ->label('Case Images')
                        ->collapsible()
                        ->addActionLabel('Add Image')
                        ->reorderable()
                        ->columns(1),
                ]),

        ]);
    }
}
