<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PageRequest;
use App\Models\Pages;
use App\Services\PagesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PagesController extends Controller
{
    protected PagesService $pagesService;

    public function __construct(PagesService $pagesService)
    {
        $this->pagesService = $pagesService;
    }

    public function index()
    {
        return response()->json(Pages::get());
    }

    public function store(PageRequest $request) {
        Gate::authorize('create', Pages::class);
        $data = $this->pagesService->createNewPage($request);
        if (!$data["success"]) {
            return response()->json(["message" => $data["message"]], 409);
        }
        return response()->json([$data["page"]]);
    }

    public function update(PageRequest $request, $id) {
        Gate::authorize('update', Pages::class);
        $data = $this->pagesService->updatePage($request, $id);
        if (!$data["success"]) {
            return response()->json(["message" => $data["message"]], 409);
        }
        return response()->json([$data["page"]]);
    }

    public function destroy(Pages $page) {
        Gate::authorize('delete', $page);
        $page->delete();
        return response()->json(['message' => 'Page deleted']);
    }

    public function getPageBySlug($slug) {
        $page = Pages::where('slug', $slug)->first();
        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }
        return response()->json($page);
    }
}
