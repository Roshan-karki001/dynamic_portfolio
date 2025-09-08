<?php

namespace App\Filament\Resources\EmailForms\Pages;

use App\Filament\Resources\EmailForms\EmailFormResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListEmailForms extends ListRecords
{
    protected static string $resource = EmailFormResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
