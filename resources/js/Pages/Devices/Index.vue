<template>
  <section class="content">
    <ContentHeaderVue :name="'Devices'" />
    <alert :dismissible="true"></alert>
    <WifiModel
      v-if="hasAnyPermission(['user-manager'])"
      :errors="errors"
      :ids="selected"
      :wifis="wifis"
    />
    <OpenAppModal
      v-if="hasAnyPermission(['Lite'])"
      :errors="errors"
      :applications="applications"
      :ids="selected"
    />
    <OpenAppModal v-else :errors="errors" :applications="application_deivce" :ids="selected" />

    <GroupModel :errors="errors" :ids="selected" />
    <defaulAppModal
      v-if="hasAnyPermission(['Lite'])"
      :errors="errors"
      :applications="applications"
      :ids="selected"
    />
    <defaulAppModal v-else :errors="errors" :applications="application_deivce" :ids="selected" />

    <InstallApk :errors="errors" :ids="selected" :apk_files="apk_files" />
    <UninstallApk
      v-if="hasAnyPermission(['Lite'])"
      :errors="errors"
      :applications="applications"
      :ids="selected"
    />
    <UninstallApk v-else :errors="errors" :applications="application_deivce" :ids="selected" />

    <!-- <RunApkModal :errors="errors" ></RunApkModal> -->
    <!-- Modal -->

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
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
                <input
                  type="text"
                  class="form-control text-xl"
                  :class="errors.name ? 'is-valid' : ''"
                  v-model="form.name"
                  id="recipient-name"
                />
                <div class="text-red-500" v-if="errors.name">{{ errors.name }}</div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                  data-dismiss="modal"
                >Close</button>
                <button
                  @click.prevent="save()"
                  type="submit"
                  class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Save
                  changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mb-8 mt-8 flex justify-between">
      <div>
        <input
          v-model="term"
          @keyup="search"
          class="relative w-full px-8 py-3 text-xl rounded-r focus:shadow-outline"
          autocomplete="off"
          type="text"
          name="search"
          placeholder="Search…"
        />
      </div>
      <div>
        <div class="dropdown">
          <button
            class="inline-block px-8 py-3 bg-gray-300 text-gray-700 font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-ou dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Control Device
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu shadow-md" aria-labelledby="dropdownMenu1">
            <li>
              <button
                type="button"
                class="btn btn-secondary"
                :disabled="lauchDisabled"
                data-toggle="modal"
                data-target="#defaultAppModal"
              >
                <i class="fa fa-cog mr-2" aria-hidden="true"></i>Set Default App
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-secondary"
                :disabled="lauchDisabled"
                data-toggle="modal"
                data-target="#openAppModal"
              >
                <i class="fa fa-rocket mr-2" aria-hidden="true"></i>LauchApp
              </button>
            </li>
            <li v-if="hasAnyPermission(['user-manager'])">
              <button
                type="button"
                class="btn btn-secondary"
                :disabled="lauchDisabled"
                data-toggle="modal"
                data-target="#openInstallApk"
              >
                <i class="fa fa-download mr-2" aria-hidden="true"></i>Install Apk
              </button>
            </li>
            <li v-if="hasAnyPermission(['user-manager'])">
              <button
                type="button"
                class="btn btn-secondary"
                :disabled="lauchDisabled"
                data-toggle="modal"
                data-target="#openUninstallApp"
              >
                <i class="fa fa-trash mr-2" aria-hidden="true"></i>Uninstall Apk
              </button>
            </li>

            <li v-if="hasAnyPermission(['user-manager'])">
              <button
                type="button"
                class="btn btn-secondary"
                :disabled="lauchDisabled"
                data-toggle="modal"
                data-target="#WifiModal"
              >
                <i class="fa fa-wifi mr-2" aria-hidden="true"></i>Wifi
              </button>
            </li>

            <!-- <li><button  type="button"   class="btn btn-secondary" :disabled="lauchDisabled" data-toggle="modal" data-target="#groupModal" ><i class="fa fa-folder-o mr-2" aria-hidden="true"></i>Group </button></li> -->
            <!-- <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>-->
          </ul>
        </div>
      </div>
    </div>
    <button
      type="button"
      @click="FreshDevice()"
      class="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-2xl leading-tight rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
    >
      <i class="fa fa-refresh mr-2" aria-hidden="true"></i>Active devices
    </button>

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
      <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xl text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6 text-xl">
              <input type="checkbox" id="check_all" v-model="selectAll" />
            </th>
            <th @click="sortValue('id')" scope="col" class="py-3 px-6 text-xl text-gray-500">
              <i
                class="fa fa-arrow-up"
                :class="[(sortDirection === 'asc' && sort=='id') ? 'text-gray-800' : 'text-gray-300']"
              ></i>
              <i
                class="fa fa-arrow-down"
                :class="[(sortDirection === 'desc' && sort=='id')  ? 'text-gray-800' : 'text-gray-300']"
              ></i>
              No
            </th>
            <th scope="col" class="py-3 px-6 text-xl uppercase text-gray-500">name</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase text-gray-500">device ID</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase text-gray-500">Brand</th>

            <!-- <th scope="col" class="py-3 px-6 text-xl">Os Version</th> -->
            <th scope="col" class="py-3 px-6 text-xl uppercase text-gray-500">Battery</th>
            <th
              @click="sortValue('active')"
              scope="col"
              class="py-3 px-6 text-xl uppercase text-gray-500"
            >
              <i
                class="fa fa-arrow-up"
                :class="[(sortDirection === 'asc' && sort=='active') ? 'text-gray-800' : 'text-gray-300']"
              ></i>
              <i
                class="fa fa-arrow-down"
                :class="[(sortDirection === 'desc' && sort=='active')  ? 'text-gray-800' : 'text-gray-300']"
              ></i>
              <span v-if="sortDirection =='desc'">Active</span>
              <span v-if="sortDirection =='asc'">InActive</span>
            </th>
            <!-- <th scope="col" class="py-3 px-6 text-xl uppercase">Connect Wifi</th> -->
            <th scope="col" class="py-3 px-6 text-xl uppercase text-gray-500">Default App</th>
            <th
              scope="col"
              class="py-3 px-6 text-xl uppercase text-gray-500"
              v-if="hasAnyPermission(['user-manager'])"
            >User</th>
            <th
              scope="col"
              class="py-3 px-6 text-xl uppercase text-gray-500"
              v-if="hasAnyPermission(['user-manager'])"
            >Version</th>
            <th
              @click="sortValue('updated_at')"
              scope="col"
              class="py-3 px-6 text-xl uppercase text-gray-500"
            >
              <i
                class="fa fa-arrow-up"
                :class="[(sortDirection === 'asc' && sort=='updated_at') ? 'text-gray-800' : 'text-gray-300']"
              ></i>
              <i
                class="fa fa-arrow-down"
                :class="[(sortDirection === 'desc' && sort=='updated_at')  ? 'text-gray-800' : 'text-gray-300']"
              ></i>Time Update
            </th>
            <th scope="col" class="py-3 px-6 text-xl uppercase text-gray-500">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(device, index) in devices.data"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <input type="checkbox" class="checkbox" v-model="selected" :value="device.id" />
            </td>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <!-- {{ sortDirection =='asc'?  firstItem + index :    count -(devices.current_page ==1? -index +1 : -index-1) }} -->
              {{ sortDirection ==='asc'? firstItem + index : ((count -firstItem) -index)+1 }}
              <!-- {{ sortDirection =='asc'? devices.per_page * (devices.current_page - 1)+index +1 : count -firstItem -index -1}} -->
            </th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >{{ device.name }}</th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{
              device.device_id
              }}
            </th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span
                class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded"
              >
                {{
                device.brand
                }}
              </span>
            </th>

            <!-- <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ device.os_version }}</th>-->
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <i class="fa fa-battery-full" aria-hidden="true"></i>
              {{ (device.battery * 100) }} %
            </th>

            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span
                v-if="device.active"
                class="text-xl inline-block py-2 px-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded-full"
              ></span>
              <span
                v-else
                class="text-xl inline-block py-2 px-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-400 text-gray-800 rounded-full"
              ></span>
            </th>
            <!-- <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><span
                v-if="device.connect_wifi"
                class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-600 text-white rounded"><i
                  class="fa fa-wifi  mr-2" aria-hidden="true"></i>{{
                    device.connect_wifi
                  }}</span>
              <p v-else>Not Connect</p>
            </th>-->
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="relative w-fit block m-auto" v-if="device.default_app">
                <div
                  class="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-2.5 text-xl leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-400 text-white rounded-full z-10"
                >
                  <i
                    class="fa fa-times"
                    aria-hidden="true"
                    title="Disable Default App"
                    @click="disableDefaultApp(device.id)"
                  ></i>
                </div>
                <img
                  class=" rounded-full" width="50px"
                  :src="device.default_app.icon"
                  alt="Rounded avatar"
                />
              </div>
              <div class="text-center pt-2" v-if="device.default_app">
                <strong class="justify-center">
                  {{
                  device.default_app.appName }}
                </strong>
              </div>
            </th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              v-if="hasAnyPermission(['user-manager'])"
            >
              <Link v-if="device.user" :href="route('user.detail.devices', device.user.id)">
                {{ device.user ?
                device.user.name : null }}
              </Link>
            </th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              v-if="hasAnyPermission(['user-manager'])"
            >{{device.os_version}}</th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{
              device.last_login? formatDate( device.last_login.created_at) : null }}
            </th>
            <td class="py-4 px-6 text-right">
              <button
                @click="edit(device)"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
                class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
              >
                Edit
                Name
              </button>
              <button
                type="button"
                @click="Delete(device.id)"
                class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
              >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span class="mt-4 text-2xl">
      &nbsp;
      <i>Displaying {{ devices.data.length }} of {{ devices.total }} devices.</i>
    </span>
    <pagination :links="devices.links" />
  </section>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout";
