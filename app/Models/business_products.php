<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class business_products extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'business_id',
        'product_id',
        'product_price',
        'default_unit_package',
        'product_description',
        'opening_stock',
        'minimum_order_quantity',
        'minimum_order_indicator',
        'product_published',
        'deleted_at',
    ];

    //Relationship to users
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
