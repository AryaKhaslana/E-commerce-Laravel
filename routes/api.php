<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

// Public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/cart', [CartController::class, 'store']);
Route::get('/cart', [CartController::class, 'index']);
Route::delete('/cart/{id}', [CartController::class, 'destroy']);
Route::post('/checkout', [OrderController::class, 'checkout']);
Route::get('/orders', [OrderController::class, 'index']);

// Protected (Harus Login)
Route::middleware('auth:sanctum', 'is_admin')->group(function () {
Route::post('/logout', [AuthController::class, 'logout']);

// User Order Action
Route::post('/products', [ProductController::class, 'store']);
Route::post('/products/{id}', [ProductController::class, 'update']);
Route::post('/products/{id}', [ProductController::class, 'destroy']);
Route::post('/orders/{id}/upload', [OrderController::class, 'uploadProof']); // Upload Bukti

// Admin Actions
Route::post('/products', [ProductController::class, 'store']); // Tambah Barang
Route::post('/orders/{id}/verify', [OrderController::class, 'verifyPayment']); // Acc Bayaran
});
