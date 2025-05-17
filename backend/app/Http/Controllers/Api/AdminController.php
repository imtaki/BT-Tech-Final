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
        'email' => 'required|email|unique:users,email',
        ]);

        $admin = User::create([
        'email' => $request->email,
        'name' =>  'Admin ' . rand(1000, 9999),
        'role' => 'admin',              
        'password' => bcrypt('test'),
        ]);

        return response()->json(['message' => 'Admin created', 'data' => $admin]);
    }

    public function destroy(User $admin)
    {
        $admin->delete();
        return response()->json(['message' => 'Admin deleted', 'data' => $admin]);
    }
}
