<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class UploadsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Upload::class);
        $uploads = Upload::all();
        return response()->json($uploads);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create', Upload::class);
        $validated = $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,doc,docx,pdf|max:2048',
        ]);
        $user = auth('api')->user();
        if (!$user || ($user->role != "admin" && $user->role != "editor")) {
            return response()->json(["message" => "Unauthenticated."], 401);
        }
        $file = $validated['file'];
        $path = $file->store('uploads', 'public');
        $newUpload = Upload::create([
            'path' => $path,
            'user_id' => $user->id,
            'name' => $file->getClientOriginalName(),
        ]);
        return response()->json(["file" => $newUpload]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Upload $upload)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Upload $upload)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Upload $upload)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Upload $upload)
    {
        Gate::authorize('delete', Upload::class);
        Storage::disk("public")->delete($upload->path);
        $upload->delete();
        return response()->json(['message' => 'File deleted', 'data' => $upload]);
    }
}
