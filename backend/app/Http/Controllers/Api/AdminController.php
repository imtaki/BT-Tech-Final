<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Gate;

class AdminController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function index() {
        Gate::authorize('viewAny', User::class);
        $admins = User::where('role','admin' )->get();
        return response()->json($admins);
    }

    public function store(AdminRequest $request)
    {
        Gate::authorize('create', User::class);
        $data = $this->userService->createAdmin($request);
        return response()->json([
            'message' => $data['message'],
            'data' => $data['object']
        ]);
    }

    public function destroy(User $admin)
    {
        Gate::authorize('delete', $admin);
        $admin->delete();
        return response()->json(['message' => 'Admin deleted', 'data' => $admin]);
    }
}
