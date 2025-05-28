<?php
namespace App\Services;

use App\Models\ConferenceYear;
use App\Models\Subpages;
use App\Models\UserConferenceYear;

class SubpagesService {
    public function createSubpage($request) {
        $user = auth('api')->user();
        $duplicate_slug = Subpages::where('slug', $request['slug'])->first();

        if ($duplicate_slug) {
            return ["success" => false, "message" => "Duplicate page/slug."];
        }

        $subpage = Subpages::create([
            'title' => $request['title'],
            'year' => $request['year'],
            'last_editor' => $user->id,
            'slug' => $request['slug']
        ]);

        return ["success" => true, "message" => "Subpage created.", "object" => $subpage];
    }

    public function updateSubpage($request, $subpage) {
        $user = auth('api')->user();
        $duplicate_slug = Subpages::where('slug', $request['slug'])->where('id', '!=', $subpage->id)->count();

        if ($duplicate_slug > 0) {
            return ['success' => false, 'message' => 'Duplicate page/slug.'];
        }

        $subpage->title = $request['title'];
        $subpage->content = $request['content'];
        $subpage->last_editor = $user->id;
        $subpage->slug = $request['slug'];
        $subpage->save();

        return ["success" => true, "message" => "Subpage updated.", "object" => $subpage];
    }


    public function getEditorSubpages() {
        $user = auth('api')->user();
        $yearid = UserConferenceYear::where('user_id', $user->id)->value('conference_year_id');

        if (!$yearid) {
            return ['success' => false, 'message' => 'No year has been associated.'];
        }

        $year = ConferenceYear::where('id', $yearid)->value('year');

        $subpages = Subpages::where('year', $year)->get();
        return ["success" => true, "subpages" => $subpages];
    }

    public function fetchBySlug($slug) {
        $subpage = Subpages::where('slug', $slug)->first();
        if (!$subpage) {
            return ['message' => 'Subpage not found.'];
        }
        return ["success" => true, "subpage" => $subpage];
    }
}

?>
