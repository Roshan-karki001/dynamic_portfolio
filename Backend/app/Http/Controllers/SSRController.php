<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class SSRController extends Controller
{
    public function index($pageName = 'Home')
    {
        // Capitalize the first letter of each word and remove spaces or underscores
        $pageName = ucwords(str_replace(['-', '_', ' '], '', $pageName));

        // Example of valid pages, you can extend this as needed
        $validPages = ['Home', 'Login'];

        // Check if the pageName exists in the list of valid pages
        if (in_array($pageName, $validPages)) {
            return Inertia::render($pageName);
        }
    }
}
