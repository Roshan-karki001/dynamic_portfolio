<?php

namespace App\Filament\Resources\Home\TrustedClients\Pages;

use App\Filament\Resources\Home\TrustedClients\TrustedClientsResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTrustedClients extends ViewRecord
{
    protected static string $resource = TrustedClientsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
