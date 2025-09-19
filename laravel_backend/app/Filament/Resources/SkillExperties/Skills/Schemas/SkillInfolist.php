<?php

namespace App\Filament\Resources\SkillExperties\Skills\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Infolists\Components\BadgeEntry;
use Filament\Schemas\Schema;

class SkillInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Skill Details')
                ->description('Basic information about this skill')
                ->icon('heroicon-o-light-bulb')
                ->columns(3)
                ->schema([
                    TextEntry::make('skill_name')
                        ->label('Skill Name')
                        ->columnSpan(2)
                        ->weight('bold')
                        ->color('primary'),

                    ImageEntry::make('skill_icon')
                        ->label('Skill Icon')
                        ->disk('public')
                        ->circular()
                        ->columnSpan(1),
                ]),

            Section::make('Skill Level & Tools')
                ->description('Proficiency and associated tools')
                ->columns(2)
                ->schema([
                    TextEntry::make('level')
                        ->label('Level')
                        ->color('info')
                        ->badge()
                        ->columnSpan(1),

                    TextEntry::make('title')
                        ->label('Title')
                        ->color('gray')
                        ->columnSpan(1),
                ]),
            Section::make('Timestamps')
                ->description('Audit information')
                ->icon('heroicon-o-clock')
                ->columns(2)
                ->schema([
                    TextEntry::make('created_at')
                        ->label('Created At')
                        ->dateTime()
                        ->color('gray'),

                    TextEntry::make('updated_at')
                        ->label('Updated At')
                        ->dateTime()
                        ->color('gray'),
                ]),
        ]);
    }
}
