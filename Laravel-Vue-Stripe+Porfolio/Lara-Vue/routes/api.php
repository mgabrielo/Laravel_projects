<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AboutController;
use App\Http\Controllers\API\SkillController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\EducationController;
use App\Http\Controllers\API\ExperienceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
});



Route::controller(AboutController::class)->group(function () {
    Route::get('edit_about', 'edit_about');
    Route::post('update_about/{id}', 'update_about');
    Route::post('update_about_file/{id}', 'update_about_file');
});


Route::controller(ServiceController::class)->group(function () {

    Route::get('/get_all_service', 'get_all_service');
    Route::post('/create_service', 'create_service');
    Route::post('/update_service/{id}', 'update_service');
    Route::get('/delete_service/{id}', 'delete_service');
});

Route::controller(SkillController::class)->group(function () {
    Route::get('/get_all_skill', 'get_all_skill');
    Route::post('/create_skill', 'create_skill');
    Route::post('/update_skill/{id}', 'update_skill');
    Route::get('/delete_skill/{id}', 'delete_skill');
});

Route::controller(EducationController::class)->group(function () {
    Route::get('/get_all_education', 'get_all_education');
    Route::post('/create_education', 'create_education');
    Route::post('/update_education/{id}', 'update_education');
    Route::get('/delete_education/{id}', 'delete_education');
});

Route::controller(ExperienceController::class)->group(function () {
    Route::get('/get_all_experience', 'get_all_experience');
    Route::post('/create_experience', 'create_experience');
    Route::post('/update_experience/{id}', 'update_experience');
    Route::get('/delete_experience/{id}', 'delete_experience');
});

Route::controller(ProjectController::class)->group(function () {
    Route::get('/get_all_projects', 'get_all_projects');
    Route::post('/add_project', 'add_project');
    Route::get('/get_edit_project/{id}', 'get_edit_project');
    Route::post('/update_project/{id}', 'update_project');
    Route::get('/delete_project/{id}', 'delete_project');
});


Route::get('/products', [ProductController::class, 'index']);
Route::post('/purchase', [UserController::class, 'purchase']);
