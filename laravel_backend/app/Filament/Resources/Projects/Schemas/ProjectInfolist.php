<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ProjectInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('project_logo'),
                TextEntry::make('title'),
                TextEntry::make('slug'),
                TextEntry::make('date'),
                TextEntry::make('done_by'),
                TextEntry::make('code_link'),
                TextEntry::make('demo_link'),
                TextEntry::make('status'),
                IconEntry::make('is_active')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
