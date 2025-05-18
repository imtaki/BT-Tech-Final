<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EditorController extends Controller
{
    public function index() {
      $editors = User::where('role', 'editor')->get();
      return response()->json($editors);
    }

    public function store(Request $request)
    {
        $request->validate([
        'email' => 'required|email|unique:users,email',
        'name' => 'required|string|max:255',
        'password' => 'required|string|min:6',
        ]);

        $editor = User::create([
        'email' => $request->email,
        'name' => $request->name,
        'role' => 'editor',             
        'password' => bcrypt($request->password),
        ]);

        return response()->json(['message' => 'Editor created', 'data' => $editor]);
    }

    public function destroy(User $editor)
    {
        $editor->delete();
        return response()->json(['message' => 'Editor deleted', 'data' => $editor]);
    }
}
