<?php

namespace App\Http\Controllers;

use App\Errors\InertiaErrors;


class InertiaController extends Controller
{

    protected function errors()
    {
        return (new InertiaErrors());
    }

}
