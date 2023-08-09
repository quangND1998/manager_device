<template>
  <section class="content">
    <!-- <ContextMenu /> -->
    <ContentHeaderVue class="pl-0" :name="'permissions'" />
    <alert :dismissible="true"></alert>
    <div class="my-5">
      <button
      type="button"
      class="inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      data-toggle="modal"
      data-target="#exampleModal"
      @click="clickModal()"
    >Create News</button>
    </div>
    

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
            <h5 class="modal-title" id="exampleModalLabel" v-if="editMode">Update News</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>Create News</h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="form-group" :class="errors.name ? 'is-valid' :''">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input
                  type="text"
                  class="form-control text-xl border-gray-300"
                  :class="errors.name ? 'is-valid' :''"
                  v-model="form.name"
                  id="recipient-name"
                />
                <div class="text-red-500" v-if="errors.name">{{ errors.name }}</div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:text-white hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out mx-2"
                  data-dismiss="modal"
                >Close</button>
                <button
                  @click.prevent="save()"
                  type="submit"
                  class="inline-block px-6 py-2.5 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out"
                >Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
      <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6 text-xl">STT</th>
            <th scope="col" class="py-3 px-6 text-xl">name</th>
            <th scope="col" class="py-3 px-6 text-xl">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(permission,index) in permissions.data"
            :key="index"
            v-on:contextmenu.prevent="contextMenu(permission,$event)"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >{{ index +1}}</th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >{{permission.name}}</th>
            <td class="py-4 px-6 text-right">
              <button
                @click="edit(permission)"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
                class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out mx-2"
              >Edit</button>
              <button
                type="button"
                @click="Delete(permission.id)"
                class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:text-white hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
              >Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :links="permissions.links" />
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
    errors: Object,
    permissions: Object
  },
  data() {
    return {
      users: [],
      editMode: false,
      showModal: false,
      form: this.$inertia.form({
        id: null,
        name: null
      })
    };
  },
  mounted() {
    Bus.$on("menuAction", (context, name) => {
      console.log(context);
      if (name == "edit") {
        console.log(context);
        $("#exampleModal").modal("show");
        this.edit(context);
      } else {
        this.Delete(context.id);
      }
    });
 
  },
  methods: {
    
    save() {
      if (this.editMode) {
        this.form.put(route("permissions.update", this.form.id), {
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
      } else {
        this.form.post(route("permissions.store"), {
          preserveState: true,
          onError: errors => {
            if (Object.keys(errors).length > 0) {
              this.editMode = false;
            }
          },
          onSuccess: page => {
            $("#exampleModal").modal("hide");
            this.form.reset();
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
    },
    Delete(id) {
      if (!confirm("Are you sure want to remove?")) return;
      this.$inertia.delete(route("permissions.delete", id));
    },
    contextMenu(item, event) {
      Bus.$emit("contextMenuPemission", item, event);
    }
  }
  // destroyed() {
  //   // delete events
  //   Bus.$off(["contextMenu", "menuAction"]);
  // }
};
</script>

<style>
</style>