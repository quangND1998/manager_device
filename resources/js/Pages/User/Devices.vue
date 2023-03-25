<template>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
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
                    <th scope="col" class="py-3 px-6 text-xl">No</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">name</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">device ID</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Brand</th>


                    <th scope="col" class="py-3 px-6 text-xl uppercase">Battery</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Active</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Default App</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Time Update</th>
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

                            <img class="w-15 h-15 rounded-full " :src="device.default_app.icon" alt="Rounded avatar">
                        </div>
                        <div class="text-center pt-2" v-if="device.default_app"><strong class="justify-center ">{{
                            device.default_app.appName
                        }}</strong></div>
                    </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{{ formatDate(device.updated_at) }}</th>



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

        }

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
    }
}
</script>

<style></style>