<?php

namespace App\Filament\Resources\SkillExperties\Skills\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Schema;

class SkillForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('skill_name')
                    ->required(),
                FileUpload::make('skill_icon')
                    ->label('skill_icon')
                    ->image()
                    ->disk('public')
                    ->directory('skill_icons')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->maxSize(2024)
                    ->imagePreviewHeight('150'),

                Select::make('level')
                    ->options([
                        'beginner' => 'Beginner',
                        'junior_developer' => 'Junior developer',
                        'intermediate' => 'Intermediate',
                        'advanced' => 'Advanced',
                        'proficient' => 'Proficient',
                        'expert' => 'Expert',
                    ])
                    ->required(),


                Select::make('title')
                    ->options([
                        'frontend' => 'Frontend',
                        'backend' => 'Backend',
                        'programming_language' => 'Programming Language',
                        'database' => 'Database',
                        'tools' => 'Tools',
                        'cloud_devops' => 'Cloud DevOps',
                    ])
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set) {
                        // Map title to icon
                        $iconMap = [
                            'frontend' => 'monitor',
                            'backend' => 'server',
                            'programming_language' => 'code-2',
                            'database' => 'database',
                            'tools' => 'wrench',
                            'cloud_devops' => 'cloud',
                        ];

                        // Set title_icon based on title
                        if (isset($iconMap[$state])) {
                            $set('title_icon', $iconMap[$state]);
                        }
                    }),

                Select::make('title_icon')
                    ->options([
                        'monitor' => 'Monitor',
                        'server' => 'Server',
                        'code-2' => 'Code 2',
                        'database' => 'Database',
                        'cloud' => 'Cloud',
                        'wrench' => 'Wrench',
                    ])
                    ->default('code-2')
                    ->disabled(),


                
                
            ]);
    }
}
