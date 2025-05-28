<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConferenceYearRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\ConferenceYear;
use Illuminate\Support\Facades\Gate;

class ConferenceYearController extends Controller
{
    public function index()
    {
        return response()->json(ConferenceYear::orderByDesc('year')->get());
    }

    public function store(ConferenceYearRequest $request)
    {
        Gate::authorize('create', User::class);
        $year = ConferenceYear::create($request->only('year'));
        return response()->json($year, 201);
    }

    public function destroy(ConferenceYear $conferenceYear)
    {
        Gate::authorize('removeConferenceYear', User::class);
        $conferenceYear->delete();
        return response()->json(null, 204);
    }
}

