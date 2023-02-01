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
    public function checkaddressIp($new_ip){
        $url = "http://ip-api.com/json/".$new_ip->ip;
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

        $output=curl_exec($ch);
        $data = json_decode($output, true);
        curl_close($ch);
        if($data['status'] == 'fail'){

        }
        else{
            $new_ip->country_code = $data['countryCode'];
            $new_ip->country_name = $data['country'];
            $new_ip->region_code = $data['region'];
            $new_ip->region_name = $data['regionName'];
            $new_ip->zip_code = $data['zip'];
            $new_ip->time_zone = $data['timezone'];
            $new_ip->latitude = $data['lat'];
            $new_ip->longitude = $data['lon'];
            $new_ip->save();
        }
       
      
    

    }
}