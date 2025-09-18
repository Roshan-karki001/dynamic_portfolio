<?php

namespace App\Filament\Resources\Abouts\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Schemas\Components\TagsEntry;

class AboutInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            // First section: Full-width Story
            Section::make('About Details')
                ->schema([
                    TextEntry::make('story')
                        ->label('Story')
                        ->columnSpanFull(),
                ])
                ->columns(1), // Full width for story

            // Second section: 2x2 Grid
            Section::make('Personal Highlights')
                ->schema([
                    TextEntry::make('achievements')
                        ->label('Achievements')
                        ->html()
                        ->columnSpanFull(),

                    TextEntry::make('interests_hobbies')
                        ->label('Interests & Hobbies')
                        ->columnSpanFull(),
                ])
                ->columns(2),

            // Third section: Education
            Section::make('Education')
            ->columnSpanFull()
                ->schema([
                    RepeatableEntry::make('education')
                        ->label('Education History')
                        ->columnSpan(1)
                        ->schema([
                            Grid::make(2)->schema([ // layout fields inside one entry
                                TextEntry::make('degree')->label('Degree')->columnSpan(1),
                                TextEntry::make('university')->label('University')->columnSpan(1),
                                TextEntry::make('start_year')->label('Start Year'),
                                TextEntry::make('end_year')->label('End Year'),
                                TextEntry::make('gpa')->label('GPA') ,
                            ]),
                            TextEntry::make('short_description')->label('Short Description')->columnSpanFull(),
                        ])
                ])

        ]);
    }
}
