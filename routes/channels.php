<?php

use App\Models\Groups;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('active-device', function ($user, $id) {
    return true;
});


Broadcast::channel('lauch-group.{group}', function ($device, Groups $group) {
    if ($group->hasDevice($device->id)) {
        return true;
    }
});

Broadcast::channel('lauch-app.{id}', function ($user,$id) {
        return true;
});
Broadcast::channel('apk-install.{id}', function ($user,$id) {
    return true;
});
Broadcast::channel('apk-uninstall.{id}', function ($user,$id) {
    return true;
});
Broadcast::channel('lauch-default-app.{id}', function ($user,$id) {
    return true;
});

Broadcast::channel('connect-wifi.{id}', function ($user,$id) {
    return true;
});
Broadcast::channel('recive-active-device.{id}', function ($user,$id) {
    return true;
});

Broadcast::channel('check-active-device.{id}', function ($user,$id) {
    return true;
});

Broadcast::channel('send-update-application-device.{id}', function ($user,$id) {
    return true;
});
Broadcast::channel('recive-update-application-device.{id}', function ($user,$id) {
    return true;
});

Broadcast::channel('lauch-app-time.{id}', function ($user,$id) {
    return true;
});


Broadcast::channel('time-play-notification.{id}', function ($user,$id) {
    return true;
});
