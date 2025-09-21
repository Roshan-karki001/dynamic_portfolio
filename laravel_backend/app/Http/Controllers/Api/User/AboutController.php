<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AboutController extends Controller
{
    public function index()
    {
        $abouts = About::with('education')->get();

        return response()->json([
            'success' => true,
            'message' => 'About retrieved successfully',
            'data' => $abouts
        ], Response::HTTP_OK);
    }
}
