window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';


// window.io = require('socket.io-client')

// window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: `${window.location.protocol}//${window.location.hostname}:${process.env.MIX_FRONTEND_PORT}`
// });
// // console.log(`${ window.location.protocol }//${window.location.hostname}:${process.env.MIX_FRONTEND_PORT}`)
window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    wsHost: process.env.MIX_PUSHER_HOST,
    wsPort: process.env.MIX_PUSHER_PORT,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});



const PusherJS = require('pusher-js');

window.client = new PusherJS('app-key', {
    wsHost: process.env.MIX_PUSHER_HOST,
    wsPort: process.env.MIX_PUSHER_PORT,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});


import io from 'socket.io-client'
// window.io = require('socket.io-client');
// window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: `${window.location.protocol}//${window.location.hostname}:6003`

// })


var connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout": 10000, //before connect_error and connect_timeout are emitted.
    "transports": ["wss", "ws"]
};
// console.log(`${window.location.protocol}//${window.location.hostname}:3000`)
window.socketio = io("http://startup.holomia.com:3000", connectionOptions);