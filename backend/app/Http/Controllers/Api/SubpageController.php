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
            'year' => 'required|integer',
        ]);

        $item = Subpages::create($validate);

        return response()->json(['message' => 'Subpage created', 'data' => $item]);

    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
        ]);

        if (!$request->has('content')) {
            $validated['content'] = '';
        }

        $subpage = Subpages::findorFail($id);

        $subpage->update($validated);

        return response()->json(['message' => 'Subpage updated', 'data' => $subpage]);
    }

    public function destroy(Subpages $subpage) {
        $subpage->delete();
        return response()->json(['message' => 'Subpage deleted', 'data' => $subpage]);
    }
    //
}
