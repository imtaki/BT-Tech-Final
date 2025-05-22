<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pages;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index()
    {
        return response()->json(Pages::get());
    }

    public function store(Request $request) {

        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string',
            'is_index' => 'required|boolean',
            'is_link' => 'required|boolean',
        ]);

        if ($validated['is_index']) {
            $index_page = Pages::where("is_index", 1)->count();
            if ($index_page > 0) {
                return response()->json(['message' => 'Index page already exists'], 403);
            }
        }

        $slugExists = Pages::where('slug', $validated['slug'])->count();
        $titleExists = Pages::where('title', $validated['title'])->count();

        if ($slugExists > 0 || $titleExists > 0) {
            return response()->json(['message' => 'Page already exists'], 403);
        }

        $user = auth('api')->user();

        if (!$user || $user->role != "admin") {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $page = Pages::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'last_editor' => $user->id,
            'is_link' => $validated['is_link'],
            'is_index' => $validated['is_index'],
        ]);

        return response()->json([$page]);
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string',
            'content' => 'nullable|string',
            'is_index' => 'required|boolean',
            'is_link' => 'required|boolean',
        ]);

        if ($validated['is_index']) {
            $index_page = Pages::where("is_index", 1)->where("id", "!=", $id)->count();
            if ($index_page > 0) {
                return response()->json(['message' => 'Index page already exists'], 403);
            }
        }

        $slugExists = Pages::where('slug', $validated['slug'])->where('id', '!=', $id)->count();
        $titleExists = Pages::where('title', $validated['title'])->where('id', '!=', $id)->count();

        if ($slugExists > 0 || $titleExists > 0) {
            return response()->json(['message' => 'Page already exists'], 403);
        }

        $user = auth('api')->user();
        if (!$user || $user->role != "admin") {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $page = Pages::findorFail($id);
        $page->title = $validated['title'];
        $page->content = $validated['content'];
        $page->slug = $validated['slug'];
        $page->last_editor = $user->id;
        $page->is_index = $validated['is_index'];
        $page->is_link = $validated['is_link'];
        $page->save();

        return response()->json(['message' => 'Page updated']);
    }

    public function destroy(Pages $page) {
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
