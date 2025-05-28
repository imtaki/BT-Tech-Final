<?php
namespace App\Services;

use App\Models\ConferenceYear;
use App\Models\User;
use App\Models\UserConferenceYear;

class UserService {

    public function createAdmin($request) {
        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'admin',
            'password' => bcrypt($request->password),
        ]);

        return ['message' => 'Admin created',
                'object' => $admin];
    }

    public function createEditor($request) {
        $editor = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'role' => 'editor',
            'password' => bcrypt($request->password),
        ]);

        $editor->conferenceYears()->attach($request->conference_year_id);

        return ['message' => 'Editor created',
                'object' => $editor];
    }

    public function updateEditorConferenceYear($request, $editor) {
        $editor->conferenceYears()->sync([$request->conferenceYearId]);

        return ['message' => 'Editor updated',
                'object' => $editor->load('conferenceYears')];
    }

    public function getEditorYear() {
        $user = auth('api')->user();
        if ($user->role === "admin") {
            return ["success" => true, "message" => "All"];
        } else if ($user->role === "editor") {
            $yearId = UserConferenceYear::where("user_id", $user->id)->value("conference_year_id");
            $year = ConferenceYear::findorFail($yearId);
            return ["success" => true, "message" => $year];
        }
        return ["success" => false, "message" => "Error getting editor year."];
    }
}

?>
