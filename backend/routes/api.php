<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\api\EditorController;
use App\Http\Controllers\Api\SubpageController;
use App\Http\Controllers\Api\ConferenceYearController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::middleware(['auth:api', 'role.check'])->get('/admin', function(Request $request) {
   return response()->json(["message" => "Accessed admin panel."]);
});

Route::apiResource('conference-years', ConferenceYearController::class);
Route::apiResource('/subpages', SubPageController::class);
Route::apiResource('/admins', AdminController::class);
Route::apiResource('/editors', EditorController::class); 