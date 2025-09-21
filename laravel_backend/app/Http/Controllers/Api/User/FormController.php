<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\EmailForm;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FormController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([
            'full_name'            => 'required|string|max:255',
            'work_email'           => 'required|email|max:255',
            'subject'              => 'required|string|max:255',
            'message'               => 'required|string|max:255',
        ]);
        // Save the data to the email_form table
        $emailForm = EmailForm::create($validated);

        // Return a success JSON response
        return response()->json([
            'success' => true,
            'message' => 'Data saved successfully.',
            'data' => $emailForm,
        ], Response::HTTP_CREATED);
    }
}
