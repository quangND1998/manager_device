<template>
  <section class="content">
    <ContentHeaderVue :name="'Applications'" />
    <alert :dismissible="true"></alert>
   
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
      <div class="w-full flex max-w-md mr-4 mb-8 mt-8">
        <input
          v-model="name"
          @keyup="search"
          class="relative w-full px-8 py-3 text-xl rounded-r focus:shadow-outline"
          autocomplete="off"
          type="text"
          name="search"
          placeholder="Search…"
        />
      </div>



    
              
      <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6 text-xl">STT </th>
            <th scope="col" class="py-3 px-6 text-xl">appName</th>
            <th scope="col" class="py-3 px-6 text-xl">Onwer devices</th>
            <th scope="col" class="py-3 px-6 text-xl">packageName</th>
            <th scope="col" class="py-3 px-6 text-xl">icon</th>

            <th scope="col" class="py-3 px-6 text-xl">Version</th>
            <th scope="col" class="py-3 px-6 text-xl">
              Default
            </th>

            <th scope="col" class="py-3 px-6 text-xl">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(application, index) in applications.data"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white"
            >{{ index }}</th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white"
            >{{ application.appName }}</th>

            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white"
            >
              <span
                class="text-2xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded"
                v-if="application.device"
              >{{ application.device.name }}</span>
            </th>

            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white"
            >{{ application.packageName }}</th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white"
            >
              <img :src="`data:image/png;base64,${application.icon}`" width="50px" />
            </th>

            <th
              scope="row"
              class="py-4 px-6 text-gray-900 whitespace-nowrap font-semibold dark:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >{{ application.version }}</th>
            <th
              scope="row"
              class="py-4 px-6 text-gray-900 whitespace-nowrap font-semibold dark:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              <input
                :checked="application.default == 1 ? true : false"
                @change="onChangeDefault(application, $event)"
                class="toggle-class-public"
                type="checkbox"
              />
            </th>

            <td class="py-4 px-6 text-right">
              <!-- <button @click="edit(device)" type="button" data-toggle="modal" data-target="#exampleModal"
                class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Edit</button>
              <button type="button" @click="Delete(device.id)"
              class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Delete</button>-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :links="applications.links" />
  </section>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
import ContentHeaderVue from "@/Components/Layout/ContentHeader";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
export default {
  layout: Layout,
  components: {
    Link,
    ContentHeaderVue,
    Pagination,
    Alert
  },
  props: {
    applications: Object,
    active:String
  },
  data() {
    return {
      name: null,
      default_app:this.active,
      form: this.$inertia.form({
        id: null
      })
    };
  },
  methods: {
    search() {
      this.$inertia.get(
        this.route("application.index"),
        { name: this.name },
        {
          preserveState: true
        }
      );
    },

    onChangeDefault(data, event) {
      if (event.target.checked) {
        this.form.default = 1;
      } else {
        this.form.default = 0;
      }
      let query = {
        id: data.id,
        default: event.target.checked
      };
      this.$inertia.post(route("application.default"), query, {
        preserveState: false
        // only: ["image360s", "errors", 'flash'],
      });
    }
  }
};
</script>

<style>
</style>
