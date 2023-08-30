<template>
  <div class="">
    <div class="pc min-h-screen  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 background_login">
      <img src="assets/img/banner.jpg" class=" img_login " alt="">
      <div class="pc_content" id="pc_content">
        <div class="  text-banner rounded-lg form_login" id="text_banner_pc">
          <p class="p-8 " id="text_banner" >Holomia XR is a VR Device Management Software,
            <br>you can remotely manage headset, app, game launches, time limits etc… </br>
            <br>so easy for operate your VR arcade with Holomia XR</br>
          </p>
        
          <!-- <br> </br>
          <br> </br> -->
      
        </div>
        <div class="w-full  mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg login-section_pc form_login">
          <slot />
        </div>
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
  },
  
};

    
</script>
<style>
.login-section_pc{

  width: 80%;
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
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-content: space-around;
    align-items: center;
}
.text-banner{
  width: 80%;
    text-align: center;
    margin-bottom: 8%;
}
.text-banner p{
  font-size:18px;
  color: #fff;
}
.pc{
    display: block;
  }


  @media all and (max-width:1300px){
    .text-banner {
    width: 70%;
    margin-bottom:0%;
    }
    .login-section_pc{
      width: 70%;
    }
  }
@media all and (max-width:992px){
  .background_login{
  background: #2a2b36;
  position: relative;
  top:0;
  right:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 2;

}
.pc_content{
  display: flex;
   flex-direction: column;
   position: relative;
   top: 0%; 
    left: 0%;
     transform: translate(0%, 0%);
}
.pc_content .form_login:nth-of-type(1){
  order: 2;
}
.login-section_pc{
  width: 70%;
  max-width: auto;
}
.img_login{
  margin: auto;
  width: 70% !important;
}
.text-banner {
    width: 70%;
    margin-top:10px;
    margin-bottom:0;
}

  
  
}
</style>