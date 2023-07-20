<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUrlPathToAppWindowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('app_windows', function (Blueprint $table) {
            $table->string('url_vice')->nullable();
            $table->string('url_pico')->nullable();
            $table->string('version')->nullable();
            $table->string('url_apk')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('app_windows', function (Blueprint $table) {
            //
        });
    }
}
