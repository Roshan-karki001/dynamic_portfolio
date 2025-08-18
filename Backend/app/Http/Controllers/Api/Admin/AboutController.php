<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AboutController extends Controller
{
    // GET /api/admin/abouts
    public function index()
    {
        $abouts = About::all();

        return response()->json([
            'success' => true,
            'message' => 'Abouts retrieved successfully.',
            'data' => $abouts,
        ], Response::HTTP_OK);
    }

    // POST /api/admin/abouts
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'mystory' => 'required|string',
            'education' => 'nullable|json',
            'hobby' => 'nullable|json',
            'achievements' => 'nullable|json',
        ]);

        $about = About::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'About created successfully.',
            'data' => $about,
        ], Response::HTTP_CREATED);
    }

    // GET /api/admin/abouts/{id}
    public function show($id)
    {
        $about = About::find($id);

        if (!$about) {
            return response()->json([
                'success' => false,
                'message' => 'About not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'About retrieved successfully.',
            'data' => $about,
        ], Response::HTTP_OK);
    }

    // PUT/PATCH /api/admin/abouts/{id}
    public function update(Request $request, $id)
    {
        $about = About::find($id);

        if (!$about) {
            return response()->json([
                'success' => false,
                'message' => 'About not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'mystory' => 'sometimes|required|string',
            'education' => 'nullable|json',
            'hobby' => 'nullable|json',
            'achievements' => 'nullable|json',
        ]);

        $about->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'About updated successfully.',
            'data' => $about,
        ], Response::HTTP_OK);
    }

    // DELETE /api/admin/abouts/{id}
    public function destroy($id)
    {
        $about = About::find($id);

        if (!$about) {
            return response()->json([
                'success' => false,
                'message' => 'About not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        $about->delete();

        return response()->json([
            'success' => true,
            'message' => 'About deleted successfully.',
        ], Response::HTTP_OK);
    }
}
