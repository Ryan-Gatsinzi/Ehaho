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
        Schema::create('user_businesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_sector_id')->nullable()->constrained('user_sectors')->onDelete('cascade')->onUpdate('cascade');
            $table->string('business_name');
            $table->string('business_phone');
            $table->string('business_email')->nullable();
            $table->string('business_logo')->nullable();
            $table->string('banner_image')->nullable();
            $table->string('country');
            $table->integer('province')->nullable();
            $table->integer('district')->nullable();
            $table->integer('sector')->nullable();
            $table->integer('cell')->nullable();
            $table->integer('village')->nullable();
            $table->string('street_number')->nullable();
            $table->string('common_place')->nullable();
            $table->string('address_1')->nullable();
            $table->string('address_2')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();            
            $table->string('zip_code')->nullable();
            $table->enum('page_published',['Yes','No']);
            $table->enum('active', ['Yes','No']);
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
        Schema::dropIfExists('user_businesses');
    }
};
