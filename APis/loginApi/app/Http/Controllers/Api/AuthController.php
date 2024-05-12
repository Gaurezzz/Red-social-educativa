<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;


class AuthController extends Controller
{
    //
    public function login(Request $request){

        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)){

            return response()->json([
                'message' => 'Invalid email or password'
            ], 401);
        }

        $user = $request->user();
        
        $token = $user->createToken('Access Token');

        $user->access_token = $token->accessToken;

        return response()->json([
            "user"=>$user
        ], 200);
    }

    public function signup(Request $request){

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'carnet' => 'required|string|unique:users',
            'verification_token' => 'string'
        ]);

        $user = new User([
            'name'=>$request->name,
            'email'=>$request->email,
            'carnet'=>$request->carnet,
            'password'=>bcrypt($request->password)
        ]);
        $user->save();

        return response()->json([
            "message"=>"Usuario registrado correctamente"
        ], 200);
    }

    public function logout(Request $request){

        $request->user()->token()->revoke();
        return response()->json([
            "message"=>"Sesión cerrada correctamente"
        ], 200);
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->user();

        $existingUser = User::where('email', $user->getEmail())->first();

        if ($existingUser) {
            Auth::login($existingUser);
        } else {
            $newUser = new User();
            $newUser->name = $user->getName();
            $newUser->email = $user->getEmail();
            $newUser->password = "google";
            $newUser->save();

            Auth::login($newUser);
        }

        return response()->json([
            "message" => "Conexión con Google completada exitosamente",
            "user" => $user 
        ], 200);
    }
}
