<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event', function (Blueprint $table) {
            $table->id();
            $table->string('name_event')->nullable();
            $table->string('avata_event')->nullable();
            $table->string('email_event')->nullable();
            $table->string('image_event')->nullable();
            $table->string('content_event')->nullable();
            $table->string('category_event')->nullable();
            $table->bigInteger('member_event')->nullable();
            $table->dateTime('time_event')->nullable();
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
        Schema::dropIfExists('event');
    }
}
