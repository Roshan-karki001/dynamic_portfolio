<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(2) // split into 2 columns for a cleaner UI
            ->components([
                // --- Left column ---
                FileUpload::make('project_logo')
                        ->label('Project Logo')
                        ->image()
                        ->disk('public')
                        ->directory('projects/logos') 
                        ->acceptedFileTypes(['image/jpeg', 'image/png'])
                        ->maxSize(1024) // 1MB
                        ->imagePreviewHeight('250')
                        ->helperText('Upload a logo  (Max: 1MB).')
                        ->columnSpanFull(),

                TextInput::make('title')
                    ->label('Project Title')
                    ->required()
                    ->reactive() // to auto-generate slug when title changes
                    ->afterStateUpdated(fn ($state, callable $set) => 
                        $set('slug', Str::slug($state))
                    ),

                TextInput::make('slug')
                    ->required()
                    ->disabled()
                    ->label('Slug'),

                DatePicker::make('date')
                    ->label('Project Date'),

                Select::make('done_by')
                    ->label('Project Type')
                    ->options([
                        'Solo Project' => 'Solo Project',
                        'Team Project' => 'Team Project',
                    ])
                    ->searchable(),

                Select::make('status')
                    ->label('Status')
                    ->options([
                        'completed' => 'Completed',
                        'in progress' => 'In Progress',
                        'planning' => 'Planning',
                    ]),

                Toggle::make('is_active')
                    ->label('Active?')
                    ->default(true),

                // --- Full width fields ---
                RichEditor::make('description')
                    ->label('Description')
                    ->columnSpanFull(),

                SpatieTagsInput::make('tech_used')
                    ->label('Technologies Used')
                    ->placeholder('Add tags (use comma or enter)')
                    ->columnSpanFull()
                    ->afterStateHydrated(fn ($component, $state) => $component->state($state ?? []))
                    ->dehydrateStateUsing(fn ($state) => $state ?? [])
                    ->dehydrated()
                    ->default([]),

                SpatieTagsInput::make('key_highlight')
                    ->label('Key Highlights')
                    ->placeholder('Add tags (use comma or enter)')
                    ->columnSpanFull()
                    ->afterStateHydrated(fn ($component, $state) => $component->state($state ?? []))
                    ->dehydrateStateUsing(fn ($state) => $state ?? [])
                    ->dehydrated()
                    ->default([]),

                TextInput::make('code_link')
                    ->label('Code Link')
                    ->url()
                    ->prefixIcon('heroicon-o-code-bracket')
                    ->columnSpan(1),

                TextInput::make('demo_link')
                    ->label('Demo Link')
                    ->url()
                    ->prefixIcon('heroicon-o-play')
                    ->columnSpan(1),
            ]);
    }
}