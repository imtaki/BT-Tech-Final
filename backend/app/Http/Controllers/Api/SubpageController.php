<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubPageRequest;
use App\Http\Requests\SubPageUpdateRequest;
use App\Models\ConferenceYear;
use App\Models\Subpages;
use App\Models\UserConferenceYear;
use App\Services\SubpagesService;
use Illuminate\Support\Facades\Gate;

class SubpageController extends Controller
{
    public function __construct(SubpagesService $subpagesService)
    {
        $this->subpagesService = $subpagesService;
    }
    public function index()
    {
        return response()->json(Subpages::orderByDesc('year')->get());
    }

    public function show($id) {
        $page = Subpages::findOrFail($id);
        return response()->json($page);
    }

    public function store(SubPageRequest $request) {
        Gate::authorize('create', [Subpages::class, $request['year']]);
        $data = $this->subpagesService->createSubpage($request);
        if (!$data['success']) {
            return response()->json(['message' => $data['message']], 400);
        }
        return response()->json(['message' => $data['message'], 'data' => $data['object']]);
    }

    public function update(SubPageUpdateRequest $request, $id) {
        $subpage = Subpages::findorFail($id);
        Gate::authorize('update', $subpage);
        $data = $this->subpagesService->updateSubpage($request, $subpage);
        if (!$data['success']) {
            return response()->json(['message' => $data['message']], 409);
        }
        return response()->json(['message' => $data['message'], 'data' => $data['object']]);
    }

    public function destroy(Subpages $subpage) {
        Gate::authorize('delete', $subpage);
        $subpage->delete();
        return response()->json(['message' => 'Subpage deleted', 'data' => $subpage]);
    }

    public function getEditorSubpages() {
        $data = $this->subpagesService->getEditorSubpages();
        if (!$data['success']) {
            return response()->json(['message' => $data['message']], 404);
        }
        return response()->json($data['subpages']);
    }

    public function checkEditorPermission($id)
    {
        $subpage = Subpages::findorFail($id);
        Gate::authorize('update', $subpage);
    }


    public function bySlug($slug) {
        $data = $this->subpagesService->fetchBySlug($slug);
        if (!$data['success']) {
            return response()->json(['message' => $data['message']], 404);
        }
        return response()->json($data['subpage']);
    }
    //
}
