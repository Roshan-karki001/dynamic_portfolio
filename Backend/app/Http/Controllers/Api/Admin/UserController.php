<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function getInfo()
    {
        $user = auth()->user();
        return response()->json([
            'success' => true,
            'message' => 'Personal information fetched successfully.',
            'data' => $user
        ], Response::HTTP_OK);
    }

    public function updatePersonalInfo(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:10',
            'email' => 'required|email|max:255',
            'address' => 'required|max:50',
            'bio' => 'nullable',
        ]);

        // Assuming the authenticated user
        $user = auth()->user();

        $user->update([
            'name' => $request->input('name'),
            'contact_number' => $request->input('contact_number'),
            'email' => $request->input('email'),
            'address' => $request->input('address'),
            'bio' => $request->input('bio'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Personal information updated successfully.',
        ], Response::HTTP_OK);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->input('current_password'), $user->password)) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'current_password' => ['Current password is incorrect.']
                ]
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->update([
            'password' => Hash::make($request->input('new_password')),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully.',
        ], Response::HTTP_OK);
    }

    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $user = auth()->user();

        if ($user->profile_picture && Storage::exists($user->profile_picture)) {
            Storage::delete($user->profile_picture); // Delete old profile picture
        }

        $path = Storage::put('user', $request->file('profile_picture'));

        $user->update([
            'profile_picture' => $path,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profile photo updated successfully.',
        ], Response::HTTP_OK);
    }

    public function updateSocialMediaLinks(Request $request)
    {
        $request->validate([
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'whatsapp' => 'nullable|string|max:15',
            'linkedin' => 'nullable|url',
        ]);

        $socialLinks = [
            'facebook' => $request->facebook,
            'instagram' => $request->instagram,
            'whatsapp' => $request->whatsapp,
            'linkedin' => $request->linkedin,
        ];

        $user = auth()->user();
        $user->update(['social_links' => $socialLinks]);

        return response()->json([
            'success' => true,
            'message' => 'Social media links updated successfully'
        ], Response::HTTP_OK);
    }
}
