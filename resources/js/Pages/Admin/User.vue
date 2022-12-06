<template>
  <section class="content">
    <ContentHeaderVue :name="'Users'" />
    <alert :dismissible="true"></alert>

    <button
      type="button"
      class="inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      data-toggle="modal"
      data-target="#exampleModal"
      @click="clickModal()"
    >Create User</button>

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
            <h5 class="modal-title" id="exampleModalLabel" v-if="editMode">Update User</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>Create User</h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="relative p-6 flex-auto">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
                      for="grid-first-name"
                    >{{__('name')}}</label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-500 border rounded py-4 px-3 mb-3 text-xl leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder
                      v-model="form.name"
                      :class="errors.name ? 'border-red-500' :''"
                    />
                    <p class="text-red-500 text-xl italic" v-if="errors.name">{{ errors.name }}</p>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
                      for="grid-last-name"
                    >{{__('email')}}</label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border text-xl border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="examp@example"
                      v-model="form.email"
                      :class="errors.email ? 'border-red-500' :''"
                    />
                    <p class="text-red-500 text-xl italic" v-if="errors.email">{{ errors.email }}</p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
                      for="grid-phone"
                    >{{__('phone')}}</label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border text-xl border-gray-200 rounded py-4 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-phone"
                      type="text"
                      placeholder
                      v-model="form.phone"
                      :class="errors.phone? 'border-red-500' :''"
                    />
                    <p class="text-red-500 text-xl italic" v-if="errors.phone">{{ errors.phone }}</p>
                  </div>

                  <div class="w-full md:w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
                      for="grid-phone"
                    >Roles</label>

                    <Multiselect
                      v-model="form.roles"
                      mode="tags"
                      :appendNewTag="false"
                      :createTag="false"
                      :searchable="true"
                      label="name"
                      valueProp="id"
                      trackBy="name"
                      :options="roles"
                      class="multiselect-blue"
                      :classes="{
                          tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                  container: 'relative mx-auto w-full flex items-center py-2 px-3 justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-xl leading-snug outline-none',
                tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 rtl:pl-0 rtl:pr-2',
                tag: 'bg-red-600 text-white text-xl font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',}"
                    />
                    <div class="text-red-500" v-if="errors.roles">{{ errors.roles }}</div>
                  </div>
                </div>
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
                >Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full max-w-md mr-4 mb-8 mt-8">
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
    <div class="flex flex-col mt-6">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider"
                  >id</th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider"
                  >name</th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider"
                  >Email</th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider"
                  >Phone</th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider"
                  >Roles</th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xl font-back text-gray-500 uppercase tracking-wider"
                  >Onwer</th>

                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(user,index) in  users.data" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-xl font-medium text-gray-900">{{ index }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-xl text-gray-900">{{ user.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-xl text-gray-900">{{ user.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-xl text-gray-900">{{ user.phone }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      v-for="role in user.roles"
                      :key="role.id"
                      class="bg-gray-600 text-gray-100 text-xl px-2 mx-1 py-1 rounded"
                    >{{ role.name }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div
                      class="text-xl text-gray-900"
                      v-if="hasAnyPermission(['users-manage']) && $page.props.auth.user.id !== user.id && user.owner !== null"
                    >{{ user.owner.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      data-toggle="modal"
                      data-target="#exampleModal"
                      class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                      @click="edit(user)"
                    >Update</button>
                    <button
                      @click="deleteRow(user.id)"
                      class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
                    >Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <pagination class="mt-6" :links="users.links" />
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
import Pagination from "@/Components/Pagination";
import Alert from "@/Components/Alert";
import Multiselect from "@vueform/multiselect/dist/multiselect.vue2.js";
import admin from "./mixins/admin";
export default {
  layout: Layout,
  mixins: [admin],
  props: {
    users: Object,
    roles: Array,
    errors: Object
  },

  components: {
    Link,
    ContentHeaderVue,
    Pagination,
    Alert,
    Multiselect
  },
  data() {
    return {
      term: null,
      editMode: false,
      form: this.$inertia.form({
        id: null,
        name: null,
        phone: null,
        email: null,
        roles: null
      })
    };
  },
  methods: {
    search() {
      this.$inertia.get(
        this.route("users.index"),
        { term: this.term },
        {
          preserveState: true
        }
      );
    },
    clickModal() {},
    save() {
      if (this.editMode) {
        this.form.put(route("users.update", this.form.id), {
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
        this.form.post(route("users.store"), {
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
    reset: function() {
      this.form = this.$inertia.form({
        id: null,
        name: null,
        phone: null,
        email: null,
        roles: null
      });
    },

    clickModal() {
      this.editMode = false;
      this.reset();
    },
    edit(data) {
      this.editMode = true;
      this.form.id = data.id;
      this.form.name = data.name;
      this.form.phone = data.phone;
      this.form.email = data.email;

      //trả về một biến array chưa id của permission
      // this.form = Object.assign({}, data);
      this.form.roles = this.multipleSelect(data.roles);
      this.editMode = true;
    },
    deleteRow(id) {
      if (!confirm("Are you sure want to remove?")) return;
      this.$inertia.delete(route("users.destroy", id));
    }
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect-tags-search {
  font-size: 1.25rem;
}
</style>