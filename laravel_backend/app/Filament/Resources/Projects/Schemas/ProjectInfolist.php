<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProjectInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Project Overview')
                ->description('Basic details and branding of the project')
                ->schema([
                    Grid::make(2)->schema([
                        ImageEntry::make('project_logo')
                            ->label('Project Logo')
                            ->disk('public')
                            ->circular()
                            ->size(120),

                        Group::make([
                            TextEntry::make('title')
                                ->label('Project Title')
                                ->weight('bold')
                                ->color('primary'),

                            TextEntry::make('slug')
                                ->label('URL Slug')
                                ->color('gray'),

                            TextEntry::make('status')
                                ->badge()
                                ->color(fn ($state) => match ($state) {
                                    'In Progress' => 'warning',
                                    'Completed' => 'success',
                                    'On Hold' => 'danger',
                                    default => 'gray',
                                }),
                        ]),
                    ]),
                ]),

            Section::make('Project Links & Info')
                ->columns(2)
                ->schema([
                    TextEntry::make('code_link')
                        ->label('Code Repository')
                        ->url(fn ($state) => $state)
                        ->openUrlInNewTab()
                        ->icon('heroicon-o-code-bracket'),

                    TextEntry::make('demo_link')
                        ->label('Live Demo')
                        ->url(fn ($state) => $state)
                        ->openUrlInNewTab()
                        ->icon('heroicon-o-globe-alt'),

                    TextEntry::make('date')
                        ->label('Project Date')
                        ->date(),

                    TextEntry::make('done_by')
                        ->label('Contributed By'),
                ]),

            Section::make('Activity & Metadata')
                ->columns(3)
                ->schema([
                    IconEntry::make('is_active')
                        ->label('Is Active?')
                        ->boolean(),

                    TextEntry::make('created_at')
                        ->label('Created At')
                        ->dateTime()
                        ->color('gray'),

                    TextEntry::make('updated_at')
                        ->label('Last Updated')
                        ->dateTime()
                        ->color('gray'),
                ]),
        ]);
    }
}
