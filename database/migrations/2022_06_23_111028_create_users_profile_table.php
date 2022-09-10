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
        Schema::create('users_profile', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender');
            $table->string('user_picture');
            $table->string('national_id')->nullable();
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
            $table->enum('register_platform', ['Web','USSD','Android','iOS']);
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('users_profile');
    }
};
