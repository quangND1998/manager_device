<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="https://cdn.socket.io/4.5.4/socket.io.min.js" integrity="sha384-/KNQL8Nu5gCHLqwqfQjA689Hhoqgi2S84SNUxC3roTe4EhJ9AfLkp8QiQcU8AMzI" crossorigin="anonymous"></script>
</head>
<body>
    <p id="power"></p>
</body>


<script>
    var connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
        "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
        "transports" : ["websocket"]
    };
      const socket = io('http://192.168.1.169:3000',connectionOptions)

    socket.emit('private-active-device.3', 'private-active-device.3');
    socket.on('message',(message)=>{
        $('#power').text(parseInt($('#power').text()) + message);
    })
    socket.on("private-active-device.3:App\\Events\\TestEvent", function(message){
        // increase the power everytime we load test route
        $('#power').text(parseInt($('#power').text()) + message.deviceName);
    
    });
</script>
</html>