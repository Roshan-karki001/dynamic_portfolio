<?php

namespace App\Filament\Resources\SkillExperties\Skills;

use App\Filament\Resources\SkillExperties\Skills\Pages\CreateSkill;
use App\Filament\Resources\SkillExperties\Skills\Pages\EditSkill;
use App\Filament\Resources\SkillExperties\Skills\Pages\ListSkills;
use App\Filament\Resources\SkillExperties\Skills\Pages\ViewSkill;
use App\Filament\Resources\SkillExperties\Skills\Schemas\SkillForm;
use App\Filament\Resources\SkillExperties\Skills\Schemas\SkillInfolist;
use App\Filament\Resources\SkillExperties\Skills\Tables\SkillsTable;
use App\Models\SkillExperties\Skill;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SkillResource extends Resource
{
    protected static ?string $model = Skill::class;

    protected static string | UnitEnum | null $navigationGroup = 'Skill Experties';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack ;

    protected static ?int $navigationSort =-5; 

    protected static ?string $recordTitleAttribute = 'Skill';

    public static function form(Schema $schema): Schema
    {
        return SkillForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SkillInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SkillsTable::configure($table);
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
            'index' => ListSkills::route('/'),
            'create' => CreateSkill::route('/create'),
            'view' => ViewSkill::route('/{record}'),
            'edit' => EditSkill::route('/{record}/edit'),
        ];
    }
}
