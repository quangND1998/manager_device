<?php
return [
    'client_id' => env('PAYPAL_CLIENT_ID','AWzd9MYTTyM57Rjg8AMVK8suOJXPmHk5rj8OOaM4yiXzf-1UfmXxUwR6JBO6XYdx1cHv3If5V2YG62eS'),
    'secret' => env('PAYPAL_SECRET','EAr_KlVb4_H0TN12448KmeY-u9EgTc9y83t7YVAEbrVwqA3fovOPsht7NjqyU-0qYQ4B5eCvq9TBtoa9'),
    'settings' => array(
        'mode' => env('PAYPAL_MODE','sandbox'),
        'http.ConnectionTimeOut' => 30,
        'log.LogEnabled' => true,
        'log.FileName' => storage_path() . '/logs/paypal.log',
        'log.LogLevel' => 'ERROR'
    ),
];
