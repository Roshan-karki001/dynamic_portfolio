<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;

class SkillsController extends Controller
{
    // GET /api/admin/skills
    public function index()
    {
        $skills = Skill::all();

        return response()->json([
            'success' => true,
            'message' => 'Skills retrieved successfully.',
            'data' => $skills,
        ], Response::HTTP_OK);
    }

    // POST /api/admin/skills
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string',
            'icon' => 'nullable|image|mimes:png,svg|max:2048',
            'category' => 'nullable|in:frontend developer,backend developer,programming language,Cloud & DevOps',
            'level' => 'nullable|integer|min:0|max:100',
            'certification' => 'nullable|string',
            'tools_and_technology' => 'nullable|string',
        ]);

        if ($request->hasFile('icon')) {
            $iconPath = Storage::put('skills', $request->file('icon'));
            $validated['icon'] = $iconPath;
        }

        $skill = Skill::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Skill created successfully.',
            'data' => $skill,
        ], Response::HTTP_CREATED);
    }

    // GET /api/admin/skills/{id}
    public function show($id)
    {
        $skill = Skill::find($id);

        if (!$skill) {
            return response()->json([
                'success' => false,
                'message' => 'Skill not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'message' => 'Skill retrieved successfully.',
            'data' => $skill,
        ], Response::HTTP_OK);
    }

    // PUT/PATCH /api/admin/skills/{id}
    public function update(Request $request, $id)
    {
        $skill = Skill::find($id);

        if (!$skill) {
            return response()->json([
                'success' => false,
                'message' => 'Skill not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'name' => 'sometimes|required|string',
            'icon' => 'nullable|image|mimes:png,svg|max:2048',
            'category' => 'nullable|in:frontend developer,backend developer,programming language,Cloud & DevOps',
            'level' => 'nullable|integer|min:0|max:100',
            'certification' => 'nullable|string',
            'tools_and_technology' => 'nullable|string',
        ]);

        if ($request->hasFile('icon')) {
            // Delete old icon if exists
            if ($skill->icon && Storage::exists($skill->icon)) {
                Storage::delete($skill->icon);
            }
            $iconPath = Storage::put('skills', $request->file('icon'));
            $validated['icon'] = $iconPath;
        } else {
            unset($validated['icon']);
        }

        $skill->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Skill updated successfully.',
            'data' => $skill,
        ], Response::HTTP_OK);
    }

    // DELETE /api/admin/skills/{id}
    public function destroy($id)
    {
        $skill = Skill::find($id);

        if (!$skill) {
            return response()->json([
                'success' => false,
                'message' => 'Skill not found.',
            ], Response::HTTP_NOT_FOUND);
        }

        if ($skill->icon && Storage::exists($skill->icon)) {
            Storage::delete($skill->icon);
        }

        $skill->delete();

        return response()->json([
            'success' => true,
            'message' => 'Skill deleted successfully.',
        ], Response::HTTP_OK);
    }
}
