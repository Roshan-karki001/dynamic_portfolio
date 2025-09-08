<?php

namespace App\Filament\Resources\Home\TrustedClients\Pages;

use App\Filament\Resources\Home\TrustedClients\TrustedClientsResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTrustedClients extends EditRecord
{
    protected static string $resource = TrustedClientsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
