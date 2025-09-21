<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\SkillExperties\Skill;
use App\Models\SkillExperties\Tool;
use Symfony\Component\HttpFoundation\Response;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::all();
        $tools  = Tool::all();

        return response()->json([
            'success' => true,
            'message' => 'Skills and Tools retrieved successfully',
            'data' => [
                'skills' => $skills,
                'tools'  => $tools,
            ]
        ], Response::HTTP_OK);
    }
}
