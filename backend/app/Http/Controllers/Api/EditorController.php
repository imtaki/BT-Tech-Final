<?php

namespace App\Http\Controllers\api;

use App\Http\Requests\EditorConferenceYearUpdateRequest;
use App\Http\Requests\EditorRequest;
use App\Models\ConferenceYear;
use App\Models\User;
use App\Models\UserConferenceYear;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class EditorController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function index() {
      $editors = User::where('role', 'editor')->with('conferenceYears')->get();
      return response()->json($editors);
    }

    public function store(EditorRequest $request)
    {
        Gate::authorize('create', User::class);
        $data = $this->userService->createEditor($request);
        return response()->json(['message' => $data['message'], 'data' => $data['object']]);
    }

    public function update(EditorConferenceYearUpdateRequest $request, User $editor)
    {
        Gate::authorize('update', $editor);
        $data = $this->userService->updateEditorConferenceYear($request, $editor);
        return response()->json(['message' => $data['message'], 'data' => $data['object']]);
    }

    public function destroy(User $editor)
    {
        Gate::authorize('delete', $editor);
        $editor->delete();
        return response()->json(['message' => 'Editor deleted', 'data' => $editor]);
    }

    public function getYear() {
        $data = $this->userService->getEditorYear();
        if (!$data['success']) {
            return response()->json(['message' => $data['message']], 401);
        }
        return response()->json(['message' => $data['message']]);
    }
}
