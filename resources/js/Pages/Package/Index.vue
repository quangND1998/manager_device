<template>
  <section class="content">
    <ContentHeaderVue :name="'Package License'" />
    <alert :dismissible="true"></alert>
    <button type="button"
      class="inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      data-toggle="modal" data-target="#exampleModal" @click="clickModal()">Create</button>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" v-if="editMode">Update </h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>Create</h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="save">
              <div class="form-group" :class="errors.name ? 'is-valid' : ''">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control text-xl" :class="errors.name ? 'is-valid border-red-500' : ''"
                  v-model="form.name" id="recipient-name" />
                <div class="text-red-500" v-if="errors.name">{{ errors.name }}</div>
              </div>
              <div class="form-group" :class="errors.name ? 'is-valid' : ''">
                <label for="recipient-price" class="col-form-label">Price:</label>
                <input type="number" class="form-control text-xl" :class="errors.price ? 'is-valid border-red-500' : ''"
                  v-model="form.price" id="recipient-price" />
                <div class="text-red-500" v-if="errors.price">{{ errors.price }}</div>
              </div>
              <div class="form-group" :class="errors.save_money ? 'is-valid' : ''">
                <label for="recipient-save_money" class="col-form-label">Save Money:</label>
                <input type="number" class="form-control text-xl"
                  :class="errors.save_money ? 'is-valid border-red-500' : ''" v-model="form.save_money"
                  id="recipient-save_money" />
                <div class="text-red-500" v-if="errors.save_money">{{ errors.save_money }}</div>
              </div>
              <div class="form-group" :class="errors.package_time ? 'is-valid' : ''">
                <label for="recipient-name" class="col-form-label">Package Time:</label>
                <input type="text" class="form-control text-xl"
                  :class="errors.package_time ? 'is-valid border-red-500' : ''" v-model="form.package_time"
                  id="recipient-package_time" />
                <div class="text-red-500" v-if="errors.package_time">{{ errors.package_time }}</div>
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



    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
      <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 ">
              Package name
            </th>
            <th scope="col" class="px-6 py-3">
              Package Time (day)
            </th>

            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Save Money
            </th>
            <th scope="col" class="px-6 py-3">
              State
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        <draggable v-model="package_products" tag="tbody" @change="onUnpublishedChange" v-bind="dragOptions"
          @start="isDragging = true" @end="isDragging = false" item-key="id_priority"
          class="bg-white divide-y divide-gray-200">
          <template>
            <tr v-for="(package_product, index) in package_products" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"">
                <th scope=" row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ package_product.name }}
              </th>
              <td class="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ package_product.package_time }}
              </td>
              <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ package_product.price }}
              </td>
              <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ package_product.save_money }}
              </td>
              <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <input :checked="package_product.state == 1 ? true : false"
                  @change="onChangeDefault(package_product, $event)" type="checkbox"
                  class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </td>
              <td class="px-6 py-4">
                <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" data-toggle="modal"
                  data-target="#exampleModal" @click="edit(package_product)">Edit</button>
              </td>
            </tr>
          </template>
        </draggable>

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
import draggable from "vuedraggable";
export default {
  layout: Layout,
  components: {
    Link,
    ContentHeaderVue,
    Pagination,
    Alert,
    draggable,
  },
  props: {
    package_products: Array,
    errors: Object
  },
  data() {
    return {
      editMode: false,
      showModal: false,
      form: this.$inertia.form({
        id: null,
        name: null,
        price: null,
        save_money: null,
        package_time: null
      })
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 100,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        scrollSensitivity: 100,
        forceFallback: true
      };
    }
  },
  methods: {
    save() {
      if (this.editMode) {
        this.form.put(route("package.update", this.form.id), {
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
        this.form.post(route("package.store"), {
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
      this.form.price = data.price;
      this.form.save_money = data.save_money;
      this.form.package_time = data.package_time;
    },
    Delete(id) {
      if (!confirm("Are you sure want to remove?")) return;
      this.$inertia.delete(route("package.delete", id));
    },

    onChangeDefault(data, event) {
      if (event.target.checked) {
        this.form.state = 1;
      } else {
        this.form.state = 0;
      }
      let query = {
        id: data.id,
        state: event.target.checked
      };
      this.$inertia.post(route("package.changeState"), query, {
        preserveState: false, preserveScroll: true
        // only: ["image360s", "errors", 'flash'],
      });
    },
    onUnpublishedChange() {
      let query = {
        data: this.package_products
      };
      this.$inertia.post(this.route("package.sort"), query, {
        preserveState: false
      });
    }
  }
};
</script>

<style>

</style>