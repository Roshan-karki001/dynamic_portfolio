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
        $projects = Project::with('technologies')->get();
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
            'title' => 'required|string|unique:projects,title',
            'image' => 'required|image|mimes:jpeg,jpg,png,svg|max:2048',
            'description' => 'required|string',
            'technologies' => 'required|string',
            'url' => 'nullable|url',
        ]);

        if ($request->hasFile('image')) {
            // Store the new image
            $imagePath = Storage::put('project', $request->file('image'));
            $validated['image'] = $imagePath;
        }

        $project = Project::create($validated);
        $technologies = json_decode($validated['technologies'], true);
        $project->technologies()->sync($technologies);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully.',
            'data' => $project
        ], Response::HTTP_OK);
    }

    // Display the specified project
    public function show($id)
    {
        $project = Project::with('technologies')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Project retrieved successfully.',
            'data' => $project
        ], Response::HTTP_OK);
    }

    // Update the specified project
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|unique:projects,title,' . $id,
            'image' => 'nullable|image|mimes:jpeg,jpg,png,svg|max:2048',
            'description' => 'required|string',
            'technologies' => 'required|string',
            'url' => 'nullable|url',
        ]);

        $project = Project::findOrFail($id);
        if ($request->hasFile('image')) {
            if ($project->image && Storage::exists($project->image)) {
                Storage::delete($project->image);
            }
            // Store the new image
            $imagePath = Storage::put('project', $request->file('image'));
            $validated['image'] = $imagePath;
        } else {
            // Remove image from validated array if not present in the request
            unset($validated['image']);
        }
        $project->update($validated);
        $technologies = json_decode($validated['technologies'], true);
        $project->technologies()->sync($technologies);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully.',
            'data' => $project
        ], Response::HTTP_OK);
    }

    // Remove the specified project
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.',
        ], Response::HTTP_OK);
    }
}
