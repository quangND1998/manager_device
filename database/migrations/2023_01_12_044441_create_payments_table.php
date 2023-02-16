<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('pay_gate')->nullable();
            $table->string('pay_type')->nullable();
            $table->string('transID')->nullable();
            $table->string('merch_TxnRef')->nullable();
            $table->string('card_number');
            $table->decimal('amount');
            $table->string('state');

            $table->string('description');

            $table->unsignedBigInteger('user_id')->nullable();
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
        Schema::dropIfExists('payments');
    }
}
