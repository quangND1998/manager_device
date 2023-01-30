<template>
   <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
 
        <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xl text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-6 text-xl">No</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Device</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Time Login</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Country</th>
                    <th scope="col" class="py-3 px-6 text-xl uppercase">Region</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(history, index) in histories.data" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                        index
                    }}
                    </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ history.device ? history.device.name:null }}
                       </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {{ formatDate(history.time_login) }}</th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><span
                            class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{{ history.ipaddress ? history.ipaddress.country_code :null }}</span>
                    </th>
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><span
                            class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{{ history.ipaddress ? history.ipaddress.region_name :null }}</span>
                    </th>
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
        histories: Object
    },
}
</script>

<style>

</style>