<template>
  <section class="content">
    <ContentHeaderVue :name="'roles'" />
    <alert :dismissible="true"></alert>
    <button
      type="button"
      class="inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      data-toggle="modal"
      data-target="#exampleModal"
      @click="clickModal()"
    >Create Permission</button>

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
            <h5 class="modal-title" id="exampleModalLabel" v-if="editMode">Update Permission</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>Create Permission</h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input
                  type="text"
                  class="form-control text-xl"
                  :class="errors.name ? 'border-red-500' :''"
                  v-model="form.name"
                  id="recipient-name"
                />
                <div class="text-red-500" v-if="errors.name">{{ errors.name }}</div>
              </div>
              <div class="form-group">
                <Multiselect
                  v-model="form.permission"
                  mode="tags"
                  :appendNewTag="false"
                  :createTag="false"
                  :searchable="true"
                  label="name"
                  valueProp="id"
                  trackBy="name"
                  :options="permissions"
                  class="form-control"
                  :classes="{
                    tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                    container: 'relative mx-auto w-full flex items-center py-2 px-3 justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-2xl leading-snug outline-none',
                    tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 rtl:pl-0 rtl:pr-2',
                    tag: 'bg-red-600 text-white text-xl font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',}"
                />
              </div>
              <div class="text-red-500" v-if="errors.permission">{{ errors.permission }}</div>
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
                  >Permissions</th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="role in  roles.data" :key="role.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-xl font-medium text-gray-900">{{ role.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-xl text-gray-900">{{ role.name }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      v-for="permission in role.permissions"
                      :key="permission.id"
                      class="bg-gray-600 text-gray-100 text-xl px-2 mx-1 py-1 rounded"
                    >{{ permission.name }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      data-toggle="modal"
                      data-target="#exampleModal"
                      class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                      @click="edit(role)"
                    >Update</button>
                    <button
                      @click="deleteRow(role.id)"
                      class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
                    >Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <pagination class="mt-6" :links="roles.links" />
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
export default {
  layout: Layout,
  components: {
    Link,
    ContentHeaderVue,
    Pagination,
    Alert,
    Multiselect
  },
  props: {
    permissions: Array,
    roles: Object,
    errors: Object
  },
  data() {
    return {
      editMode: false,
      showModal: false,
      form: this.$inertia.form({
        id: null,
        name: null,
        permission: null
      })
    };
  },
  methods: {
    save() {
      if (this.editMode) {
        this.form.put(route("roles.update", this.form.id), {
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
        this.form.post(route("roles.store"), {
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
        permission: null
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
      let object = Object.assign({}, data.permissions);
      console.log(typeof object);
      // // // let first = Object.assign({}, object[0]);
      let array = [];
      $.each(object, function(key, value) {
        array.push(parseInt(value.id));
      });
      //trả về một biến array chưa id của permission
      // this.form = Object.assign({}, data);
      this.form.permission = array;
      this.editMode = true;
    },
    deleteRow(id) {
      if (!confirm("Are you sure want to remove?")) return;
      this.$inertia.delete(route("roles.delete", id));
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