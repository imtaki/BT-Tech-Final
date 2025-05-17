<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\EditorController;
use App\Http\Controllers\Api\SubPageController;
use App\Http\Controllers\Api\ConferenceYearController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::middleware(['auth:api', 'role.check'])->group(function () {
    Route::get('/admin', fn(Request $request) =>
        response()->json(["message" => "Accessed admin panel."]));
    Route::get('/editor', fn(Request $request) =>
        response()->json(["message" => "Accessed editor panel."]));
});

Route::apiResource('conference-years', ConferenceYearController::class);
Route::apiResource('/subpages', SubPageController::class);
Route::apiResource('/admins', AdminController::class);
Route::apiResource('/editors', EditorController::class); 