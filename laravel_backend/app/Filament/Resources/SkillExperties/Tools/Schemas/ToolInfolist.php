<?php

namespace App\Filament\Resources\SkillExperties\Tools\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\RepeatableEntry;

class ToolInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextEntry::make('tools')
                ->badge()
                ->label('Primary Tool')
                ->color('success')
                ->formatStateUsing(
                    fn($state) => is_array($state)
                        ? ($state[0] ?? 'N/A')
                        : (explode(',', $state)[0] ?? 'N/A')
                )
                ->columnSpanFull(),

            Section::make('Currently Learning')
                ->description('Topics or subskills currently being studied')
                ->icon('heroicon-o-book-open')
                ->collapsible()
                ->schema([
                    RepeatableEntry::make('currently_learning')
                        ->label('')
                        ->schema([
                            TextEntry::make('title')
                                ->label('Title')
                                ->color('primary'),
                            TextEntry::make('description')
                                ->label('Description')
                                ->color('gray'),
                        ])
                        ->columns(2)
                        ->columnSpanFull(),
                ]),
        ]);
    }
}
