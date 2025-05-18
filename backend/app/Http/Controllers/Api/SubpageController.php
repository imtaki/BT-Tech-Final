<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subpages;
use Illuminate\Http\Request;

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
    //
}
