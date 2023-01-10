<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductPackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->float('price')->nullable();
            $table->float('save_money')->nullable();
            $table->integer('package_time')->nullable();
            $table->boolean('state')->default(false)->nullable();
            $table->integer('limit_device')->default(5)->nullable();
            $table->bigInteger('id_priority')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_packages');
    }
}
