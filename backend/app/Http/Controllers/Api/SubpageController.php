<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ConferenceYear;
use App\Models\Subpages;
use App\Models\UserConferenceYear;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class SubpageController extends Controller
{
    public function index()
    {
        return response()->json(Subpages::orderByDesc('year')->get());
    }

    public function show($id) {
        $page = Subpages::findOrFail($id);
        return response()->json($page);
    }

    public function store(Request $request) {

        $validate = $request->validate([
            'title' => 'required|string',
            'year' => 'required|integer'
        ]);

        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $subpage = Subpages::create([
           'title' => $validate['title'],
           'year' => $validate['year'],
           'last_editor' => $user->id,
        ]);

        return response()->json(['message' => 'Subpage created', 'data' => $subpage]);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string'
        ]);

        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $subpage = Subpages::findorFail($id);

        $subpage->title = $validated['title'];
        $subpage->content = $validated['content'];
        $subpage->last_editor = $user->id;
        $subpage->save();

        return response()->json(['message' => 'Subpage updated', 'data' => $subpage]);
    }

    public function destroy(Subpages $subpage) {
        $subpage->delete();
        return response()->json(['message' => 'Subpage deleted', 'data' => $subpage]);
    }

    public function byYear($year) {
        $pages = Subpages::where('year', $year)->get();
        return response()->json($pages);
    }

    public function getEditorSubpages() {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $yearid = UserConferenceYear::where('user_id', $user->id)->value('conference_year_id');

        if (!$yearid) {
            return response()->json(['message' => 'No year has been associated.'], 404);
        }

        $year = ConferenceYear::where('id', $yearid)->value('year');

        $subpages = Subpages::where('year', $year)->get();

        return response()->json($subpages);
    }


    public function checkEditorPermission($id)
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $subpage = Subpages::findOrFail($id);

        $yearId = UserConferenceYear::where('user_id', $user->id)->value('conference_year_id');
        if (!$yearId) {
            return response()->json(['message' => 'No year has been associated.'], 404);
        }
        $year = ConferenceYear::where('id', $yearId)->value('year');

        if ($year != $subpage->year) {
            return response()->json(['message' => 'You do not have permission to edit this page.'], 403);
        }

        return response()->json(['message' => "Allowed"]);
    }
    //
}
