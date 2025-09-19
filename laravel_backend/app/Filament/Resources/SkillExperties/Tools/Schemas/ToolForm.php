<?php

namespace App\Filament\Resources\SkillExperties\Tools\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Schema;

class ToolForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                SpatieTagsInput::make('tools')
                    ->label('Tags')
                    ->placeholder('Add tags (use comma or enter)')
                    ->columnSpanFull()
                    ->afterStateHydrated(fn($component, $state) => $component->state($state ?? []))
                    ->dehydrateStateUsing(fn($state) => $state ?? [])
                    ->dehydrated(),

                Repeater::make('currently_learning')
                    ->schema([
                        TextInput::make('title')
                            ->label('Title')
                            ->required(),
                        Textarea::make('description')
                            ->label('Description')
                            ->required(),
                    ])
                    ->default([])
                    ->columnSpanFull()
                    ->addActionLabel('Add Learning Item'),
                //
            ]);
    }
}
