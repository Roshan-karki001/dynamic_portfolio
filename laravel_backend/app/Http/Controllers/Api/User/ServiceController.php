<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();

        return response()->json([
            'success' => true,
            'message' => 'Services retrieved successfully',
            'data' => $services
        ], Response::HTTP_OK);
    }

    public function show($slug)
    {
        $service = Service::with(['works.outcomes', 'images'])
            ->where('slug', $slug)
            // ->where('is_active', true)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Service fetched successfully',
            'data' => $service
        ], Response::HTTP_OK);
    }
}
