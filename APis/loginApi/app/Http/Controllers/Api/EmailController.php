<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

require 'C:\wamp64\www\Red-social-educativa\APis\vendor\autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\User;


class EmailController extends Controller
{
    public function sendVerificationEmail(Request $request)
    {
        $request->validate([
            'carnet' => 'required|string',
        ]);

        $userId = $request['carnet'];

        $user = User::where('carnet', $userId)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $verificationToken = sha1($user->email . time());

        $user->verification_token = $verificationToken;
        $user->save();

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'usbooksv@gmail.com'; 
            $mail->Password = 'tgpr oavu qdfa imoj'; 
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('usbooksv@gmail.com', 'Usbook');
            $mail->addAddress($user->email, $user->name);
            $mail->Subject = 'Verifica tu direccion de correo electronico';
            $mail->Body = 'Por favor, haz clic en el siguiente enlace para verificar tu direccion de correo electronico: ' . route('email.verify', ['token' => $verificationToken]);

        $mail->send();
            
            return response()->json(['message' => 'Correo electrónico de verificación enviado correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al enviar el correo electrónico de verificación: ' . $mail->ErrorInfo], 500);
        }
        
    }   

    public function changePassword(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
        ]);

        $userId = $request['email'];

        $user = User::where('email', $userId)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $verificationToken = rand(10000, 99999);

        $user->verification_token = $verificationToken;
        $user->save();

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'usbooksv@gmail.com'; 
            $mail->Password = 'tgpr oavu qdfa imoj'; 
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('usbooksv@gmail.com', 'Usbook');
            $mail->addAddress($user->email, $user->name);
            $mail->Subject = 'Cambio de contraseña';
            $mail->Body = 'Su codigo de verificacion es el siguiente:'. $verificationToken;

        $mail->send();
            
            return response()->json(['message' => 'Correo electrónico de verificación enviado correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al enviar el correo electrónico de verificación: ' . $mail->ErrorInfo], 500);
        }
        
    } 
    
    public function newPassword(request $request){

        $user = User::where('verification_token', $request['verification_token'])->first();

        if (!$user) {
            return response()->json(['message' => 'Codigo no válido'], 404);
        }

        $user->password = bcrypt($request['password']);
        $user->verification_token = "none";
        $user->save();

        header('Location: http://localhost:8000/usbook/resources/pages/index.html');
        exit;
    }

    public function verify($verificationToken)
    {
        $user = User::where('verification_token', $verificationToken)->first();

        if (!$user) {
            return response()->json(['message' => 'Token de verificación no válido'], 404);
        }

        $user->email_verified_at = now();
        $user->verification_token = "none";
        $user->save();

        return;
    }
}
