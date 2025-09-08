<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Home\Testimonials;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $testimonials = Testimonials::all();
        return response()->json([
            'success' => true,
            'message' => 'Testimonials retrieved successfully',
            'data' => $testimonials
        ], Response::HTTP_OK);

    }
}
