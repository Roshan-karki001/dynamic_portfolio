<?php

namespace App\Filament\Resources\Home\Testimonials\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\IconEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TestimonialInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Trusted Clients')
                ->columns(2)
                ->schema([
                    ImageEntry::make('avatar_url')
                        ->label('Avatar Logo')
                        ->getStateUsing(fn($record) => $record->avatar_url
                            ? asset('storage/' . $record->avatar_url)
                            : asset('images/default-avatar.png')
                        )
                        ->columnSpanFull(),

                    TextEntry::make('full_name')
                        ->label('Full Name'),

                    TextEntry::make('title')
                        ->label('Title'),

                    TextEntry::make('company_name')
                        ->label('Company Name'),

                    TextEntry::make('rating')
                        ->label('Rating')
                        ->numeric()
                        ->formatStateUsing(fn($state) => number_format($state, 1)),

                    IconEntry::make('status')
                        ->label('Status')
                        ->boolean()
                        ->columnSpanFull(),

                    TextEntry::make('linkedin_url')
                        ->label('LinkedIn')
                        ->formatStateUsing(fn($state) => 'View LinkedIn')
                        ->url(fn($record) => $record->linkedin_url)
                        ->openUrlInNewTab()
                        ->columnSpanFull(),

                    TextEntry::make('review_text')
                        ->label('Review')
                        ->columnSpanFull(),
                ]),
        ]);
    }
}
