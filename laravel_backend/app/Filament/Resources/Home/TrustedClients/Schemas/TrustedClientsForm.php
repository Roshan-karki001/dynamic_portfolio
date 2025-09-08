<?php

namespace App\Filament\Resources\Home\TrustedClients\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TrustedClientsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('logo')
                    ->label('Logo')
                    ->image()
                    ->disk('public') // stored in storage/app/public
                    ->directory('trustedclients/logo')
                    ->acceptedFileTypes(['image/jpeg', 'image/png'])
                    ->maxSize(1024)
                    ->imagePreviewHeight('150'),

                TextInput::make('short_description')
                    ->label('Description'),

                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),
            ]);
    }
}