import ContentHeaderVue from "@/Components/Layout/ContentHeader";
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
import OpenAppModal from "@/Pages/Devices/Modal/OpenAppModal";
import GroupModel from "@/Pages/Devices/Modal/GroupModel";
import defaulAppModal from "@/Pages/Devices/Modal/defaulAppModal";
import WifiModel from "@/Pages/Devices/Modal/WifiModel";
import RunApkModal from "@/Pages/Devices/Modal/RunApkModal";
import InstallApk from "@/Pages/Devices/Modal/InstallApk";
import UninstallApk from "@/Pages/Devices/Modal/UninstallApk";
export default {
  layout: Layout,
  components: {
    Link,
    ContentHeaderVue,
    Pagination,
    Alert,
    OpenAppModal,
    GroupModel,
    defaulAppModal,
    WifiModel,
    RunApkModal,
    InstallApk,
    UninstallApk
  },
  computed: {
    selectAll: {
      get: function() {
        return this.devices.data
          ? this.selected.length == this.devices.data
          : false;
      },
      set: function(value) {
        var selected = [];

        if (value) {
          this.devices.data.forEach(function(device) {
            selected.push(device.id);
          });
        }

        this.selected = selected;
      }
    },
    application_deivce() {
      if (this.selected.length > 0) {
        if (this.selected.length == 1) {
          const found = this.devices.data.find(
            element => element.id == this.selected[0]
          );
          return found.applications;
        }

        return this.applications.filter(app => {
            return this.selected.includes(app.device_id)
        });
      }
      return [];
    },
    lauchDisabled() {
      return this.selected.length > 0 ? false : true;
    },
    sst_id() {
      return this.count;
    }
  },
  mounted() {
    $("#exampleModalTopup").modal("hide");
  },
  data() {
    return {
      sort: this.sortBy,
      sortDirection: this.sort_Direction,
      term: null,
      editMode: true,
      id_sort: this.count,
      selected: [],
      form: this.$inertia.form({
        id: null,
        name: null
      })
    };
  },
  mounted() {
    this.listenActiveDevice();
  },

  props: {
    devices: Object,
    errors: Object,
    wifis: Array,
    applications: Array,
    apk_files: Array,
    sortBy: String,
    count: Number,
    sort_Direction: String,
    firstItem: Number,
    lastItem: Number
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
    disableDefaultApp(id) {
      if (!confirm("Are you sure want to disable default app?")) return;
      this.$inertia.get(route("device.disableDefaultApp", id), {
        preserveScroll: true
      });
    },
    listenActiveDevice() {
      var self = this;
      this.devices.data.map(element => {
        window.socketio.on(
          `recive-active-device.${element.device_id}:App\\Events\\ReciveActiveDeviceEvent`,
          function(e) {
            // console.log(e)
            let index = self.devices.data.findIndex(
              x => x.device_id == e.device_id
            );
            console.log(index);
            if (index !== -1) {
              self.devices.data[index].active = true;
              self.devices.data[index].battery = e.battery;
            }
            // console.log(index)
            // if(element.device_id === e.device_id){
            //   self.map
            //   element.active =true;
            //   console.log(element)
            //   // element.battery = e.battery
            // }
          }
        );
      });
    },
    FreshDevice() {
      this.$inertia.post(route("device.checkDevice")),
        {
          preserveState: true
        };
    },
    sortValue: function(s) {
      if (s === this.sort) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      }
      this.sort = s;

      this.$inertia.get(
        this.route("device.index"),
        {
          sortBy: this.sort,
          sortDirection: this.sortDirection,
          page: this.devices.current_page
        },
        {
          preserveState: true
        }
      );
    },
    serialNumber(key) {
      return (this.devices.current_page - 1) * this.devices.per_page + 1 + key;
    }
  }
};
</script>

<style>
.up-arrow {
  width: 0;
  height: 0;
  border: solid 5px transparent;
  background: transparent;
  border-bottom: solid 7px black;
  border-top-width: 0;
  cursor: pointer;
}

.down-arrow {
  width: 0;
  height: 0;
  border: solid 5px transparent;
  background: transparent;
  border-top: solid 7px black;
  border-bottom-width: 0;
  margin-top: 1px;
  cursor: pointer;
}
</style>
