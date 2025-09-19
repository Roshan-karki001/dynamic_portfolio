<?php

namespace App\Filament\Resources\Home\TrustedClients;

use App\Filament\Resources\Home\TrustedClients\Pages\CreateTrustedClients;
use App\Filament\Resources\Home\TrustedClients\Pages\EditTrustedClients;
use App\Filament\Resources\Home\TrustedClients\Pages\ListTrustedClients;
use App\Filament\Resources\Home\TrustedClients\Pages\ViewTrustedClients;
use App\Filament\Resources\Home\TrustedClients\Schemas\TrustedClientsForm;
use App\Filament\Resources\Home\TrustedClients\Schemas\TrustedClientsInfolist;
use App\Filament\Resources\Home\TrustedClients\Tables\TrustedClientsTable;
use App\Models\Home\TrustedClients;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class TrustedClientsResource extends Resource
{

    protected static ?int $navigationSort = 1;

    protected static ?string $model = TrustedClients::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserGroup;

    protected static ?string $recordTitleAttribute = 'TrustedClients';

    protected static string | UnitEnum | null $navigationGroup = 'Home';

    protected static ?string $slug = 'home/trustedclients';



    public static function form(Schema $schema): Schema
    {
        return TrustedClientsForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TrustedClientsInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TrustedClientsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTrustedClients::route('/'),
            'create' => CreateTrustedClients::route('/create'),
            'view' => ViewTrustedClients::route('/{record}'),
            'edit' => EditTrustedClients::route('/{record}/edit'),
        ];
    }
}
