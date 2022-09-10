<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Integer;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products_discounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_product_id')->constrained('business_products')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('product_discount');
            $table->enum('discount_setting',['Scheduled','Manual']);
            $table->date('discount_from')->nullable();
            $table->date('discount_to')->nullable();
            $table->enum('active',['No','Yes']);
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
        Schema::dropIfExists('products_discounts');
    }
};
