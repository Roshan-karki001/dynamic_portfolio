<?php

namespace App\Filament\Resources\CaseStudies\RelationManagers;

use App\Filament\Resources\CaseStudies\CaseStudyResource;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;

class OutcomesRelationManager extends RelationManager
{
    protected static string $relationship = 'outcomes';

    protected static ?string $relatedResource = CaseStudyResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
