<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            // Validate request data
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
                'remember' => 'nullable|boolean', // Add validation for "remember me"
            ]);

            // Check if remember me is requested
            $remember = $request->input('remember', false);

            // Check if the user exists
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'email' => ['Email not found.'],
                    ],
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Check if the password matches
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'password' => ['Password not matched.'],
                    ],
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Generate a token for the user
            $scope =  ['admin'];
            $token = $user->createToken('Authentication', $scope)->accessToken;

            return response()->json([
                'success' => true,
                'token' => $token,
                'name' => $user->name,
                'email' => $user->email,
                'role' => 'admin',
                'remember' => $remember,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'exception' => $e->getMessage(),
                ],
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
