<template>
  <section class="content">
    <ContentHeaderVue :name="' Default Applications'" />
    <alert :dismissible="true"></alert>
    <button type="button"
      class="inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      data-toggle="modal" data-target="#exampleModal" @click="clickModal()">Upload Apk File</button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h5 class="modal-title" id="exampleModalLabel" v-if="editMode">Update Wifi</h5>
                        <h5 class="modal-title" id="exampleModalLabel" v-else>Create Wifi</h5> -->

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">


              <div class="grid gap-6 mb-6 md:grid-cols-2 mt-3">
                <div>
                  <label for="company" class="block mb-2 text-xl font-medium text-gray-900 text-left">App URL</label>
                  <input rows="4" type="file" @change="onFileChange" accept=".apk"
                    class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="R:\Project\HolomiaVRZ_230403b_MetaQuest.apk" />
                </div>
                <div v-if="form.packageName">
                  <label for="first_name" class="block mb-2 text-xl font-medium text-gray-900 text-left">Name </label>
                  <input rows="4" type="text" ref="name" v-model="form.appName" id="first_name" readonly
                    class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mission X" required />
                  <div class="text-red-500" v-if="errors.appName">
                    {{ errors.appName }}
                  </div>
                </div>

              </div>
              <div class="grid gap-6 mb-6 md:grid-cols-2 mt-3">
                <div v-if="form.packageName">
                  <label for="phone" class="block mb-2 text-xl font-medium text-gray-900 text-left">Version</label>
                  <input rows="4" type="tel" id="phone" ref="version" v-model="form.version" readonly
                    class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123-45-678" required />
                  <div class="text-red-500" v-if="errors.version">
                    {{ errors.version }}
                  </div>

                </div>
                <div v-if="form.packageName">
                  <label class="block mb-2 text-xl font-medium text-gray-900 text-left">PackageName</label>
                  <input rows="4" type="tel" id="phone" ref="packageName" v-model="form.packageName" readonly
                    class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="com.holomia.infinity" required />
                  <div class="text-red-500" v-if="errors.packageName">
                    {{
                      errors.packageName
                    }}
                  </div>
                </div>

              </div>

              <div class="modal-footer">
                <button type="button"
                  class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                  data-dismiss="modal">Cancel</button>
                <button @click.prevent="save()" type="submit"
                  class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
                  Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
      <div class="w-full flex max-w-md mr-4 mb-8 mt-8">
        <input v-model="name" @keyup="search" class="relative w-full px-8 py-3 text-xl rounded-r focus:shadow-outline"
          autocomplete="off" type="text" name="search" placeholder="Search…" />
      </div>





      <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6 text-xl">STT </th>
            <th scope="col" class="py-3 px-6 text-xl">appName</th>

            <th scope="col" class="py-3 px-6 text-xl">packageName</th>
            <th scope="col" class="py-3 px-6 text-xl">icon</th>

            <th scope="col" class="py-3 px-6 text-xl">Version</th>
            <!-- <th scope="col" class="py-3 px-6 text-xl">
              Default
            </th> -->

            <th scope="col" class="py-3 px-6 text-xl">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(application, index) in applications.data" :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white">
              {{ index + 1 }}</th>
            <th scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white">
              {{ application.appName }}</th>



            <th scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white">
              {{ application.packageName }}</th>
            <th scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white">
              <img :src="application.icon" width="50px" />
            </th>

            <th scope="row"
              class="py-4 px-6 text-gray-900 whitespace-nowrap font-semibold dark:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              {{ application.version }}</th>
            <!-- <th scope="row"
              class="py-4 px-6 text-gray-900 whitespace-nowrap font-semibold dark:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <input :checked="application.default == 1 ? true : false" @change="onChangeDefault(application, $event)"
                class="toggle-class-public" type="checkbox" />
            </th> -->

            <td class="py-4 px-6 text-right">
              <button @click="edit(application)" type="button" data-toggle="modal" data-target="#exampleModal"
                class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Edit</button>
              <button type="button" @click="Delete(application.id)"
                class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :links="applications.links" />
  </section>
</template>
  
<script>
const AppInfoParser = require("app-info-parser");
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
    errors: Object
  },
  data() {
    return {
      name: null,
      editMode: false,
      form: this.$inertia.form({
        id: null,
        appName: null,
        packageName: null,
        icon: null,
        version: null
      })
    };
  },
  methods: {
    search() {
      this.$inertia.get(
        this.route("default-application.index"),
        { name: this.name },
        {
          preserveState: true
        }
      );
    },
    clickModal() {
      this.form = this.$inertia.form({
        id: null,
        appName: null,
        packageName: null,
        icon: null,
        version: null
      })
      this.editMode = false
    },
    onFileChange(e) {

      const path = e.target.files[0].path;
      console.log(path)
      // const fullpath = path.toString();
      // this.progressing = true;
      // console.log(fullpath);
      // this.app_window.size = e.target.files[0].size
      const parser = new AppInfoParser(e.target.files[0]); // or xxx.ipa
      parser
        .parse()
        .then((result) => {
          console.log(result);
          this.form.appName = result.application.label[0];
          this.form.icon = result.icon;
          this.form.version = result.versionName;
          this.form.packageName = result.package;


        })
        .catch((err) => {
          console.log("err ----> ", err);
        });
    },
    save() {

      // this.$store.dispatch("stores/updateCart", query);
      if (
        this.form.appName == null
      ) {
        this.$swal("Error, Some values are missing Must choose apk file.", {
          icon: "error"
        });
      } else {
        if (this.editMode) {
          this.form.put(route("default-application.update", this.form.id), {
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
          this.form.post(route("default-application.store"), {
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

      }
    },
    edit(data) {
          this.editMode = true;
          this.form.id = data.id;
          this.form.appName = data.appName;
          this.form.version = data.version;
          this.form.packageName = data.packageName;
    },
    Delete(id) {

      this.$swal({
        title: "Are you sure?",
        text: `Delete  !`,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(wilChange => {
        if (wilChange) {
          let _this = this;
          this.$inertia.delete(route("default-application.delete", id));

        }
        else {
          this.$swal("Action cancelled!");
        }
      });

    },


  }
};
</script>

<style></style>