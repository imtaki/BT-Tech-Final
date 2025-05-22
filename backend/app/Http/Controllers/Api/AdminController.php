<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index() {
        $admins = User::where('role','admin' )->get();
        return response()->json($admins);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|min:2',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'admin',
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'message' => 'Admin created',
            'data' => $admin
        ]);
    }

    public function destroy(User $admin)
    {
        if (auth()->id() == $admin->id) {
            return response()->json(['error' => 'Nemôžete odstrániť sami seba.'], 403);
        }
        $admin->delete();
        return response()->json(['message' => 'Admin deleted', 'data' => $admin]);
    }
}
