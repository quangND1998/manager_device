<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGameTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game', function (Blueprint $table) {
            $table->id();
          
            $table->string('title_game')->nullable();
            $table->string('image_game')->nullable();
            $table->text('content_game')->nullable();
            $table->bigInteger('visits_game')->nullable();
            $table->dateTime('create_game')->nullable();
            $table->bigInteger('max_people')->nullable();
            $table->bigInteger('like_game')->nullable();
            $table->string('hastang_game')->nullable();
            $table->string('list_image')->nullable();
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
        Schema::dropIfExists('game');
    }
}
