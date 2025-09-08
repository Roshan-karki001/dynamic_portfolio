<?php

namespace App\Filament\Resources\EmailForms\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\TextInputColumn;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Filters\SelectFilter;

class EmailFormsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime('M d, Y ')
                    ->sortable(),

                TextColumn::make('full_name')
                    ->label('Full Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('work_email')
                    ->label('Work Email')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('service')
                    ->sortable(),

                TextColumn::make('budget')
                    ->sortable(),

                TextColumn::make('heard_from')
                    ->label('Heard From')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('project_description')
                    ->label('Project')
                    ->limit(50)
                    ->tooltip(fn($record) => $record->project_description)
                    ->toggleable(),

                TextInputColumn::make('remarks')
                    ->label('Remarks')
                    ->toggleable(),

                SelectColumn::make('status')
                    ->label('Status')
                    ->options([
                        'attended' => 'Attended',
                        'not attended' => 'Not Attended',
                    ])
                    ->sortable(),
                
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'attended' => 'Attended',
                        'not attended' => 'Not Attended',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
