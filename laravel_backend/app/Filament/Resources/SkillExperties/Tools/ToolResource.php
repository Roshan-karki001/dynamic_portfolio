<?php

namespace App\Filament\Resources\SkillExperties\Tools;

use App\Filament\Resources\SkillExperties\Tools\Pages\CreateTool;
use App\Filament\Resources\SkillExperties\Tools\Pages\EditTool;
use App\Filament\Resources\SkillExperties\Tools\Pages\ListTools;
use App\Filament\Resources\SkillExperties\Tools\Pages\ViewTool;
use App\Filament\Resources\SkillExperties\Tools\Schemas\ToolForm;
use App\Filament\Resources\SkillExperties\Tools\Schemas\ToolInfolist;
use App\Filament\Resources\SkillExperties\Tools\Tables\ToolTable;
use App\Models\SkillExperties\Tool;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ToolResource extends Resource
{
    protected static ?string $model = Tool::class;

    protected static string | UnitEnum | null $navigationGroup = 'Skill Experties';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::Cog6Tooth;

     protected static ?int $navigationSort = 3; 

    protected static ?string $recordTitleAttribute = 'Tool';

    public static function form(Schema $schema): Schema
    {
        return ToolForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ToolInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ToolTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTools::route('/'),
            'create' => CreateTool::route('/create'),
            'view' => ViewTool::route('/{record}'),
            'edit' => EditTool::route('/{record}/edit'),
        ];
    }
}
