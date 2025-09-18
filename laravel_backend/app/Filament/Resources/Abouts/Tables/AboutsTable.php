<?php

namespace App\Filament\Resources\Abouts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class AboutsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('story')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('achievements')
                    ->sortable()
                    ->toggleable(),

                // Optional: Tags column (Spatie Tags)
                TextColumn::make('interests_hobbies.name')
                    ->label('Tags')
                    ->badge()
                    ->separator(', ')
                    ->toggleable(),

                TextColumn::make('education_count')
                    ->label('Education Entries')
                    ->counts('education') 
                    ->sortable()
                    ->toggleable(),

            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
