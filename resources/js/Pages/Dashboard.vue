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
  },
  methods:{
     listenEvent(){
      window.Echo.channel("active-device").listen(
        "TestEvent",
        e => {
          this.name = e.deviceName
        }
      );

      window.client.subscribe("active-device").bind('App\\Events\\TestEvent', (e)=>{
          console.log(e);
      });
     }
  }

};
</script>
<style>

</style>
