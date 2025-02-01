<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Http\Requests\StoreGamesRequest;
use App\Http\Requests\UpdateGamesRequest;

class GamesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Games::with('user')->get()->map(function($game){
            return[
                'id' => $game->id,
                'title' => $game->title,
                'slug' => $game->slug,
                'description' => $game->description,
                'created_by' => $game->user->username,
                'created_by_id' => $game->created_by
            ];
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGamesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $game = Games::find($id);

        if(!$game){
            return response()->json(['message' => 'Game not found'], 404);
        }

        return response()->json([
            'id' => $game->id,
            'title' => $game->title,
            'slug' => $game->slug,
            'description' => $game->description,
            'created_by' => $game->user->username,
            'created_by_id' => $game->created_by
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGamesRequest $request, Games $games)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Games $games)
    {
        //
    }
}
