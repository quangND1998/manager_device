<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\Request;

trait LoginTrait
{

    function getOriginalClientIp(Request $request)
    {
        $xForwardedFor = $request->header('x-forwarded-for');
        if (empty($xForwardedFor)) {
            // Si está vacío, tome la IP del request.
            $ip = $request->ip();
        } else {
            // Si no, viene de API gateway y se transforma para usar.
            $ips = is_array($xForwardedFor) ? $xForwardedFor : explode(', ', $xForwardedFor);
            $ip = $ips[0];
        }
        return $ip;
    }
    public function checkaddressIp($ipaddress){
        $url = "http://ip-api.com/json/".$ipaddress->ip;
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

        $output=curl_exec($ch);
        $data = json_decode($output, true);
        curl_close($ch);
        if($data['status'] == 'fail'){

        }
        else{
            $ipaddress->country_code = $data['countryCode'];
            $ipaddress->country_name = $data['country'];
            $ipaddress->region_code = $data['region'];
            $ipaddress->region_name = $data['regionName'];
            $ipaddress->city = $data['city'];
            $ipaddress->zip_code = $data['zip'];
            $ipaddress->time_zone = $data['timezone'];
            $ipaddress->latitude = $data['lat'];
            $ipaddress->longitude = $data['lon'];
        }
       
      
    

    }
}