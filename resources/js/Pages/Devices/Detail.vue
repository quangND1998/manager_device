<template>
    <section class="content">
        <ContentHeaderVue :name="'Device Dtail'" />

        <div class="my-4 flex">
            <div class="mr-3" v-if="device">

                <img v-if="device.brand == 'oculus'" src="/assets/img/quest2.png" alt />
                <!-- <img v-if="device_show.name =='Oculus Quest'" src="../assets/image/quest1.jpg" alt /> -->
                <img v-if="device.brand == 'Pico'" src="/assets/img/pico_3.jpg" alt />
                <!-- <img v-if="device_show.name =='Pico 4'" src="../assets/image/pico_4.jpg" alt />     -->
                <!-- <img v-if="device_show.brand =='go'" src="../assets/image/oculus_go.jpg" alt />  -->

            </div>
            <div class="mx-3 text-left" v-if="device">
                <div class="flex">
                    <h2 class="text-4xl font-semibold">{{ device.name }} </h2>
                        <i class="fa fa-repeat mt-2 ml-4 text-blue-500 cursor-pointer" aria-hidden="true" 
                       title="Update Device" @click="updateApplication(device.id)"></i>
                </div>


                <p class="text-xl text-gray-400 my-2">Serial Number</p>
                <p class="my-2 text-xl font-semibold">{{ device.device_id }}</p>
                <div class="flex my-2">
                    <span v-if="device.active"><i class="fa fa-circle ml-2 icon_on mr-1" style="color: #23cd26"
                            aria-hidden="true"></i>
                        On</span>
                    <span v-else><i class="fa fa-circle ml-2 icon_on mr-1" style="color: #8a8c8f"
                            aria-hidden="true"></i>Off</span>
                    <div class="flex mx-2">
                        <i class="fa fa-wifi ml-2" aria-hidden="true"></i>
                        <span class="text-xl ml-1">{{ device.connect_wifi }} </span>
                    </div>
                    <div class="mx-2">
                        <i class="fa fa-battery-full ml-2" aria-hidden="true"></i>
                        <span class="text-xl ml-1">{{ device.battery * 100 }} %</span>
                    </div>
                </div>

            </div>
        </div>


        <div class="form_search my-3 w-1/4">
            <form>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input type="search" id="default-search" v-model.trim="search"
                        class="block w-full py-2 pl-5 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search" required />
                </div>
            </form>
        </div>
        <div class="flex flex-col rounded-lg border bg-white" style="height: 60vh">
            <div class="overflow-x-auto">
                <div class="inline-block min-w-full">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-left text-xl font-light">
                            <thead class="border-b font-medium bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-4 text-xl">
                                        ID
                                        <!-- <font-awesome-icon :icon="['fas', 'arrow-down']" /> -->
                                    </th>
                                    <th scope="col" class="px-6 py-4 text-xl">
                                        Applications
                                        <!-- <font-awesome-icon :icon="['fas', 'arrow-down']" /> -->
                                    </th>
                                    <th scope="col" class="px-6 py-4 text-xl">
                                        Version
                                        <!-- <font-awesome-icon :icon="['fas', 'arrow-down']" /> -->
                                    </th>
                                    <th scope="col" class="px-6 py-4 text-xl">
                                        App Icon
                                        <!-- <font-awesome-icon :icon="['fas', 'arrow-down']" /> -->
                                    </th>
                                    <th scope="col" class="px-6 py-4 text-xl">
                                        Status
                                        <!-- <font-awesome-icon :icon="['fas', 'arrow-down']" /> -->
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-t" v-for="(item, index) in filteredItemDevice" :key="index">
                                    <td class="whitespace-nowrap px-6 py-4">{{ index + 1 }}</td>
                                    <td
                                        class="whitespace-nowrap px-6 py-4 text-base text-black font-semibold name_device_col">
                                        {{ item.appName }}
                                        <p class="text-xl">{{ item.packageName }}</p>
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                        {{ item.version }}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 flex">
                                        <img :src="item.icon" class="w-12 h-12" alt="" />
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                        <i class="fa fa-circle ml-2 icon_on mr-1" size="xs"
                                            style="color: #23cd26; width: 8px" aria-hidden="true"></i>

                                        Installed
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
import ContentHeaderVue from "@/Components/Layout/ContentHeader";

export default {
    layout: Layout,
    props: {
        device: Object
    },
    components: {
        ContentHeaderVue,
        Link
    },
    data() {
        return {
            search: ''
        }
    },
    mounted(){
        this.listenActiveDevice();
        this.listenUpdateAppDevice();
    },
    computed: {


        filteredItemDevice() {
            return this.device && this.device.applications
                ? this.device.applications.filter((app) =>
                    app.appName
                        .toLowerCase()
                        .includes(this.search.toLowerCase())
                )
                : this.device.applications;
        },
    },
    methods:{
        listenActiveDevice() {
            var self = this;

            if (this.device) {
                var device_socket = this.device
                this.sockets.subscribe(`recive-active-device.${this.device.device_id}:App\\Events\\ReciveActiveDeviceEvent`, (data) => {
                    this.device.active =true;
                    this.device.battery= data.battery
                    this.sockets.unsubscribe(`recive-active-device.${device_socket.device_id}:App\\Events\\ReciveActiveDeviceEvent`);
                });
            }
        },
        listenUpdateAppDevice() {
            var self = this;
            if (this.device) {
                var device = this.device_show
                this.sockets.subscribe(`recive-update-application-device.${this.device.device_id}:App\\Events\\ReciveUpdateApplicationEvent`, (data) => {
                
                    if (data.device_id == device.device_id) {
                        console.log(data)
                        this.getDevice(data.device_id)
                        // this.$store.dispatch('stores/listenUpdateApp', device.device_id)
                        this.sockets.unsubscribe(`recive-update-application-device.${this.device.device_id}:App\\Events\\ReciveUpdateApplicationEvent`)
              
                    }
                
             
                })
            }
          
        },

        updateApplication(id) {
            axios
                .get(`/devices/send-update-device/${id}`)
                .then(response => {
                    if (response.status == 200) {
                    console.log('updateApplication',response.data.device_id);
                }
                })
                .catch(error => {}); 
        },
        getDevice(device_id){
           
            this.$inertia.get(
                this.route("device.find-device", device_id),
                {
                preserveState: true
                }
      );
        }
    },
    destroyed() {
      
      this.sockets.unsubscribe(`recive-active-device.${this.device.device_id}:App\\Events\\ReciveActiveDeviceEvent`)
       this.sockets.unsubscribe(`recive-update-application-device.${this.device.device_id}:App\\Events\\ReciveUpdateApplicationEvent`)
   },
   beforeDestroy(){
       // this.$store.commit('stores/resetDeviceDetail')
       this.sockets.unsubscribe(`recive-update-application-device.${this.device.device_id}:App\\Events\\ReciveUpdateApplicationEvent`)
   }
}
</script>

<style></style>