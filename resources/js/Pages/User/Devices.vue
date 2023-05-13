<template>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
        <button type="button" @click="FreshDevice()"
            class="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-2xl leading-tight  rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"><i
                class="fa fa-refresh mr-2" aria-hidden="true"></i>Active devices</button>
        <div class="w-full  mb-8 mt-8 flex justify-between ">
            <div>
                <input v-model="term" @keyup="search"
                    class="relative w-full px-8 py-3 text-xl rounded-md focus:shadow-outline" autocomplete="off" type="text"
                    name="search" placeholder="Search…" />
            </div>
        </div>
        <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xl text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th @click="sortValue('id')" scope="col" class="py-3 px-6 text-xl">
                        <i class="fa fa-arrow-up"
                            :class="[(sortDirection === 'asc' && sort == 'id') ? 'text-gray-800' : 'text-gray-300']">
                        </i>
                        <i class="fa fa-arrow-down"
                            :class="[(sortDirection === 'desc' && sort == 'id') ? 'text-gray-800' : 'text-gray-300']">
                        </i>
                        No
                    </th>
                    <th @click="sortValue('name')" scope="col" class="py-3 px-6 text-xl uppercase">
                        <i class="fa fa-arrow-up"
                            :class="[(sortDirection === 'asc' && sort == 'name') ? 'text-gray-800' : 'text-gray-300']">
                        </i>
                        <i class="fa fa-arrow-down"
                            :class="[(sortDirection === 'desc' && sort == 'name') ? 'text-gray-800' : 'text-gray-300']">
                        </i>name</th>
                    <th @click="sortValue('device_id')" scope="col" class="py-3 px-6 text-xl uppercase">
                        <i class="fa fa-arrow-up"
                            :class="[(sortDirection === 'asc' && sort == 'device_id') ? 'text-gray-800' : 'text-gray-300']">
                        </i>
                        <i class="fa fa-arrow-down"
                            :class="[(sortDirection === 'desc' && sort == 'device_id') ? 'text-gray-800' : 'text-gray-300']">
                        </i>device ID</th>
                    <th   @click="sortValue('brand')"  scope="col" class="py-3 px-6 text-xl uppercase">
                        <i class="fa fa-arrow-up"
                            :class="[(sortDirection === 'asc' && sort == 'brand') ? 'text-gray-800' : 'text-gray-300']">
                        </i>
                        <i class="fa fa-arrow-down"
                            :class="[(sortDirection === 'desc' && sort == 'brand') ? 'text-gray-800' : 'text-gray-300']">
                        </i>Brand</th>


                    <th  @click="sortValue('battery')" scope="col" class="py-3 px-6 text-xl uppercase">
                        <i class="fa fa-arrow-up"
                            :class="[(sortDirection === 'asc' && sort == 'battery') ? 'text-gray-800' : 'text-gray-300']">
                        </i>
                        <i class="fa fa-arrow-down"
                            :class="[(sortDirection === 'desc' && sort == 'battery') ? 'text-gray-800' : 'text-gray-300']">
                        </i>Battery</th>
                    <th  @click="sortValue('active')" scope="col" class="py-3 px-6 text-xl uppercase">
                        <i class="fa fa-arrow-up"
                            :class="[(sortDirection === 'asc' && sort == 'active') ? 'text-gray-800' : 'text-gray-300']">
                        </i>
                        <i class="fa fa-arrow-down"
                            :class="[(sortDirection === 'desc' && sort == 'active') ? 'text-gray-800' : 'text-gray-300']">
                        </i>Active</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Default App</th>
                    <th  @click="sortValue('updated_at')" scope="col" class="py-3 px-6 text-xl uppercase">
                        <i class="fa fa-arrow-up"
                            :class="[(sortDirection === 'asc' && sort == 'updated_at') ? 'text-gray-800' : 'text-gray-300']">
                        </i>
                        <i class="fa fa-arrow-down"
                            :class="[(sortDirection === 'desc' && sort == 'updated_at') ? 'text-gray-800' : 'text-gray-300']">
                        </i>Time Update</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(device, index) in devices.data" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                        devices.current_page == 1 ? index + 1 : (devices.current_page - 1) * devices.per_page + index + 1
                    }}

                    </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ device.name }}</th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                        device.device_id
                    }}</th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><span
                            class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{{
                                device.brand
                            }}</span>
                    </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><i
                            class="fa fa-battery-full" aria-hidden="true"></i>{{ (device.battery * 100) }} %</th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <span v-if="device.active"
                            class="text-xl inline-block py-2 px-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded-full"></span>
                        <span v-else
                            class="text-xl inline-block py-2 px-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-400 text-gray-800 rounded-full"></span>
                    </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                        <div class=" relative w-fit block m-auto" v-if="device.default_app">

                            <img class=" rounded-full "  width="50px" :src="device.default_app.icon" alt="Rounded avatar">
                        </div>
                        <div class="text-center pt-2" v-if="device.default_app"><strong class="justify-center ">{{
                            device.default_app.appName
                        }}</strong></div>
                    </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                        device.last_login ? formatDate(device.last_login.created_at) : null }}</th>



                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Layout from "@/Pages/User/Layout";
export default {
    layout: Layout,
    props: {
        user: Object,
        devices: Object
    },
    data() {
        return {
            term: null,
            sort: this.sortBy,
            sortDirection: 'asc',

        }

    },
    mounted() {
        this.listenActiveDevice();
    },
    methods: {
        search() {
            this.$inertia.get(
                this.route("user.devices.index", this.user.id),
                { term: this.term },
                {
                    preserveState: true
                }
            );
        },
        listenActiveDevice() {
            var self = this;
            this.devices.data.map(element => {
                window.socketio.on(`recive-active-device.${element.device_id}:App\\Events\\ReciveActiveDeviceEvent`, function (e) {
                    console.log(e)
                    let index = self.devices.data.findIndex(x => x.device_id == e.device_id);
                    if (index !== -1) {
                        self.devices.data[index].active = true
                        self.devices.data[index].battery = e.battery
                    }
                    // console.log(index)
                    // if(element.device_id === e.device_id){
                    //   self.map
                    //   element.active =true;
                    //   console.log(element)
                    //   // element.battery = e.battery
                    // }
                });
            })

        },
        FreshDevice() {
            const query = {
                user_id: this.user.id
            }
            this.$inertia.post(route('device.checkActiveDevice', query)),
            {
                preserveState: true
            }
        },
        sortValue: function (s) {
            if (s === this.sort) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            }
            this.sort = s;

            this.$inertia.get(
                this.route("user.devices.index", this.user.id),
                { sortBy: this.sort, sortDirection: this.sortDirection, page: this.devices.current_page },
                {
                    preserveState: true,
                    preserveScroll:true
                }
            );
        },
    }
}
</script>

<style></style>