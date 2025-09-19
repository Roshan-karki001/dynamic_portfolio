<?php

namespace App\Filament\Resources\Home\Testimonials;

use App\Filament\Resources\Home\Testimonials\Pages\CreateTestimonials;
use App\Filament\Resources\Home\Testimonials\Pages\EditTestimonials;
use App\Filament\Resources\Home\Testimonials\Pages\ListTestimonials;
use App\Filament\Resources\Home\Testimonials\Pages\ViewTestimonials;
use App\Filament\Resources\Home\Testimonials\Schemas\TestimonialForm;
use App\Filament\Resources\Home\Testimonials\Schemas\TestimonialInfolist;
use App\Filament\Resources\Home\Testimonials\Tables\TestimonialsTable;
use App\Models\Home\Testimonials;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use BackedEnum;
use UnitEnum;

class TestimonialsResource extends Resource   // ✅ Match file name
{
    protected static ?string $model = Testimonials::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChatBubbleLeftRight;

    protected static string|UnitEnum|null $navigationGroup = 'Home';

    protected static ?string $recordTitleAttribute = 'name'; // ✅ must exist in DB table

    protected static ?string $slug = 'home/testimonials';
    
    protected static ?int $navigationSort = 2; 

    public static function form(Schema $schema): Schema
    {
        return TestimonialForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TestimonialInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TestimonialsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTestimonials::route('/'),
            'create' => CreateTestimonials::route('/create'),
            'view' => ViewTestimonials::route('/{record}'),
            'edit' => EditTestimonials::route('/{record}/edit'),
        ];
    }
}
