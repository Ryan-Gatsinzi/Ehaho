<?php

use App\Models\purchases;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReactController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\purchaseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('{any}', function () {
//     return view('index'); 
// })->where('any', '.*');

// Route::get('/', function () {
//     return view('main');
// });

// // Route::view('/{path?}',  function () {
// //     return view('main'); 
// // })->where('path', '.*');

// Route::get('/{path?}', [
//     'uses' => 'ReactController@show',
//     'as' => 'main',
//     'where' => ['path' => '.*']
// ]);

Route::get('{any}', function(){
    return view('main');
})->where('any','.*');