<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\purchaseController;

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
//Route for authentication of user login
Route::post('/login', [UserController::class, 'login']);

//Route for logout
Route::get('/logout', [UserController::class, 'logout']);
//Route for going to products page
Route::get('/products', [purchaseController::class, 'index']);

//Route for going to purchase product form
Route::get('/purchase_view/{prod_id}', [purchaseController::class, 'purchase_form']);

//Route for inserting product from products table into business products table
Route::post('/purchase_product', [purchaseController::class, 'purchase']);

//Route for displaying products images
Route::get('/gallery/{id}', [purchaseController::class, 'gallery']);

//Route for displaying business products images
Route::get('/business_products_gallery/{id}', [ProductsController::class, 'business_gallery']);

//Route for showing users purchased products
Route::get('/my_products', [ProductsController::class, 'index']);

//Route for showing edit my product page
Route::get('/edit/{prod_id}', [ProductsController::class, 'edit_form']);

//Route for editing purchased products
Route::post('/update', [ProductsController::class, 'update_product']);

//Route to get all of user's businesses
Route::get('/my_businesses', [ProductsController::class, 'my_businesses']);

//Route to get all of user's businesses
Route::get('/my_businesses', [ProductsController::class, 'my_businesses']);

//Route for adding more form
Route::get('/add_more_form/{prod_id}', [ProductsController::class, 'add_more_form']);

//Route for getting business products
Route::get('/get_b_prod', [ProductsController::class, 'get_b_prod']);

//Route for adding more
Route::post('/add_more', [ProductsController::class, 'add_more']);

//Route for selling product
Route::post('/sell', [ProductsController::class, 'sell']);
    



