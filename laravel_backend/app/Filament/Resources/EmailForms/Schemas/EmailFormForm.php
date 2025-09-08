<?php

namespace App\Filament\Resources\EmailForms\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class EmailFormForm
{
    public static function configure(Schema $form): Schema
    {
        return $form->schema([
            TextInput::make('full_name')
                ->label('Full Name')
                ->disabled(),

            TextInput::make('work_email')
                ->label('Work Email')
                ->disabled(),

            TextInput::make('service')
                ->label('Service')
                ->disabled(),

            TextInput::make('budget')
                ->label('Budget')
                ->disabled(),

            TextInput::make('heard_from')
                ->label('Heard From')
                ->disabled(),

            Textarea::make('project_description')
                ->label('Project Description')
                ->disabled(),

            // Editable fields (admin can change these)
            Textarea::make('remarks')
                ->label('Remarks')
                ->nullable()
                ->maxLength(1000),

            Select::make('status')
                ->label('Status')
                ->options([
                    'attended' => 'Attended',
                    'not attended' => 'Not Attended',
                ])
                ->required(),
        ]);
    }
}
