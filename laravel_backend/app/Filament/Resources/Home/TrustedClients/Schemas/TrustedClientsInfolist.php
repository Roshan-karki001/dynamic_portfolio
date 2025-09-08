<?php

namespace App\Filament\Resources\Home\TrustedClients\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\IconEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TrustedClientsInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Trusted Clients')
                    ->columns(1)
                    ->schema([
                        ImageEntry::make('logo')
                            ->label('Trusted Client Logo')
                            ->getStateUsing(
                                fn($record) => $record->logo
                                    ? asset('storage/' . $record->logo)
                                    : null
                            )
                            ->columnSpanFull(),

                        TextEntry::make('short_description') // ✅ match DB column
                            ->label('Description')
                            ->columnSpanFull(),

                        IconEntry::make('is_active')
                            ->label('Active')
                            ->boolean()
                            ->columnSpanFull(),
                    ]),
            ])
            ->inlineLabel();
    }
}
