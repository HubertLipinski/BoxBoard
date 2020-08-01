<?php

use Illuminate\Http\Request;

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

Route::group(['prefix' => 'auth'], function() {
    Route::post('login', 'Api\AuthController@login');
    Route::post('register', 'Api\AuthController@register');
    Route::get('logout', 'Api\AuthController@logout');
});

Route::resource('products', 'ProductController');
Route::post('image', 'ImageController@getImage');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
