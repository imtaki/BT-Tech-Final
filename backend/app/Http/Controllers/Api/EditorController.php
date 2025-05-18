<?php

namespace App\Http\Controllers\api;

use App\Models\ConferenceYear;
use App\Models\User;
use App\Models\UserConferenceYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class EditorController extends Controller
{
    public function index() {
      $editors = User::where('role', 'editor')->with('conferenceYears')->get();
      return response()->json($editors);
    }

    public function store(Request $request)
    {
        $request->validate([
        'email' => 'required|email|unique:users,email',
        'name' => 'required|string|max:255',
        'password' => 'required|string|min:6',
        'conference_year_id' => 'required|exists:conference_years,id',
        ]);

        $editor = User::create([
        'email' => $request->email,
        'name' => $request->name,
        'role' => 'editor',
        'password' => bcrypt($request->password),
        ]);

        $editor->conferenceYears()->attach($request->conference_year_id);

        return response()->json(['message' => 'Editor created', 'data' => $editor]);
    }

    public function update(Request $request, User $editor)
    {
        $request->validate([
            'conferenceYearId' => 'required|exists:conference_years,id',
        ]);

        $editor->conferenceYears()->sync([$request->conferenceYearId]);

        return response()->json(['message' => 'Editor updated', 'data' => $editor->load('conferenceYears')]);
    }

    public function destroy(User $editor)
    {
        $editor->delete();
        return response()->json(['message' => 'Editor deleted', 'data' => $editor]);
    }

    public function getYear() {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($user->role == "admin") {
            return response()->json(['message' => 'All']);
        } else if($user->role == "editor") {
            $yearId = UserConferenceYear::where("user_id", $user->id)->value("conference_year_id");
            $year = ConferenceYear::find($yearId);
            return response()->json($year);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
