<template>
  <section class="content">
    <ContentHeaderVue :name="'Window App'" />
    <alert :dismissible="true"></alert>

    <button
      type="button"
      class="inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      data-toggle="modal"
      data-target="#exampleModal"
      @click="clickModal()"
    >Save App</button>

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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div
                class="w-1/4 bg-gray-200 rounded-full dark:bg-gray-700 mb-8 ml-3"
                v-if="form.progress"
              >
                <div
                  class="bg-blue-600 text-xl font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  :style="{ width: form.progress.percentage + '%' }"
                >{{ form.progress.percentage }}%</div>
              </div>
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
              <div class="form-group" :class="errors.path ? 'is-valid' : ''">
                <label for="recipient-name" class="col-form-label">Path to .exe file :</label>
                <textarea
                  type="text"
                  class="form-control text-xl"
                  :class="errors.path ? 'is-valid' : ''"
                  v-model="form.path"
                  id="recipient-name"
                ></textarea>
                <div class="text-red-500" v-if="errors.path">{{ errors.path }}</div>
              </div>
              <div class="form-group" :class="errors.version ? 'is-valid' : ''">
                <label for="recipient-name" class="col-form-label">version:</label>
                <input
                  type="text"
                  class="form-control text-xl"
                  :class="errors.version ? 'is-valid' : ''"
                  v-model="form.version"
                  id="recipient-name"
                />
                <div class="text-red-500" v-if="errors.version">{{ errors.version }}</div>
              </div>
              <div class="form-group" :class="errors.path ? 'is-valid' : ''">
                <label for="recipient-name" class="col-form-label">
                  Upload
                  icon app
                </label>
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col w-full h-48 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
                  >
                    <div class="flex flex-col items-center justify-center pt-7">
                      <i class="fa fa-file-o w-12 h-15" aria-hidden="true"></i>
                      <p
                        class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
                      >Drag file .jpg .jepg .png</p>

                      <img :src="image" width="50px" />
                      <input
                        type="file"
                        @input="form.icon = $event.target.files[0]"
                        :class="errors.icon ? 'border-red-500' : ''"
                        class="opacity-0"
                        accept="image/*"
                        @change="onChangeFile"
                      />
                    </div>
                  </label>

                  <div class="text-red-500" v-if="errors.icon">{{ errors.icon }}</div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                  data-dismiss="modal"
                >Cancel</button>
                <button
                  @click.prevent="save()"
                  type="submit"
                  class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
                >Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
      <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xl text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <!-- <th scope="col" class="py-3 px-6 text-xl"><input type="checkbox" id="check_all" v-model="selectAll"></th> -->
            <th scope="col" class="py-3 px-6 text-xl">No</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase">name</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase">Path</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase">Icon</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase">Version</th>
            <th scope="col" class="py-3 px-6 text-xl uppercase">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(app, index) in window_apps"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <!-- <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input
            type="checkbox" class="checkbox" v-model="selected" :value="device.id"></td>-->
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{
              index +1
              }}
            </th>
            <th
              apk="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >{{ app.name }}</th>
            <th
              apk="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >{{ app.path }}</th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img :src="app.icon" width="50px" />
            </th>
            <th
              apk="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >{{ app.version }}</th>
            <td class="py-4 px-6 text-right">
              <button
                @click="edit(app)"
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
                @click="Delete(app.id)"
                class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
              >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    window_apps: Array,
    errors: Object
  },
  data() {
    return {
      ssid: null,
      editMode: false,
      image: null,
      form: this.$inertia.form({
        id: null,
        name: null,
        path: null,
        version:null,
        icon: null
      })
    };
  },
  methods: {
    save() {
      if (this.editMode) {
        this.form.post(route("window-app.update", this.form.id), {
          preserveState: true,
          onError: errors => {
            if (Object.keys(errors).length > 0) {
              this.editMode = true;
            }
          },
          onSuccess: page => {
            $("#exampleModal").modal("hide");
            this.reset();
          }
        });
      } else {
        this.form.post(route("window-app.store"), {
          preserveState: true,
          onError: errors => {
            if (Object.keys(errors).length > 0) {
              this.editMode = false;
            }
          },
          onSuccess: page => {
            $("#exampleModal").modal("hide");
            this.reset();
          }
        });
      }
    },

    clickModal() {
      this.editMode = false;
      this.form.reset();
    },
    edit(data) {
      this.editMode = true;
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.version = data.version;
      this.form.path = data.path;
    },
    reset() {
      this.form = this.$inertia.form({
        id: null,
        name: null,
        path: null,
        icon: null,
        version:null,
      });
    },
    Delete(id) {
      if (!confirm("Are you sure want to remove?")) return;
      this.$inertia.delete(route("window-app.delete", id));
    },
    onChangeFile(e) {
      const file = e.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
      } else {
        this.image = null;
      }
    }
  }
};
</script>

<style lang="scss">
.fm-grid {
  padding-top: 1rem;

  .fm-grid-item {
    position: relative;
    width: 125px;
    padding: 0.4rem;
    margin-bottom: 1rem;
    margin-right: 1rem;
    border-radius: 5px;

    &.active {
      background-color: #c2e5eb;
      box-shadow: 3px 2px 5px gray;
    }

    &:not(.active):hover {
      background-color: #f8f9fa;
      box-shadow: 3px 2px 5px gray;
    }

    .fm-item-icon {
      cursor: pointer;
    }

    .fm-item-icon > i,
    .fm-item-icon > figure > i {
      color: #6d757d;
    }

    .fm-item-info {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>