<?php

namespace App\Filament\Resources\Faqs\Schemas;

use Filament\Schemas\Schema;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\IconEntry;

class FaqInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextEntry::make('faq_question')
                    ->label('FAQ Question'),

                IconEntry::make('is_active')
                    ->label('Active')
                    ->boolean(),

                TextEntry::make('faq_answer')
                    ->label('FAQ Answer'),

                TextEntry::make('updated_at')
                    ->label('Updated At')
                    ->dateTime(),
            ]);
    }
}
