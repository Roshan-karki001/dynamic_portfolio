<?php

namespace App\Filament\Resources\EmailForms\Pages;

use App\Filament\Resources\EmailForms\EmailFormResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditEmailForm extends EditRecord
{
    protected static string $resource = EmailFormResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
