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

    public function store(Request $request) {

        $validate = $request->validate([
            'title' => 'required|string',
            'year' => 'required|integer',
        ]);

        $item = Subpages::create($validate);

        return response()->json(['message' => 'Subpage created', 'data' => $item]);

    }

    public function destroy(Subpages $subpage) {
        $subpage->delete();
        return response()->json(['message' => 'Subpage deleted', 'data' => $subpage]);
    }
    //
}
