<?php

use App\Livewire\Form;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

Route::get('form', Form::class);

Route::redirect('login-redirect', 'login')->name('login');

Route::view('/resume', 'resume');

Route::get('/download-resume', function () {
    $filePath = public_path('resume.png'); // change extension if needed

    if (!file_exists($filePath)) {
        abort(404, 'File not found');
    }

    return response()->download($filePath, 'My_Resume.png', [
        'Content-Type' => 'image/png', // change if .jpg -> image/jpeg
        'Content-Disposition' => 'attachment; filename="My_Resume.png"',
    ]);
});