<template>
  <div
    class=""
  >
  <div class="pc min-h-screen  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 background_login">
      <img src="assets/img/banner.jpg" class=" img_login " alt="">
   
      <div class="  text-banner fixed rounded-lg">
        <p class="p-8 " >The Kiosk-mode HoloStartup locks the headset with an app of your choice, and when your headset booted up, it automatically launch that app.
         You can also activate other apps on your headset remotely right on your desktop.</p>
      </div>
      <div class="w-full xl:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg login-section_pc">
        <slot />
      </div>
  </div>
      

     
   <div class="mobile min-h-screen  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 background_login">
      <div class="bg-white  banner_mobile fixed rounded-lg">
        <img src="assets/img/banner.jpg" class=" img_login " alt="">
      </div>
      <div class="w-full xl:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg login-section_mobile">
        <slot />
      </div>
      <div class="  text_banner_mobile fixed rounded-lg shadow-md">
        <p class="p-8 " >The Kiosk-mode HoloStartup locks the headset with an app of your choice, and when your headset booted up, it automatically launch that app.
         You can also activate other apps on your headset remotely right on your desktop.</p>
      </div>
   </div>
     
   
    
  </div>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";

import BreezeApplicationLogo from "@/Components/ApplicationLogo";

export default {
  components: {
    BreezeApplicationLogo,
    Link
  }
};
</script>
<style>
.login-section_pc{
   min-width: 400px;
    font-size: 22px;
  position: absolute;
  background: rgba(255, 255, 255, 0.71);
}
.background_login{
  
  position: fixed;
  top:0;
  right:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: black;
}
.img_login{
  height: 100%;
  width: 100%;
  object-fit: contain;
  position: relative;
}
.text-banner{
    top: 5%;
    width: 400px;
    /* height: 200px;
    background: #f97a1b; */
    text-align: center;
}
.text-banner p{
  font-size:18px;
  color: #fff;
}
.mobile{
  display: none;
}
/* @media all and (max-width:1024px){
 
  .login-section_pc{
    width: 400px !important;
    font-size: 22px;
  position: absolute;
  background: rgba(255, 255, 255, 0.71);
}
.background_login{
  
  position: fixed;
  top:0;
  right:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: black;
}
.img_login{
  height: 100%;
  width: 100%;
  object-fit: contain;
  position: relative;
}
.text-banner{
    top: 5%;
    width: 400px;
    height: 200px;
    background: #f97a1b;
}
.text-banner p{
  font-size:18px;
  color: #fff;
}
.mobile{
  display: none;
}
}
@media all and (max-width:992px){
  
  .login-section_pc{
    width: 400px !important;
    font-size: 22px;
  position: absolute;
  background: rgba(255, 255, 255, 0.71);
}
.background_login{
  
  position: fixed;
  top:0;
  right:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: black;
}
.img_login{
  height: 100%;
  width: 100%;
  object-fit: contain;
  position: relative;
}
.text-banner{
    top: 5%;
    width: 400px;
    height: 200px;
    background: #f97a1b;
}
.text-banner p{
  font-size:18px;
  color: #fff;
}
.mobile{
  display: none;
}
}
@media all and (max-width:800px){
  
  .login-section_pc{
    width: 400px !important;
    font-size: 22px;
  position: absolute;
  background: rgba(255, 255, 255, 0.71);
}
.background_login{
  
  position: fixed;
  top:0;
  right:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: black;
}
.img_login{
  height: 100%;
  width: 100%;
  object-fit: contain;
  position: relative;
}
.text-banner{
    top: 5%;
    width: 400px;
    height: 200px;
    background: #f97a1b;
}
.text-banner p{
  font-size:18px;
  color: #fff;
}
.mobile{
  display: none;
}
}
@media all and (max-width:768px){
 
  .login-section_pc{
    width: 400px !important;
    font-size: 22px;
  position: absolute;
  background: rgba(255, 255, 255, 0.71);
}
.background_login{
  
  position: fixed;
  top:0;
  right:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: black;
}
.img_login{
  height: 100%;
  width: 100%;
  object-fit: contain;
  position: relative;
}
.text-banner{
    top: 5%;
    width: 400px;
    height: 200px;
    background: #f97a1b;
}
.text-banner p{
  font-size:18px;
  color: #fff;
}
.mobile{
  display: none;
}
} */
@media all and (max-width:600px){
  
  .mobile{
    display: block;
  }
  .login-section_mobile{
    width: 400px;
    position: relative;
    margin: auto;
    top: 2%;
    background: rgba(255, 255, 255, 0.71);
  }
  .banner_mobile{
    top: 0%;
    width: 400px;
    height: 250px;
    position: relative;
    margin: auto;
  }
  .banner_mobile img{
    object-fit: cover;
  }
  .text_banner_mobile{
    width: 400px;
    font-size: 18px;
    color: #302828d6;
    margin: auto;
    position: relative;
    top: 4%;
    /* background: #f97a1b; */
    text-align: center;
  }
  .text_banner_mobile{
    font-size:16px;
    color: #fff;
  }
}

