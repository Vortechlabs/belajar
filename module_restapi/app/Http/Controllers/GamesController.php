<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Http\Requests\StoreGamesRequest;
use App\Http\Requests\UpdateGamesRequest;
use Illuminate\Routing\Controllers\Middleware;

class GamesController extends Controller
{

    //public static function middleware(){
    //    return[
    //        new Middleware('auth:sanctum', except:['inddex', 'show'])
    //    ];
    //}

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
        \Log::info('Authenticated User:', ['user' => $request->user()]);
        
        $fields = $request->validate([
            'title' => 'required|min:3|max:60',
            'description' => 'required|max:255',
            'slug' => 'required|max:200'
        ]);
        
        $fields['created_by'] = $request->user()->id; 

        $games = $request->user()->game()->create($fields);

        return $games;
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
