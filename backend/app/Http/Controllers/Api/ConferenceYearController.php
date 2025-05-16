<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ConferenceYear;

class ConferenceYearController extends Controller
{
    public function index()
    {
        return response()->json(ConferenceYear::orderByDesc('year')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|digits:4|integer|unique:conference_years,year',
        ]);

        $year = ConferenceYear::create($request->only('year'));
        return response()->json($year, 201);
    }

    public function show(ConferenceYear $conferenceYear)
    {
        return response()->json($conferenceYear);
    }

    public function update(Request $request, ConferenceYear $conferenceYear)
    {
        $request->validate([
            'year' => 'required|digits:4|integer|unique:conference_years,year,' . $conferenceYear->id,
        ]);

        $conferenceYear->update($request->only('year'));
        return response()->json($conferenceYear);
    }

    public function destroy(ConferenceYear $conferenceYear)
    {
        $conferenceYear->delete();
        return response()->json(null, 204);
    }
}

