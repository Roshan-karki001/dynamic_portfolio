<?php

namespace App\Filament\Resources\Home\TrustedClients\Pages;

use App\Filament\Resources\Home\TrustedClients\TrustedClientsResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTrustedClients extends ListRecords
{
    protected static string $resource = TrustedClientsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
