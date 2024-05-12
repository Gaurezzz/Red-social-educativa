<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\User;


class EmailController extends Controller
{
    public function sendVerificationEmail($userId)
    {
        $user = User::find($userId);

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
            $mail->Password = '1McQVPp*V'; 
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('usbooksv@gmail.com', 'Gabriela Rodriguez');
            $mail->addAddress($user->email, $user->name);
            $mail->Subject = 'Verifica tu dirección de correo electrónico';
            $mail->Body = 'Por favor, haz clic en el siguiente enlace para verificar tu dirección de correo electrónico: ' . route('verify.email', ['token' => $verificationToken]);
            
            $mail->send();

            return response()->json(['message' => 'Correo electrónico de verificación enviado correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Hubo un error al enviar el correo electrónico de verificación'], 500);
        }
    }   

    public function verify(Request $request)
    {
        $verificationToken = $request->input('token');
        $user = User::where('verification_token', $verificationToken)->first();

        if (!$user) {
            return response()->json(['message' => 'Token de verificación no válido'], 404);
        }

        $user->email_verified_at = now();
        $user->verification_token = null;
        $user->save();

        return response()->json(['message' => 'Correo electrónico verificado correctamente'], 200);
    }
}
