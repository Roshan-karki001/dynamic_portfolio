<?php

namespace Database\Seeders;


use App\Models\Address;
use App\Models\Blog\Author;
use App\Models\Blog\Category as BlogCategory;
use App\Models\Blog\Link;
use App\Models\Blog\Post;
use App\Models\Comment;

use App\Models\User;
use Closure;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Console\Helper\ProgressBar;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::raw('SET time_zone=\'+00:00\'');

        // Clear images
        Storage::deleteDirectory('public');

        // Admin
        $this->command->warn(PHP_EOL . 'Creating admin user...');
        $user = $this->withProgressBar(1, fn () => User::factory(1)->create([
            'name' => 'Roshan Karki',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
        ]));
        $this->command->info('Admin user created.');

        // Blog
        // $this->command->warn(PHP_EOL . 'Creating blog categories...');
        // $blogCategories = $this->withProgressBar(20, fn () => BlogCategory::factory(1)
        //     ->count(20)
        //     ->create());
        // $this->command->info('Blog categories created.');

        // $this->command->warn(PHP_EOL . 'Creating blog authors and posts...');
        // $this->command->info('Blog authors and posts created.');

        // $this->command->warn(PHP_EOL . 'Creating blog links...');
        // $this->withProgressBar(20, fn () => Link::factory(1)
        //     ->count(20)
        //     ->create());
        // $this->command->info('Blog links created.');
    }

    protected function withProgressBar(int $amount, Closure $createCollectionOfOne): Collection
    {
        $progressBar = new ProgressBar($this->command->getOutput(), $amount);

        $progressBar->start();

        $items = new Collection;

        foreach (range(1, $amount) as $i) {
            $items = $items->merge(
                $createCollectionOfOne()
            );
            $progressBar->advance();
        }

        $progressBar->finish();

        $this->command->getOutput()->writeln('');

        return $items;
    }
}
