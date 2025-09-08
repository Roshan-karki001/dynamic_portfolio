<?php

namespace App\Filament\Resources\EmailForms\Pages;

use App\Filament\Resources\EmailForms\EmailFormResource;
use Filament\Resources\Pages\CreateRecord;

class CreateEmailForm extends CreateRecord
{
    protected static string $resource = EmailFormResource::class;
}
