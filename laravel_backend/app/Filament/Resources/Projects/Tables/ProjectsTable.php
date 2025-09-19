<?php

namespace App\Filament\Resources\Projects\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProjectsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('project_logo')
                    ->label('Project Logo')
                    ->disk('public')
                    ->circular(),

                TextColumn::make('title')
                    ->searchable(),

                TextColumn::make('tech_used')
                    ->label('Technologies')
                    ->badge()
                    ->formatStateUsing(
                        fn($state) =>
                        is_array($state) ? ($state[0] ?? null) : (explode(',', $state)[0] ?? null)
                    ),

                TextColumn::make('date')
                    ->searchable(),

                TextColumn::make('status'),

                // Toggleable columns (optional)
                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(),

                TextColumn::make('done_by')
                    ->toggleable(),

                TextColumn::make('code_link')
                    ->searchable()
                    ->toggleable(),

                TextColumn::make('key_highlight')
                    ->label('Keys')
                    ->badge()
                    ->formatStateUsing(
                        fn($state) =>
                        is_array($state) ? ($state[0] ?? null) : (explode(',', $state)[0] ?? null)
                    )
                    ->toggleable(),

                IconColumn::make('is_active')
                    ->boolean()
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
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
