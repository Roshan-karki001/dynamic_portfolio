<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FaqController extends Controller
{
    public function index()
    {
        $faqs = Faq::where('is_active',true)->get();

        return response()->json([
            'success' => true,
            'message' => 'FAQs retrieved successfully',
            'data' => $faqs
        ], Response::HTTP_OK);
    }
}
