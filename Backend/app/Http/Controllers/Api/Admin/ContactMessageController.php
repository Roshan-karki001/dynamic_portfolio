<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Symfony\Component\HttpFoundation\Response;

class ContactMessageController extends Controller
{
    // Display a listing of the contact messages
    public function index()
    {
        $messages = ContactMessage::all();
        return response()->json([
            'success' => true,
            'message' => 'Contact Messages retrieved successfully.',
            'data' => $messages
        ], Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $message = ContactMessage::find($id);
        if ($message) {
            $message->delete();
            return response()->json([
                'success' => true,
                'message' => 'Contact Message deleted successfully.',
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Contact Message not found.',
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
