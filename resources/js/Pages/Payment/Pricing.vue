<template>
  <div class="container my-24 px-6 mx-auto">

    <!-- Section: Design Block -->
    <section class="mb-32 text-gray-800">
      <h2 class="text-6xl font-bold text-center mb-6">TopUp </h2>

      <p class="text-center text-3xl mb-12 text-gray-500">

      </p>

      <h3 class=" font-semibold text-gray-900 dark:text-white mb-8">Number Devices:</h3>
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
      </ul>

      <div class="grid lg:grid-cols-5 gap-6 xl:gap-x-12 mt-8">
        <div v-for="(package_product, index) in package_products" :key="index"
          class="mb-6 lg:mb-0 hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div class="block rounded-lg shadow-lg bg-white h-full">
            <div class="p-6 border-b border-gray-300 text-center">
              <p class="uppercase mb-4 text-4xl">
                <strong>{{ package_product.name }}</strong>
                <small class="text-gray-500 text-xl">({{ package_product.package_time }} days)</small>
              </p>
              <h3 class="text-6xl mb-6">
                <strong>$ {{ package_product.price *form.number_device }}</strong>
                <small class="text-gray-500 text-xl">/{{form.number_device}} Device</small>
              </h3>

              <button type="button"  @click="addtoCart(package_product)"
                class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true" data-ripple-color="light">
                <i class="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart
              </button>
            </div>
            <!-- <div class="p-6">
            <ol class="list-inside">
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Unlimited updates
              </li>
            </ol>
          </div> -->
          </div>
        </div>
        <div class="mb-6 lg:mb-0 hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
        <div class="block rounded-lg bg-white h-full border">
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
        </div>
      </div>
        <!-- <div class="mb-6 lg:mb-0 hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
        <div class="block rounded-lg shadow-lg bg-white h-full">
          <div class="p-6 border-b border-gray-300 text-center">
            <p class="uppercase mb-4 text-xl">
              <strong>Basic</strong>
            </p>
            <h3 class="text-2xl mb-6">
              <strong>$ 129</strong>
              <small class="text-gray-500 text-xl">/Device</small>
            </h3>

            <button type="button"
              class="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xl leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full"
              style="background-color: hsl(0, 0%, 95%)" data-mdb-ripple="true" data-ripple-color="primary">
              Buy
            </button>
          </div>
          <div class="p-6">
            <ol class="list-inside">
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Unlimited updates
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Git repository
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>npm installation
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div class="mb-6 lg:mb-0 hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
        <div class="block rounded-lg bg-white h-full border border-blue-600">
          <div class="p-6 border-b border-gray-300 text-center">
            <p class="uppercase mb-4 text-xl">
              <strong>Advanced</strong>
            </p>
            <h3 class="text-2xl mb-6">
              <strong>$ 299</strong>
              <small class="text-gray-500 text-xl">/Device</small>
            </h3>

            <button type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true" data-ripple-color="light">
              Buy
            </button>
          </div>
          <div class="p-6">
            <ol class="list-inside">
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Unlimited updates
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Git repository
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>npm installation
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Code examples
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Premium snippets
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div class="mb-6 lg:mb-0 hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
        <div class="block rounded-lg shadow-lg bg-white h-full">
          <div class="p-6 border-b border-gray-300 text-center">
            <p class="uppercase mb-4 text-xl">
              <strong>Enterprise</strong>
            </p>
            <h3 class="text-2xl mb-6">
              <strong>$ 499</strong>
              <small class="text-gray-500 text-xl">/Device</small>
            </h3>

            <button type="button"
              class="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xl leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out w-full"
              style="background-color: hsl(0, 0%, 95%)" data-mdb-ripple="true" data-ripple-color="primary">
              Buy
            </button>
          </div>
          <div class="p-6">
            <ol class="list-inside">
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Unlimited updates
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Git repository
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>npm installation
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Code examples
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Premium snippets
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Premium support
              </li>
              <li class="mb-4 flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                  class="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                  </path>
                </svg>Drag&amp;Drop builder
              </li>
            </ol>
          </div>
        </div>
      </div> -->
      </div>
    </section>
    <!-- Section: Design Block -->

  </div>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
export default {
  layout: Layout,
  props: {
    package_products: Array,
    errors:Object
  },
  data() {
    return {

      form:this.$inertia.form({
         number_device:2,
         package_product_id: null,
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
     }
  }
}
</script>

<style>

</style>
