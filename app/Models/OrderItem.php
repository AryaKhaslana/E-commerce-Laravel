<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Product;

class OrderItem extends Model
{
    use HasFactory;

    protected $guarded = []; // <--- MANTRA WAJIB

    public function product () {
        
        return $this -> belongsTo(Product::class);
    }

}