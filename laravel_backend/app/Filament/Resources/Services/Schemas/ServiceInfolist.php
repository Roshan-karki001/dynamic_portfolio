<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Schema;

class ServiceInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Service Details')
                    ->schema([
                        Group::make()
                            ->schema([
                                ImageEntry::make('service_thumbnail')
                                    ->label('Thumbnail')
                                    ->disk('public')
                                    ->circular()
                                    ->size(120),

                                TextEntry::make('title')
                                    ->label('Title')
                                    ->weight('bold')
                                    ->color('primary')
                                    ->size('xl'),



                                TextEntry::make('catagory_tags')
                                    ->label('Category Tags')
                                    ->badge()
                                    ->formatStateUsing(
                                        fn($state) =>
                                        is_array($state) ? ($state[0] ?? null) : (explode(',', $state)[0] ?? null)
                                    ),
                            ])
                            ->columns(4),
                    ]),

                Section::make('Update Information')
                            ->collapsible()
                            ->schema([
                                TextEntry::make('created_at')
                                    ->label('Created At')
                                    ->dateTime()
                                    ->color('success'),

                                TextEntry::make('updated_at')
                                    ->label('Updated At')
                                    ->dateTime()
                                    ->color('warning'),
                            ])
                            ->columns(1),
            ]);
    }
}
