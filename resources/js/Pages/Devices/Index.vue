<template>
  <section class="content">
    <ContentHeaderVue :name="'Devices'" />
    <alert :dismissible="true"></alert>
    <!-- <WifiModel :errors="errors" :ids="selected" :wifis="wifis" /> -->
    <OpenAppModal v-if="hasAnyPermission(['Lite'])" :errors="errors" :applications="applications" :ids="selected" />
    <OpenAppModal v-else :errors="errors" :applications="application_deivce" :ids="selected" />
 
    <GroupModel :errors="errors" :ids="selected" />
    <defaulAppModal v-if="hasAnyPermission(['Lite'])" :errors="errors" :applications="applications" :ids="selected" />
    <defaulAppModal  v-else :errors="errors" :applications="application_deivce" :ids="selected" />
    <!-- Modal -->



    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" v-if="editMode">Update Device Name</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="form-group" :class="errors.name ? 'is-valid' : ''">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control text-xl" :class="errors.name ? 'is-valid' : ''"
                  v-model="form.name" id="recipient-name" />
                <div class="text-red-500" v-if="errors.name">{{ errors.name }}</div>
              </div>
              <div class="modal-footer">
                <button type="button"
                  class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                  data-dismiss="modal">Close</button>
                <button @click.prevent="save()" type="submit"
                  class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Save
                  changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full  mb-8 mt-8 flex justify-between ">
      <div>
        <input v-model="term" @keyup="search" class="relative w-full px-8 py-3 text-xl rounded-r focus:shadow-outline"
          autocomplete="off" type="text" name="search" placeholder="Search…" />
      </div>
      <div>

        <div class="dropdown">
          <button
            class="inline-block px-8 py-3 bg-gray-300 text-gray-700 font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-ou dropdown-toggle"
            type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Control Device
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu shadow-md " aria-labelledby="dropdownMenu1">
            <li><button type="button" class="btn btn-secondary" :disabled="lauchDisabled" data-toggle="modal"
                data-target="#defaultAppModal"><i class="fa fa-cog mr-2" aria-hidden="true"></i>Set Default App</button>
            </li>
            <li><button type="button" class="btn btn-secondary" :disabled="lauchDisabled" data-toggle="modal"
                data-target="#openAppModal"><i class="fa fa-rocket mr-2" aria-hidden="true"></i>LauchApp</button></li>
       
            <!-- <li><button type="button" class="btn btn-secondary" :disabled="lauchDisabled" data-toggle="modal"
                data-target="#WifiModal"><i class="fa fa-wifi mr-2" aria-hidden="true"></i>Wifi</button></li> -->
            <!-- <li><button  type="button"   class="btn btn-secondary" :disabled="lauchDisabled" data-toggle="modal" data-target="#groupModal" ><i class="fa fa-folder-o mr-2" aria-hidden="true"></i>Group </button></li> -->
            <!-- <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li> -->
          </ul>
        </div>

      </div>
    </div>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">





      <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xl text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6 text-xl"><input type="checkbox" id="check_all" v-model="selectAll"></th>
            <th scope="col" class="py-3 px-6 text-xl">No</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase">name</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase">device ID</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase">Brand</th>

            <!-- <th scope="col" class="py-3 px-6 text-xl">Os Version</th> -->
            <th scope="col" class="py-3 px-6 text-xl uppercase">Battery</th>
            <!-- <th scope="col" class="py-3 px-6 text-xl uppercase">Connect Wifi</th> -->
            <th scope="col" class="py-3 px-6 text-xl uppercase">Default App</th>

            <th scope="col" class="py-3 px-6 text-xl uppercase">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(device, index) in devices" :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input
                type="checkbox" class="checkbox" v-model="selected" :value="device.id"></td>
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index }}
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

            <!-- <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ device.os_version }}</th> -->
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><i
                class="fa fa-battery-full" aria-hidden="true"></i>{{ (device.battery * 100) }} %</th>
            <!-- <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><span
                v-if="device.connect_wifi"
                class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-600 text-white rounded"><i
                  class="fa fa-wifi  mr-2" aria-hidden="true"></i>{{
                    device.connect_wifi
                  }}</span>
              <p v-else>Not Connect</p>
            </th> -->
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
              <div class=" relative w-fit block m-auto"  v-if="device.default_app">
                <div
                  class="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-2.5 text-xl leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-400 text-white rounded-full z-10">
                  <i class="fa fa-times" aria-hidden="true" title="Disable Default App" @click="disableDefaultApp(device.id)" ></i></div>
                <img class="w-15 h-15 rounded-full "
                  :src="`data:image/png;base64,${device.default_app.icon}`" alt="Rounded avatar">
              </div>
              <div class="text-center pt-2"  v-if="device.default_app" ><strong class="justify-center ">{{ device.default_app.appName }}</strong></div>
            </th>
            <td class="py-4 px-6 text-right">
              <button @click="edit(device)" type="button" data-toggle="modal" data-target="#exampleModal"
                class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Edit Name</button>
              <button type="button" @click="Delete(device.id)"
                class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <pagination :links="devices.links" /> -->
  </section>

</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
import ContentHeaderVue from "@/Components/Layout/ContentHeader";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
import OpenAppModal from "@/Pages/Devices/Modal/OpenAppModal";
import GroupModel from "@/Pages/Devices/Modal/GroupModel"
import defaulAppModal from "@/Pages/Devices/Modal/defaulAppModal"
export default {
  layout: Layout,
  components: {
    Link,
    ContentHeaderVue,
    Pagination,
    Alert,
    OpenAppModal,
    GroupModel,
    defaulAppModal

  },
  computed: {
    selectAll: {
      get: function () {
        return this.devices ? this.selected.length == this.devices : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.devices.forEach(function (device) {
            selected.push(device.id);
          });
        }

        this.selected = selected;
      }
    },
    application_deivce() {
      if (this.selected.length > 0) {
        if (this.selected.length == 1) {
          const found = this.devices.find(element => element.id == this.selected[0]);
          return found.applications
        }

        return this.applications;
      }
      return [];
    },
    lauchDisabled() {
      return this.selected.length > 0 ? false : true
    }

  },
  data() {
    return {
      term: null,
      editMode: true,

      selected: [],
      form: this.$inertia.form({
        id: null,
        name: null,
      })
    }

  },

  props: {
    devices: Array,
    errors: Object,
    // wifis: Array,
    applications: Array
  },
  methods: {
    search() {
      this.$inertia.get(
        this.route("device.index"),
        { term: this.term },
        {
          preserveState: true
        }
      );
    },
    save() {
      if (this.editMode) {
        this.form.put(route("device.saveName", this.form.id), {
          preserveState: true,
          onError: errors => {
            if (Object.keys(errors).length > 0) {
              this.editMode = true;
            }
          },
          onSuccess: page => {
            $("#exampleModal").modal("hide");
            this.form.reset();
          }
        });
      }

    },
    contextMenu(item, event) {
      Bus.$emit("contextMenuPemission", item, event);
    },

    clickModal() {
      this.editMode = true;
      this.form.reset();
    },
    edit(data) {
      this.editMode = true;
      this.form.id = data.id;
      this.form.name = data.name;
    },
    Delete(id) {
      if (!confirm("Are you sure want to remove?")) return;
      this.$inertia.delete(route("device.destroy", id));
    },
    disableDefaultApp(id){
      if (!confirm("Are you sure want to disable default app?")) return;
      this.$inertia.get(route('device.disableDefaultApp',id),{ preserveScroll: true });
    }
  }
}
</script>

<style>

</style>