<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;


Route::middleware('auth:api')->get('/user', function(Request $request){
    return $request->user();
});

Route::post('/register',[UserController::class,'register'])->name('register');
Route::post('/login',[UserController::class,'login'])->name('login');
Route::put('/ChangePassword/{id}',[UserController::class,'ChangePassword'])->name('ChangePassword');
Route::get('/getUserData/{id}',[UserController::class,'getUserData'])->name('getUserData');
Route::delete('/DeleteAccount/{id}',[UserController::class,'DeleteAccount'])->name('DeleteAccount');
Route::post('/addProduct',[ProductController::class,'addProduct'])->name('addProduct');
Route::get('/list',[ProductController::class,'list'])->name('list');
Route::delete('/delete/{id}',[ProductController::class,'delete'])->name('delete');
Route::get('/product/{id}',[ProductController::class,'getProduct'])->name('getProduct');
Route::post('/updateProduct/{id}',[ProductController::class,'updateProduct'])->name('updateProduct');
Route::get('/search/{key}',[ProductController::class,'search'])->name('search');
Route::get('/getCartProducts/{id}',[ProductController::class,'getCartProducts'])->name('getCartProducts');
