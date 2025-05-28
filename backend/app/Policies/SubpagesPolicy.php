<?php

namespace App\Policies;

use App\Models\ConferenceYear;
use App\Models\Subpages;
use App\Models\User;
use App\Models\UserConferenceYear;
use Illuminate\Auth\Access\Response;

class SubpagesPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Subpages $subpages): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, $year): bool
    {
        $yearId = UserConferenceYear::where('user_id', $user->id)->value('conference_year_id');
        $conferenceYear = ConferenceYear::where('id', $yearId)->value('year');

        return $user->role === "admin" || ($user->role === "editor" && $year === $conferenceYear);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Subpages $subpages): bool
    {
        $yearId = UserConferenceYear::where('user_id', $user->id)->value('conference_year_id');
        $year = ConferenceYear::where('id', $yearId)->value('year');

        return $user->role === "admin" || ($user->role === "editor" && $subpages->year === $year);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Subpages $subpages): bool
    {
        return $this->update($user, $subpages);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Subpages $subpages): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Subpages $subpages): bool
    {
        return false;
    }
}
