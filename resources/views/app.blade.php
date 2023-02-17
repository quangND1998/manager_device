<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />    
    <meta name="locale" content="{{ App::getLocale() }}" />
    <base href="{{ asset('') }}">
    <link rel="stylesheet" href="/static/css/bootstrap.min.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">

    <link rel="stylesheet" href="/static/css/AdminLTE.min.css">
    <link rel="stylesheet" href="/static/css/skin-blue.min.css">
    <link rel="stylesheet" href="/static/js/plugins/pace/pace.min.css">

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="{{ mix('/js/app.js') }}" defer></script>

    @routes
    @inertiaHead
  </head>
  <body class="hold-transition skin-blue " style="padding-right:0px !important; position: relative;">
   
    @inertia
    <script src="/static/js/plugins/jQuery/jQuery-2.2.0.min.js"></script>
    <script src="/static/js/plugins/bootstrap/bootstrap.min.js"></script>
    <script src="/static/js/plugins/AdminLTE/app.min.js"></script>
   
    



    
  </body>
</html>