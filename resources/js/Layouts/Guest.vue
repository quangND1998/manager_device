<template>
  <div
    class=""
  >
  <div class="pc min-h-screen  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 background_login">
    
      <img src="assets/img/banner.jpg" class=" img_login " alt="">
      <div class="pc_content">
        <div class="  text-banner rounded-lg">
          <p class="p-8 " >The Kiosk-mode HoloStartup locks the headset with an app of your choice, and when your headset booted up, it automatically launch that app.
            You can also activate other apps on your headset remotely right on your desktop. 
            <br>HoloStartup works on Pico, Vive Focus, and Meta Quest headsets</br></p>
        </div>
        <div class="w-full xl:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg login-section_pc">
          <slot />
        </div>
      </div>
      
  </div>
      

     
   <div class="mobile min-h-screen  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 background_login_mobile">
      <div class="bg-white  banner_mobile fixed rounded-lg">
        <img src="assets/img/banner.jpg" class=" img_login " alt="">
      </div>
      <div class="w-full xl:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg login-section_mobile">
        <slot />
      </div>
      <div class="  text_banner_mobile fixed rounded-lg shadow-md">
        <p class="p-8 " >The Kiosk-mode HoloStartup locks the headset with an app of your choice, and when your headset booted up, it automatically launch that app.
         You can also activate other apps on your headset remotely right on your desktop. 
         <br>HoloStartup works on Pico, Vive Focus, and Meta Quest headsets</br></p>
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
  max-width: 400px;
  width: 40% !important;
    font-size: 22px;
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
  background: #2a2b36;
}
.img_login{
  height: 100%;
  width: 100%;
  object-fit: contain;
  position: relative;
}
.pc_content{
  position: fixed;
    top: 6%;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    align-items: center;
}
.text-banner{
  width: 35%;
    text-align: center;
    margin-bottom: 5%;
}
.text-banner p{
  font-size:18px;
  color: #fff;
}
.pc{
    display: block;
  }
.mobile{
  display: none;
}

@media all and (max-width:992px){
  .background_login_mobile{
  background: #2a2b36;
  position: relative;
  top:0;
  right:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
  .mobile{
    display: block;
  }
  .pc{
    display: none;
  }
  .login-section_mobile{
    width: 70%;
    position: relative;
    margin: auto;
 
    margin-top:10px;
    background: rgba(255, 255, 255, 0.71);
  }
  .banner_mobile{
  
    width: 71%;
    height: 100%;
    position: relative;
    margin: auto;
  }
  .banner_mobile img{
    object-fit: cover;
  }
  .text_banner_mobile{
    width: 70%;
    font-size: 18px;
    color: #302828d6;
    margin: auto;
    position: relative;

    margin-top:10px;
   
    text-align: center;
  }
  .text_banner_mobile{
    font-size:16px;
    color: #fff;
  }
}
</style>