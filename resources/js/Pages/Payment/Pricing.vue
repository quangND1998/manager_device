<template>
  <div class="container my-24 px-6 mx-auto">

    <!-- Section: Design Block -->
    <section class="mb-32 text-gray-800">
      <h2 class="text-6xl font-bold text-center mb-40">Choose your plan </h2>

      <p class="text-center text-3xl mb-12 text-gray-500">

      </p>

      <!-- <h3 class=" font-semibold text-gray-900 dark:text-white mb-8">Number Devices:</h3>
      <ul class="items-center w-full text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-license" v-model="form.number_device" type="radio" value="2" name="list-radio" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-2xl font-medium text-gray-900 dark:text-gray-300">2 Devices </label>
              </div>
          </li>
          <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-id" type="radio" v-model="form.number_device" value="4" name="list-radio" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="horizontal-list-radio-id" class="w-full py-3 ml-2 text-2xl font-medium text-gray-900 dark:text-gray-300">4 Devices</label>
              </div>
          </li>
          <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-millitary" v-model="form.number_device" type="radio" value="8" name="list-radio" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="horizontal-list-radio-millitary" class="w-full py-3 ml-2 text-2xl font-medium text-gray-900 dark:text-gray-300">8 Devices</label>
              </div>
          </li>
          <li class="w-full dark:border-gray-600">
              <div class="flex items-center pl-3">
                  <input id="horizontal-list-radio-passport" v-model="form.number_device" type="radio" value="10" name="list-radio" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                  <label for="horizontal-list-radio-passport" class="w-full py-3 ml-2 text-2xl font-medium text-gray-900 dark:text-gray-300">10 Devices</label>
              </div>
          </li>
      </ul> -->

      <div class="grid lg:grid-cols-3 gap-6 xl:gap-x-12 mt-20">
        <div v-for="(package_product, index) in package_products" :key="index"
          class="lg:mb-0 hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer mb-40">
          <div class="block rounded-lg shadow-lg bg-white h-full">
            <div class="p-6  text-center">
              <p class="uppercase mb-8 text-4xl">
                <strong>{{ package_product.name }}</strong>
                <small class="text-gray-500 text-xl"></small>
              </p>
              <h3 v-if="package_product.price == 0 || package_product.name == 'Demo'" class="text-6xl mb-6">
                <strong>$ {{ package_product.price }}</strong> <br>
                <small class="text-gray-500 text-4xl"> Unlimited devices </small>
              </h3>
              <h3 v-else class="text-6xl mb-6">
                <strong>$ {{ package_product.price  }}</strong> <br>
                <small class="text-gray-500 text-xl"> Per month, per device</small>
              </h3>
              <div class="p-6">
                <ol v-if="package_product.price == 0 " class="list-inside text-left">

                    <li class="mb-4 flex items-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                        class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                        </path>
                        </svg>
                        <p > For Holomia Apps (Mission X and Infinity)</p>

                    </li>
                    <li class="mb-4 flex items-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                        class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                        </path>
                        </svg>Launch Apps Remotely
                    </li>
                    <li class="mb-4 flex items-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                        class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                        </path>
                        </svg>Kiosk Mode
                    </li>
                </ol>


                <ol v-else class="list-inside text-left">
                    <div>
                        <li class="mb-4 flex items-center">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                            class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                            </path>
                            </svg>30 days trial, unlimited devices
                        </li>
                    </div>
                    <li class="mb-4 flex items-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                        class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                        </path>
                        </svg>Launch Apps Remotely
                    </li>
                    <li class="mb-4 flex items-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                        class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                        </path>
                        </svg>Kiosk Mode
                    </li>

                    <div v-if="package_product.name == 'Pro'">
                        <li class="mb-4 flex items-center">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                            class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                            </path>
                            </svg>App & File Distribution
                        </li>
                        <li class="mb-4 flex items-center">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                            class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                            </path>
                            </svg>Device Tracking & Reporting
                        </li>
                        <li class="mb-4 flex items-center">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                            class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                            </path>
                            </svg>More function coming soon
                        </li>
                        <li class="mb-4 flex items-center">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                            class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                            </path>
                            </svg>More function coming soon
                        </li>
                    </div>

                </ol>
            </div>

            </div>

          </div>

                <button v-if="package_product.name == 'Free'" type="button"  disabled
                class="mt-5 inline-block p-8  bg-gray-400 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true" data-ripple-color="light"> Your Account Default
              </button>

               <button v-else-if="$page.props.auth.user.active_demo == 0 && package_product.name == 'Standard'" type="button"
                class="mt-5 inline-block p-8  mr-5 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true" data-ripple-color="light"
                data-toggle="modal" data-target="#exampleModalTopup"
                >
                    Get Your 30 days Trial
              </button>
              <button v-else-if="$page.props.auth.user.active_demo == 1 && package_product.name == 'Standard'" type="button" @click="addtoCart(package_product)"
                class="mt-5 inline-block p-8  mr-5 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true" data-ripple-color="light"
                >
                Add to Cart
              </button>
                <button v-else type="button"  @click="addtoCart(package_product)" disabled
                    class="mt-5 inline-block p-8  mr-5 bg-gray-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true" data-ripple-color="light">
                    Get Your 30 days Trial
                </button>

              <!-- model -->

        </div>
        <div class="mb-6 lg:mb-0 hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
        <!-- <div class="block rounded-lg bg-white h-full border">
          <div class="p-6 border-b border-gray-300 text-center">
            <p class="uppercase mb-4 text-4xl">
              <strong>More</strong>
            </p>

            <button type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true" data-ripple-color="light">
              Contact with us
            </button>
          </div>
        </div> -->
      </div>

      </div>
      <div class="modal fade" id="exampleModalTopup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h1 class="modal-title text-4xl" id="exampleModalLabel"><Strong> Free Trial </Strong></h1>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                                <div class="form-group">
                                    Please confirm to use Free of charge the Kiosk mode HoloStartup for 30 days, unlimited devices
                                </div>
                                <div class="text-red-500" v-if="errors.devices">{{ errors.devices }}</div>
                                <div class="modal-footer">
                                    <button type="button"
                                        class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                                        data-dismiss="modal">Cancel</button>
                                    <button @click="trielfree()" type="submit" data-dismiss="modal"
                                        class="inline-block px-6 py-2.5 bg-green-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-green-900 hover:shadow-lg focus:bg-green-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
                                        OK</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
    <!-- Section: Design Block -->

  </div>

</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
import OpenAppModal from "@/Pages/Devices/Modal/OpenAppModal";
export default {
  layout: Layout,
  components:{
    OpenAppModal
  },
  props: {
    package_products: Array,
    errors:Object
  },
  data() {
    return {
      form:this.$inertia.form({
         number_device:1,
         package_product_id: null,
         user : this.$page.props.auth.user,
      })
    }
  },

  methods:{
     addtoCart(data){
       this.form.package_product_id = data.id;
       this.form.post(route("topup.addToCart"), {
          preserveState: true,
          onError: errors => {
          },
          onSuccess: page => {
          }
        });
     },
     trielfree(){
        this.form.post(route("topup.free"), {
          preserveState: true,
          onError: errors => {
          },
          onSuccess: page => {
          }
        });
     }
  }
}
</script>

<style>

</style>
