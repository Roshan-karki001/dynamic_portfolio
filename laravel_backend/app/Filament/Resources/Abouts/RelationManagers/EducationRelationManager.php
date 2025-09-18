<?php

namespace App\Filament\Resources\Abouts\RelationManagers;

use App\Filament\Resources\Abouts\AboutResource;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;

class EducationRelationManager extends RelationManager
{
    protected static string $relationship = 'educations';

    protected static ?string $relatedResource = AboutResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
