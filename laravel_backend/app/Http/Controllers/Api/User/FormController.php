<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\EmailForm;
use App\Models\User;
use App\Notifications\NewEmailFormSubmitted;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FormController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'  => 'required|string|max:255',
            'work_email' => 'required|email|max:255',
            'subject'    => 'required|string|max:255',
            'message'    => 'required|string|max:255',
        ]);

        $emailForm = EmailForm::create($validated);

        // ✅ Notify the only user
        $user = User::find(1); // or use where('email', ...) as shown above
        if ($user) {
            $user->notify(new NewEmailFormSubmitted($emailForm));
        }

        return response()->json([
            'success' => true,
            'message' => 'Form submitted and notification sent.',
            'data'    => $emailForm,
        ], Response::HTTP_CREATED);
    }
}
