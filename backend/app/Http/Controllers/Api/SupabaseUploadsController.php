<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupabaseUpload;
use Illuminate\Http\Request;

class SupabaseUploadsController extends Controller
{
    /**
     * Display a listing of the Supabase uploads.
     */
    public function index()
    {
        return SupabaseUpload::latest()->get();
    }

    /**
     * Store metadata for a Supabase-uploaded file.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'path' => 'required|string',
            'url' => 'required|url',
            'size' => 'required|integer',
        ]);

        $user = auth('api')->user();

        if (!$user || !in_array($user->role, ['admin', 'editor'])) {
            return response()->json(["message" => "Unauthorized"], 401);
        }

        $upload = SupabaseUpload::create([
            'name' => $validated['name'],
            'path' => $validated['path'],
            'url'  => $validated['url'],
            'size' => $validated['size'],
            'user_id' => $user->id,
        ]);

        return response()->json(['file' => $upload], 201);
    }

    /**
     * Delete an upload record.
     */
    public function destroy(SupabaseUpload $upload)
    {
        $user = auth('api')->user();

        if (!$user || $user->id !== $upload->user_id) {
            return response()->json(["message" => "Forbidden"], 403);
        }

        $upload->delete();

        return response()->json(["message" => "Deleted"]);
    }
}