/* @media all and (max-width:480px){
 
  .mobile{
    display: block;
  }
  .login-section_mobile{
    width: 400px;
    position: relative;
    margin: auto;
    top: 3%;
    background: rgba(255, 255, 255, 0.71);
  }
  .banner_mobile{
    top: 0%;
    width: 400px;
    height: 250px;
    position: relative;
    margin: auto;
  }
  .banner_mobile img{
    object-fit: cover;
  }
  .text_banner_mobile{
    width: 400px;
    font-size: 18px;
    color: #fff;
    margin: auto;
    position: relative;
    top: 5%;
    background: #f97a1b;
  }
  .text_banner_mobile{
    font-size:18px;
    color: #fff;
  }
}
 @media all and (max-width:320px){
 
  .mobile{
    display: block;
  }
  .login-section_mobile{
    width: 320px;
    position: relative;
    margin: auto;
    top: 3%;
    background: rgba(255, 255, 255, 0.71);
  }
  .banner_mobile{
    top: 0%;
    width: 320px;
    height: 250px;
    position: relative;
    margin: auto;
  }
  .banner_mobile img{
    object-fit: cover;
  }
  .text_banner_mobile{
    width: 320px;
    font-size: 18px;
    color: #302828d6;
    margin: auto;
    position: relative;
    top: 5%;
  }
  .text_banner_mobile{
    font-size:16px;
    color: #302828d6;
  }
} */

/* @media all and (max-width:600px){
  
  .mobile{
    display: block;
  }
  .login-section_mobile{
      min-width: 300px !important;
      font-size: 18px;
      top:33%;
    position: absolute;
    background: rgba(255, 255, 255, 0.71);
  }
  .banner_mobile{
      top: 0%;
      width: 100%;
      height: 250px;
  }
  .banner_mobile img{
    object-fit: cover;
  }
  .text_banner_mobile{
    bottom: 0%;
      width: 100%;
      height: 200px;
  }
  .text_banner_mobile{
    font-size:18px;
    color: #302828d6;
  }
} */
/* @media all and (max-width:480px){
 
  .mobile{
    display: block;
  }
  .login-section_mobile{
      min-width: 300px !important;
      font-size: 18px;
      top:33%;
    position: absolute;
    background: rgba(255, 255, 255, 0.71);
  }
  .banner_mobile{
      top: 0%;
      width: 100%;
      height: 250px;
  }
  .text_banner_mobile{
    bottom: 0%;
      width: 100%;
      height: 200px;
  }
  .text_banner_mobile{
    font-size:18px;
    color: #302828d6;
  }
}
  @media all and (max-width:320px){
  
  .mobile{
    display: block;
  }
  .login-section_mobile{
      min-width: 300px !important;
      font-size: 18px;
      top:32%;
    position: absolute;
    background: rgba(255, 255, 255, 0.71);
  }
  .banner_mobile{
      top: 5%;
      width: 320px;
      height: 200px;
  }
  .text_banner_mobile{
    bottom: 0%;
      width: 320px;
      height: 200px;
  }
  .text_banner_mobile{
    font-size:16px;
    color: #302828d6;
  }
} */

</style>
