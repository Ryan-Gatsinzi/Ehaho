<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_invoice');
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('order_paid_amount');
            $table->string('order_status');
            $table->string('payment_status');
            $table->string('payment_method');
            $table->integer('address_id')->nullable();
            $table->enum('sale_channel',['Offline','Online']);
            $table->enum('sale_platform',['Web','USSD','Android','iOS']);
            $table->date('sale_date');
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
        Schema::dropIfExists('orders');
    }
};
