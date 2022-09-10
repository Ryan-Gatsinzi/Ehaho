<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Nullable;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('business_product_id')->constrained('business_products')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('delivery_id')->nullable()->constrained('user_businesses')->onDelete('cascade')->onUpdate('cascade');
            $table->string('delivery_code')->nullable();
            $table->string('buyer_code')->nullable();
            $table->integer('order_quantity');
            $table->integer('order_unit_package');
            $table->integer('order_unit_price');
            $table->integer('delivery_amount')->nullable();
            $table->integer('product_discount');
            $table->string('payment_status');
            $table->string('order_status');
            $table->string('order_intransit_updates')->nullable();
            $table->date('delivery_estimated_time');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('deleted_by')->nullable()->constrained('users')->onDelete('cascade')->onUpdate('cascade');                              
            $table->timestamps();
            $table->softDeletes()->nullable();            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products_orders');
    }
};
