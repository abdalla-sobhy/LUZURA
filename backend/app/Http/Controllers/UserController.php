<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

use function Laravel\Prompts\password;

class UserController extends Controller
{
    function register(Request $request){
        $request->validate([
            'name' => ['required', 'max:255', 'min:1', "string"],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', password::defaults()],
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        // $user->name = $request->input('name');
        // $user->email = $request->input('email');
        // $user->password = Hash::make($request->input('password'));
        // $user->save();
        // auth()->login($user);
        return $user;
    }

    function login(Request $request){
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', password::defaults()]
        ]);
        $user = User::where('email',$request->email)->first();
        if(!Hash::check($request->password,$user->password)){
            $errors =["password" => "That’s not the right password. "];
            return ["error" => $errors];
        }
        return $user;
    }
    function ChangePassword(Request $request, $id)
    {
        $user = User::find($id);
        if(!Hash::check($request->oldPassword,$user->password)){
            // $errors =["oldPassword" => "That’s not the right password."];
            return response()->json(['status' => false], 400);
        }

        $validated = $request->validate([
            'password' => ['required', password::defaults()]
        ]);
        $validated["password"] = Hash::make($request->password);
        try {
            $result = User::where('id',$id)->update($validated);
        } catch (\Throwable $th) {
            return $th;
        }
    }
    function getUserData($id){
        return User::find($id);
    }
    function DeleteAccount($id){
        User::where('id',$id)->delete();
    }
}
