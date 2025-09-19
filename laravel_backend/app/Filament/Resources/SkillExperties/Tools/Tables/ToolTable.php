<?php

namespace App\Filament\Resources\SkillExperties\Tools\Tables;

use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Filters\Filter;
use Filament\Actions\ViewAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;

class ToolTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                BadgeColumn::make('tools')
                    ->label('Primary Tool')
                    ->color('success')
                    ->formatStateUsing(function ($state) {
                        return is_array($state)
                            ? ($state[0] ?? 'N/A')
                            : (explode(',', $state)[0] ?? 'N/A');
                    }),

                TextColumn::make('currently_learning')
                    ->label('Currently Learning')
                    ->limit(50)
                    ->formatStateUsing(function ($state) {
                        if (is_array($state)) {
                            return collect($state)->pluck('title')->implode(', ');
                        }

                        return $state ?? '—';
                    }),

                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('M d, Y'),
            ])
            ->filters([
                // Example filter (optional)
                // Filter::make('created_at')
                //     ->label('Created Date')
                //     ->query(fn ($query) => $query->latest('created_at')),
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
