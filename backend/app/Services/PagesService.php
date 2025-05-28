<?php
namespace App\Services;

use App\Models\Pages;

class PagesService {

    public function createNewPage($page) {

        if ($page['is_index']) {
            $index_page = Pages::where("is_index", 1)->count();
            if ($index_page > 0) {
                return ["success" => false,
                        "message" => "Index page already exists"];
            }
        }

        $slugExists = Pages::where('slug', $page['slug'])->count();
        $titleExists = Pages::where('title', $page['title'])->count();

        if ($slugExists > 0 || $titleExists > 0) {
            return ["success" => false,
                    "message" => "Page/Slug already exists"];
        }

        $user = auth('api')->user();
        $page_record = Pages::create([
            'title' => $page['title'],
            'slug' => $page['slug'],
            'last_editor' => $user->id,
            'is_link' => $page['is_link'],
            'is_index' => $page['is_index'],
        ]);

        return ["success" => true,
                "page" => $page_record];
    }

    public function updatePage($page, $id)
    {
        if ($page['is_index']) {
            $index_page = Pages::where("is_index", 1)->where("id", "!=", $id)->count();
            if ($index_page > 0) {
                return ["success" => false,
                        "message" => "Index page already exists"];
            }
        }

        $slugExists = Pages::where('slug', $page['slug'])->where('id', '!=', $id)->count();
        $titleExists = Pages::where('title', $page['title'])->where('id', '!=', $id)->count();

        if ($slugExists > 0 || $titleExists > 0) {
            return ["success" => false,
                    "message" => "Page/Slug already exists"];
        }

        $user = auth('api')->user();
        $page_record = Pages::findorFail($id);
        $page_record->title = $page['title'];
        $page_record->content = $page['content'];
        $page_record->slug = $page['slug'];
        $page_record->last_editor = $user->id;
        $page_record->is_index = $page['is_index'];
        $page_record->is_link = $page['is_link'];
        $page_record->save();

        return ["success" => true,
                "page" => $page_record];
    }

}

?>
