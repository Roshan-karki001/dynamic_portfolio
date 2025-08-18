<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EducationController extends Controller
{
    // GET /api/admin/educations
    public function index()
    {
        $educations = Education::all();

        return response()->json([
            'success' => true,
            'message' => 'Educations retrieved successfully.',
            'data' => $educations,
        ], Response::HTTP_OK);
    }

    // POST /api/admin/educations
    public function store(Request $request)
    {
        $validated = $request->validate([
            'about_id' => 'required|exists:abouts,id',
            'degree' => 'nullable|string',
            'school' => 'nullable|string',
            'year' => 'nullable|string',
            'gpa' => 'nullable|string',
            'description' => 'nullable|string',
            'isactive' => 'boolean',
        ]);

        $education = Education::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Education created successfully.',
            'data' => $education,
        ], Response::HTTP_CREATED);
    }

    // GET /api/admin/educations/{id}
    public function show($id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json([
                'success' => false,
                'message' => 'Education not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Education retrieved successfully.',
            'data' => $education,
        ], Response::HTTP_OK);
    }

    // PUT/PATCH /api/admin/educations/{id}
    public function update(Request $request, $id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json([
                'success' => false,
                'message' => 'Education not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'about_id' => 'sometimes|required|exists:abouts,id',
            'degree' => 'nullable|string',
            'school' => 'nullable|string',
            'year' => 'nullable|string',
            'gpa' => 'nullable|string',
            'description' => 'nullable|string',
            'isactive' => 'boolean',
        ]);

        $education->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Education updated successfully.',
            'data' => $education,
        ], Response::HTTP_OK);
    }

    // DELETE /api/admin/educations/{id}
    public function destroy($id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json([
                'success' => false,
                'message' => 'Education not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        $education->delete();

        return response()->json([
            'success' => true,
            'message' => 'Education deleted successfully.',
        ], Response::HTTP_OK);
    }
}
