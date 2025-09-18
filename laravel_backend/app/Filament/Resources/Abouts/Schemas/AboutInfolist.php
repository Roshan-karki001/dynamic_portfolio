<?php

namespace App\Filament\Resources\Abouts\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Schemas\Components\TagsEntry;

class AboutInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('About Details')
                ->schema([
                    TextEntry::make('story')
                        ->label('Story'),

                    TextEntry::make('description')
                        ->label('Description')
                        ->html(), // to render RichEditor content as HTML

                    TextEntry::make('interests_hobbies')
                        ->label('Tags'),
                ])
                ->columns(2),

            Section::make('Education')
                ->schema([
                    RepeatableEntry::make('education')
                        ->relationship('education')
                        ->schema([
                            TextEntry::make('degree')->label('Degree'),
                            TextEntry::make('university')->label('University'),
                            TextEntry::make('start_year')->label('Start Year'),
                            TextEntry::make('end_year')->label('End Year'),
                            TextEntry::make('gpa')->label('GPA'),
                            TextEntry::make('short_description')->label('Short Description'),
                        ])
                        ->label('Education History'),
                ])
                ->columns(1),
        ]);
    }
}
