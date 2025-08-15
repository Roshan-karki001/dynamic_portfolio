<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PortfolioController extends Controller
{
    public function userDetails()
    {
        $user = User::firstOrFail();
        return response()->json([
            'success' => true,
            'message' => 'User Details fetched successfully.',
            'data' => $user
        ], Response::HTTP_OK);
    }

    public function technologies()
    {
        $technologies = Technology::select('id', 'name', 'icon')->get();
        return response()->json([
            'success' => true,
            'message' => 'Technologies fetched successfully.',
            'data' => $technologies
        ], Response::HTTP_OK);
    }

    public function projects()
    {
        $projects = Project::select('id', 'title', 'image', 'description', 'url')->with('technologies')->get();
        return response()->json([
            'success' => true,
            'message' => 'Projects fetched successfully.',
            'data' => $projects
        ], Response::HTTP_OK);
    }


    public function message(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'contact_number' => 'required|string|max_digits:10',
            'email' => 'required|email',
            'message' => 'required|string'
        ]);

        $contactMessage = ContactMessage::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully.',
            'data' => $contactMessage
        ], Response::HTTP_OK);
    }
}
