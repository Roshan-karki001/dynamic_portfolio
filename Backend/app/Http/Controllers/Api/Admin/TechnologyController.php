<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;

class TechnologyController extends Controller
{
    // Display a listing of the technologies
    public function index()
    {
        $technologies = Technology::all();
        return response()->json([
            'success' => true,
            'message' => 'Technologies retrieved successfully.',
            'data' => $technologies
        ], Response::HTTP_OK);
    }

    // Store a newly created technology
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:technologies,name',
            'icon' => 'nullable|image|mimes:png,svg|max:2048',
        ]);

        if ($request->hasFile('icon')) {
            // Store the new icon
            $iconPath = Storage::put('technology', $request->file('icon'));
            $validated['icon'] = $iconPath;
        }

        $technology = Technology::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Technology created successfully.',
            'data' => $technology
        ], Response::HTTP_OK);
    }

    // Display the specified technology
    public function show($id)
    {
        $technology = Technology::findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Technology retrieved successfully.',
            'data' => $technology
        ], Response::HTTP_OK);
    }

    // Update the specified technology
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:technologies,name,' . $id,
            'icon' => 'nullable|image|mimes:png,svg|max:2048',
        ]);

        $technology = Technology::findOrFail($id);
        if ($request->hasFile('icon')) {
            if ($technology->icon && Storage::exists($technology->icon)) {
                Storage::delete($technology->icon);
            }
            // Store the new icon
            $iconPath = Storage::put('technology', $request->file('icon'));
            $validated['icon'] = $iconPath;
        } else {
            // Remove image from validated array if not present in the request
            unset($validated['icon']);
        }
        $technology->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Technology updated successfully.',
            'data' => $technology
        ], Response::HTTP_OK);
    }

    // Remove the specified technology
    public function destroy($id)
    {
        $technology = Technology::findOrFail($id);
        $technology->delete();

        return response()->json([
            'success' => true,
            'message' => 'Technology deleted successfully.',
        ], Response::HTTP_OK);
    }
}
