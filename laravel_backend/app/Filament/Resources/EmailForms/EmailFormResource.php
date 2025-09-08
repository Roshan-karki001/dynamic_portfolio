<?php

namespace App\Filament\Resources\EmailForms;

use App\Filament\Resources\EmailForms\Pages\CreateEmailForm;
use App\Filament\Resources\EmailForms\Pages\EditEmailForm;
use App\Filament\Resources\EmailForms\Pages\ListEmailForms;
use App\Filament\Resources\EmailForms\Schemas\EmailFormForm;
use App\Filament\Resources\EmailForms\Tables\EmailFormsTable;
use App\Models\EmailForm;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Forms\Form;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class EmailFormResource extends Resource
{
    protected static ?string $model = EmailForm::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $recordTitleAttribute = 'full_name';

    public static function form(Schema $schema): Schema
    {
        return EmailFormForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return EmailFormsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListEmailForms::route('/'),
            'create' => CreateEmailForm::route('/create'),
            'edit' => EditEmailForm::route('/{record}/edit'),
        ];
    }
}
