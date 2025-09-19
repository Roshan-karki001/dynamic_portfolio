<?php

namespace App\Filament\Resources\SkillExperties\Skills\Pages;

use App\Filament\Resources\SkillExperties\Skills\SkillResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSkills extends ListRecords
{
    protected static string $resource = SkillResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
