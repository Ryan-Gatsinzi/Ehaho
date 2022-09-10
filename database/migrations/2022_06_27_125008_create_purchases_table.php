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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->string('receipt_number');
            $table->foreignId('business_id')->constrained('user_businesses')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('supplier_id');
            $table->integer('purchase_paid_amount');
            $table->string('payment_status');
            $table->string('payment_method');
            $table->enum('purchase_channel',['Offline','Online']);
            $table->enum('purchase_platform',['Web','USSD','Android','iOS'])->nullable();
            $table->date('purchase_date');
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
        Schema::dropIfExists('purchases');
    }
};                                     