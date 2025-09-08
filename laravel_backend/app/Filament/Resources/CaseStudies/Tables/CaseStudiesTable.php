<?php

namespace App\Filament\Resources\CaseStudies\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Filament\Tables\Grouping\Group;

class CaseStudiesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail')
                    ->label('Thumbnail')
                    ->rounded()
                    ->square()
                    ->height(50)
                    ->width(50)
                    ->toggleable(),
                    
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('slug')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('company')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('year')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('industry')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->date()
                    ->sortable()
                    ->toggleable()
                    ->label('Created'),
                
                // Optional: Tags column (Spatie Tags)
                TextColumn::make('cases_tags.name')
                    ->label('Tags')
                    ->badge()
                    ->separator(', ')
                    ->toggleable(),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ])
            ->groups([
                Group::make('year')
                    ->label('Year')
                    ->collapsible(),

            ]);
    }
}
