<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SessionController extends Controller
{
    public function check(Request $request){

        $request->validate([
            'verification_token' => 'required|string',
            'carnet' => 'required|string'
        ]);

        $credentials = request(['verification_token', 'carnet']);

        if (!Auth::attempt($credentials)){

            return response()->json([
                'message' => 'El usuario no ha iniciado sesion'
            ], 401);
        }

        $user = $request->user();

        return response()->json([
            "user"=>$user
        ], 200);
    }
}
