<?php

namespace App\Response;

use Inertia\Inertia;

class InertiaErrors
{

    public function errors_403()
    {
        $erros = 403;
        return Inertia::render('Error', ['status' => $erros]);
    }


    public function errors_404()
    {
        $erros = 404;
        return Inertia::render('Error', ['status' => $erros]);
    }
}
