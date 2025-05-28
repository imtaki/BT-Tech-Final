<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ConferenceYearController;
use App\Http\Controllers\Api\EditorController;
use App\Http\Controllers\Api\PagesController;
use App\Http\Controllers\Api\SubPageController;
use App\Http\Controllers\Api\UploadsController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::middleware(['auth:api', 'role.check'])->get('/role-check', function (Request $request) {
    return response()->json(["success" => "Accessed admin/editor panel."]);
});

Route::get('/editor-year', [EditorController::class, "getYear"])->middleware('auth:api');
Route::get('/conference-years', [ConferenceYearController::class, "index"]);
Route::get('/subpages', [SubPageController::class, "index"]);
Route::get('/subpages/by-slug/{slug}', [SubPageController::class, "bySlug"]);
Route::get('/pages', [PagesController::class, "index"]);
Route::get("pages/by-slug/{slug}", [PagesController::class, "getPageBySlug"]);

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');

Route::apiResource('admins', AdminController::class)->middleware('auth:api');
Route::apiResource('editors', EditorController::class)->middleware('auth:api');
Route::apiResource('uploads', UploadsController::class)->middleware('auth:api');

Route::middleware(['auth:api'])->group(function () {
    // Conference Years
    Route::post('/conference-years', [ConferenceYearController::class, "store"]);
    Route::delete('/conference-years/{conferenceYear}', [ConferenceYearController::class, "destroy"]);

    // Subpages
    Route::post('/subpages', [SubPageController::class, "store"]);
    Route::delete('/subpages/{subpage}', [SubPageController::class, "destroy"]);
    Route::patch('/subpages/{id}', [SubPageController::class, "update"]);
    Route::get('/subpages/editor', [SubPageController::class, "getEditorSubpages"])->middleware('auth:api');
    Route::get("/subpages/edit/{subpageId}", [SubPageController::class, "checkEditorPermission"]);

    //Pages
    Route::post('/pages', [PagesController::class, "store"]);
    Route::delete('/pages/{page}', [PagesController::class, "destroy"]);
    Route::patch('/pages/{id}', [PagesController::class, "update"]);
});

