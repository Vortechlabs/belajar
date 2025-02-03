<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function SignIn(Request $request) {
        $request->validate([
            'username' => 'required|min:3|max:255',
            'password' => 'required'
        ]);

        $user = User::where('username', $request->username)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message' => 'Password salah'], 400);
        }

        $token = $user->createToken($request->username);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function SignUp(Request $request){
        $fields = $request->validate([
            'username' => 'required|min:3|max:255',
            'password' => 'required|min:8'
        ]);

        $user = User::create([
            'username' => $fields['username'],
            'password' => Hash::make($fields['password'])
        ]);

        $token = $user->createToken($request->username);
 
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }
}
