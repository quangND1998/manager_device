<template>
  <section class="content">
    <ContentHeaderVue :name="'Order '" />
    <alert :dismissible="true"></alert>
    <div class="container mx-auto mt-10">
      <div class="flex shadow-md my-10">
        <div class="w-3/4 bg-white px-10 py-10">
          <div class="flex justify-between border-b pb-8">
            <h1 class="font-semibold text-2xl">Your Cart {{ form.user.name }}</h1>
            
          </div>
            <span class="font-semibold text-2xl uppercase " >Detail</span>
            <div v-if="item !== null" class="flex justify-between border-b pb-8">

                <ul role="list" class="space-y-5 my-7">
                    <li class="flex space-x-3">
                        <span class="text-5xl font-normal leading-tight text-gray-500 dark:text-gray-400"><strong></strong>{{ item.item.name }}</strong></span>
                    </li>
                    <!-- <li class="flex space-x-3">
                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span class="text-2xl font-normal leading-tight text-gray-500 dark:text-gray-400">Number device: <strong> {{ item.number_device }} devices</strong> </span>
                    </li> -->
                    <li class="flex space-x-3">
                        <!-- Icon -->
                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span class="text-2xl font-normal leading-tight text-gray-500 dark:text-gray-400">Price: <strong>$ {{ item.item.price }} / device</strong> </span>
                    </li>
                    <li class="flex space-x-3">
                        <!-- Icon -->
                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span class="text-2xl font-normal leading-tight text-gray-500 dark:text-gray-400">Expiry date:  <strong> {{ item.item.package_time }} days</strong></span>
                    </li>

                </ul>

            </div>
            <div v-else class="flex justify-between border-b pb-8">
                <ul role="list" class="space-y-5 my-7">
                    <li class="flex space-x-3">
                        Empty
                    </li>
                </ul>
            </div>
            <div class="text-red-500" v-if="errors.number_device">{{ errors.number_device }}</div>
            <div class="flex justify-between border-b pb-8" >
                <h3 class=" font-semibold text-gray-900 dark:text-white mb-8">Number Devices:</h3>
                <ul class="items-center w-full text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div class="flex items-center pl-3">
                            <input id="horizontal-list-radio-license"  v-model="form.number_device" v-on:keyup="changeNumberDevice" type="number" placeholder="2"  min="2" name="list-radio" class="p-2 text-2xl w-2/3 bg-gray-100 border-gray-300">
                            <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-2xl font-medium text-gray-900 dark:text-gray-300">Devices </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div id="summary" class="w-1/4 px-8 py-10">
          <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-2xl uppercase">Price </span>
            <span class="font-semibold text-2xl">${{ item.price }}</span>
          </div>

          <div class="py-10">
            <label for="promo" class="font-semibold inline-block mb-3 text-2xl uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-2xl w-full" />
          </div>
          <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-2xl text-white uppercase">Apply</button>
          <div class="border-t mt-8">

            <div class="flex font-semibold justify-between py-6 text-2xl uppercase">
              <span>Discounts</span>
              <span>0 %</span>
            </div>
            <div class="flex font-semibold justify-between py-6 text-2xl uppercase">
              <span>Total cost</span>
              <span>${{ item.price }}</span>
            </div>
            <Link :href="route('topup.checkout')">
                <button
                class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white uppercase w-full"
                >Checkout</button>
            </Link>

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
import Alert from "@/Components/Alert";
import { thisExpression } from "@babel/types";
export default {
  layout: Layout,
  components: {
    Link,
    Alert,
    ContentHeaderVue
  },
  props:{
    item : Object,
    number_device : 2,
    errors:Object
  },
  data() {
    return {
        form:this.$inertia.form({
            user : this.$page.props.auth.user,
            cart : this.cart,
            item : this.item,
            number_device : this.item ? this.item.number_device: this.number_device
        })
    }
  },
  methods:{
    changeNumberDevice(){
        this.form.post(route("topup.updateCart"), {
          preserveState: true,
          onError: errors => {
          },
          onSuccess: page => {
          }
        });
    }
  }
};
</script>

<style>
</style>
