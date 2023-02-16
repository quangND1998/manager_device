<template>
  <div>{{name}}</div>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
export default {
  layout: Layout,
  components: {
    Link
  },
  data(){
    return {
      name:null
    }
  },
  mounted() {
      this.listenEvent();
      // this.getData();
  },
  methods:{
     listenEvent(){

      var self = this;
      window.socketio.on("active-device:App\\Events\\TestEvent", function (e) {
         console.log(e);

      });
      // window.Echo.channel("active-device").listen(
      //   "TestEvent",
      //   e => {
      //     this.name = e.deviceName
      //   }
      // );

      // window.client.subscribe("active-device").bind('App\\Events\\TestEvent', (e)=>{
      //     console.log(e);
      // });
     },
     getData (){
    

    // Tạo một request để truy xuất người dùng ứng với ID cho sẵn:
       axios.get('https://devinfinity.holomia.com/api/v1/player/show/5')
          .then(response =>{
             
              console.log(response);
              // console.log(response.data.entries[1].Description);
        
          }
          
          //    this.posts.response.data.entries
              )
          .catch( error=>{
              // xử trí khi bị lỗi
              console.log(error);
              console.log("123")
          });
        
    }
  }

};
</script>
<style>

</style>
