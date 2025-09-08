<?php

namespace App\Filament\Resources\CaseStudies\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CaseStudyInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // Section 1: Case Details
                Section::make('Case Details')
                    ->schema([
                        TextEntry::make('title')->label('Title'),
                        TextEntry::make('slug')->label('Slug'),
                        TextEntry::make('description')->label('Description')->markdown(),
                        TextEntry::make('link')->label('Link'),
                        TextEntry::make('cases_tags')
                            ->label('Tags')
                            ->formatStateUsing(fn($state) => is_array($state) ? implode(', ', $state) : $state),
                    ])
                    ->columns(1),

                // Section 2: Company Info
                Section::make('Company Info')
                    ->schema([
                        TextEntry::make('company')->label('Company'),
                        TextEntry::make('year')->label('Year'),
                        TextEntry::make('industry')->label('Industry'),
                    ])
                    ->columns(1),

                // Section 3: Thumbnail
                Section::make('Thumbnail')
                    ->schema([
                        ImageEntry::make('thumbnail')
                            ->label('Thumbnail')
                            ->getStateUsing(fn($record) => $record->thumbnail ? asset('storage/' . $record->thumbnail) : null),
                    ])
                    ->columns(1),

                // Section 4: Works & Outcomes
                Section::make('Works & Outcomes')
                    ->schema([
                        RepeatableEntry::make('works')
                            ->label('Works')
                            ->schema([
                                TextEntry::make('title')->label('Work Title'),
                                TextEntry::make('description')->label('Work Description')->markdown(),

                                RepeatableEntry::make('outcomes')
                                    ->label('Outcomes')
                                    ->schema([
                                        TextEntry::make('title')->label('Outcome Title'),
                                        TextEntry::make('stats')->label('Stats'),
                                    ])
                                    ->columns(2),
                            ])
                            ->columns(0),
                    ]),

                // Section 5: Case Images

                     Section::make('Images')
                    ->schema([
                        ImageEntry::make('Images')
                            ->label('Images')
                            ->getStateUsing(fn($record) => $record->Images ? asset('storage/' . $record->Images) : null),
                    ])
                    ->columns(1),

            ])
            ->inlineLabel();
    }
}
