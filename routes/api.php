<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\http\Controllers\AuthController;
use App\http\Controllers\TaskController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::controller(TaskController::class)->group(function(){
        Route::post('/create-task','createTask');
        Route::patch('/edit-status/{id}','updateTask');
        Route::delete('/delete-task/{id}','destroy');
        Route::get('/view-task','index');
        Route::get('/single-task/{id}','show');
    });
});
