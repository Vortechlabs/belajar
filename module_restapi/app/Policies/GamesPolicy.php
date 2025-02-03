<?php

namespace App\Policies;

use App\Models\Games;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GamesPolicy
{

    public function modify(User $user, Games $games): Response
    {
        return $user->id === $games->created_by
        ? Response::allow()
        : Response::deny('You dont own this game');
    }
}
