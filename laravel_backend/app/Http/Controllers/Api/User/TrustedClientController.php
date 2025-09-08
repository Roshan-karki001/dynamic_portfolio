<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Home\TrustedClients;

class TrustedClientController extends Controller
{
    public function index(Request $request)
    {
        $trustedClients = TrustedClients::where('is_active', true)->get();

        return response()->json([
            'success' => true,
            'message' => 'TrustedClients retrieved successfully',
            'data' => $trustedClients
        ], Response::HTTP_OK);
    }
}
