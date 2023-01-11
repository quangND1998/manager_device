<template>
  <section class="content">
    <ContentHeaderVue :name="'Order '" />
    <alert :dismissible="true"></alert>
    <div class="container mx-auto mt-10">
      <div class="flex shadow-md my-10">
        <div class="w-3/4 bg-white px-10 py-10">
          <div class="flex justify-between border-b pb-8">
            <h1 class="font-semibold text-2xl">Your Cart</h1>
            
          </div>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-2xl uppercase">Price </span>
            <span class="font-semibold text-2xl">{{oldCart.totalPrice}} $</span>
          </div>

          <span class="font-semibold text-2xl uppercase " >Detail</span>  
          <div class="flex justify-between border-b pb-8">
       
          <ul role="list" class="space-y-5 my-7">
            <li class="flex space-x-3">
                <!-- Icon -->
                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="text-2xl font-normal leading-tight text-gray-500 dark:text-gray-400">{{oldCart.name}}</span>
            </li>
            <li class="flex space-x-3">
                <!-- Icon -->
                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="text-2xl font-normal leading-tight text-gray-500 dark:text-gray-400">Number device: <strong>{{oldCart.number_device}} devices</strong> </span>
            </li>
            <li class="flex space-x-3">
                <!-- Icon -->
                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="text-2xl font-normal leading-tight text-gray-500 dark:text-gray-400">Price: <strong>$ {{oldCart.totalPrice}}</strong> </span>
            </li>
            <li class="flex space-x-3">
                <!-- Icon -->
                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="text-2xl font-normal leading-tight text-gray-500 dark:text-gray-400">Expiry date:  <strong> {{oldCart.package_time}} days</strong></span>
            </li>
           
        </ul>
        
        </div>
         
     
          <a href="#" class="flex font-semibold text-indigo-600 text-2xl mt-10">
            <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path
                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
              />
            </svg>
            Continue Shopping
          </a>
        </div>

        <div id="summary" class="w-1/4 px-8 py-10">
          <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-2xl uppercase">Price </span>
            <span class="font-semibold text-2xl">{{oldCart.totalPrice}} $</span>
          </div>
         
          <div class="py-10">
            <label for="promo" class="font-semibold inline-block mb-3 text-2xl uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-2xl w-full" />
          </div>
          <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-2xl text-white uppercase">Apply</button>
          <div class="border-t mt-8">

            <div class="flex font-semibold justify-between py-6 text-2xl uppercase">
              <span>Discounts</span>
              <span>{{ oldCart.discounts }} %</span>
            </div>
            <div class="flex font-semibold justify-between py-6 text-2xl uppercase">
              <span>Total cost</span>
              <span>$ {{oldCart.totalPrice}}</span>
            </div>
            <button
              class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-2xl text-white uppercase w-full"
            >Checkout</button>
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
export default {
  layout: Layout,
  components: {
    Link,
    Alert,
    ContentHeaderVue
  },
  props:{
    oldCart:Object
  }
};
</script>

<style>
</style>