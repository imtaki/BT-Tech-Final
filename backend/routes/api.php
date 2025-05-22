<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ConferenceYearController;
use App\Http\Controllers\Api\EditorController;
use App\Http\Controllers\Api\PagesController;
use App\Http\Controllers\Api\SubPageController;
use App\Http\Controllers\Api\SupabaseUploadsController;
use App\Http\Controllers\Api\UploadsController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/pages/by-slug/{slug}', [PagesController::class, 'getPageBySlug']);
Route::get('/subpages/by-id/{id}', [SubPageController::class, "show"]);
Route::get('/subpages/by-slug/{slug}', [SubPageController::class, "bySlug"]);
Route::get('/subpages/by-slug/{id}/edit', [SubPageController::class, "checkEditorPermission"]);
Route::get('/subpages/by-year/{year}', [SubPageController::class, "byYear"]);
Route::get('/subpages/editor', [SubPageController::class, "getEditorSubpages"]);
Route::get('/editor-year', [EditorController::class, "getYear"]);

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::middleware(['auth:api', 'role.check'])->get('/role-check', function (Request $request) {
    return response()->json(["success" => "Accessed admin/editor panel."]);
});
Route::delete('/cloud-files/{upload}', [SupabaseUploadsController::class, 'destroy']);

Route::apiResource('conference-years', ConferenceYearController::class);
Route::apiResource('subpages', SubPageController::class);
Route::apiResource('admins', AdminController::class);
Route::apiResource('editors', EditorController::class);
Route::apiResource('uploads', UploadsController::class);
Route::apiResource("pages", PagesController::class);
