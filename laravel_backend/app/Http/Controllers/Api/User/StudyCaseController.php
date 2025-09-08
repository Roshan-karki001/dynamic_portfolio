<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\StudyCase\CaseStudy;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StudyCaseController extends Controller
{
    public function index(Request $request)
    {
        $caseStudies = CaseStudy::with(['works.outcomes', 'images'])
        ->get();
        // ->where('is_active', true);

        return response()->json([
            'success' => true,
            'message' => 'Case studies retrieved successfully',
            'data' => $caseStudies
        ], Response::HTTP_OK);
    }

    public function show($slug)
{
    $caseStudy = CaseStudy::with(['works.outcomes', 'images'])
        ->where('slug', $slug)
        // ->where('is_active', true)
        ->firstOrFail();

    return response()->json([
        'success' => true,
        'message' => 'Case study fetched successfully',
        'data' => $caseStudy
    ], Response::HTTP_OK);
}

}
