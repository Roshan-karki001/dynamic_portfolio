<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ProjectController extends Controller
{
    // Display a listing of the projects
    public function index()
    {
        $projects = Project::all();

        return response()->json([
            'success' => true,
            'message' => 'Projects retrieved successfully.',
            'data' => $projects
        ], Response::HTTP_OK);
    }

    // Store a newly created project
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|unique:projects,title',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,svg|max:2048',
            'tech' => 'nullable|array',
            'tech.*' => 'string',
            'category' => 'nullable|string',
            'status' => 'nullable|in:completed,in-progress',
            'github' => 'nullable|url',
            'demo' => 'nullable|url',
            'date' => 'nullable|string',
            'team' => 'nullable|string',
            'highlights' => 'nullable|array',
            'highlights.*' => 'string',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = Storage::put('projects', $request->file('image'));
            $validated['image'] = $imagePath;
        }

        // Store JSON arrays properly
        if (isset($validated['tech'])) {
            $validated['tech'] = json_encode($validated['tech']);
        }
        if (isset($validated['highlights'])) {
            $validated['highlights'] = json_encode($validated['highlights']);
        }

        $project = Project::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully.',
            'data' => $project
        ], Response::HTTP_CREATED);
    }

    // Display the specified project
    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        // Decode JSON fields before returning
        $project->tech = $project->tech ? json_decode($project->tech) : [];
        $project->highlights = $project->highlights ? json_decode($project->highlights) : [];

        return response()->json([
            'success' => true,
            'message' => 'Project retrieved successfully.',
            'data' => $project
        ], Response::HTTP_OK);
    }

    // Update the specified project
    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'title' => 'sometimes|required|string|unique:projects,title,' . $id,
            'description' => 'sometimes|required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,svg|max:2048',
            'tech' => 'nullable|array',
            'tech.*' => 'string',
            'category' => 'nullable|string',
            'status' => 'nullable|in:completed,in-progress',
            'github' => 'nullable|url',
            'demo' => 'nullable|url',
            'date' => 'nullable|string',
            'team' => 'nullable|string',
            'highlights' => 'nullable|array',
            'highlights.*' => 'string',
        ]);

        if ($request->hasFile('image')) {
            if ($project->image && Storage::exists($project->image)) {
                Storage::delete($project->image);
            }
            $imagePath = Storage::put('projects', $request->file('image'));
            $validated['image'] = $imagePath;
        } else {
            unset($validated['image']);
        }

        if (isset($validated['tech'])) {
            $validated['tech'] = json_encode($validated['tech']);
        }
        if (isset($validated['highlights'])) {
            $validated['highlights'] = json_encode($validated['highlights']);
        }

        $project->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully.',
            'data' => $project
        ], Response::HTTP_OK);
    }

    // Remove the specified project
    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        if ($project->image && Storage::exists($project->image)) {
            Storage::delete($project->image);
        }

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.',
        ], Response::HTTP_OK);
    }
}
