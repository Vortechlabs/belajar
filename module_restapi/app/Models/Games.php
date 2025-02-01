<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    /** @use HasFactory<\Database\Factories\GamesFactory> */
    use HasFactory;

    protected $table = 'games';

    protected $fillable = [
        'id',
        'title',
        'description',
        'slug',
        'created_by'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
