<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('is_active',true)->get();

        return response()->json([
            'success' => true,
            'message' => 'About retrieved successfully',
            'data' => $projects
        ], Response::HTTP_OK);
    }
}
