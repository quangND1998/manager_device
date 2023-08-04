<template>
    <section class="content">
      <ContentHeaderVue class="pl-0" :name="'invoice'" />
      <div class="w-full  mb-8 mt-8 flex justify-between ">
        <div>
          <input v-model="term" @keyup="search" class="block w-full py-3 pl-5 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            autocomplete="off" type="text" name="search" placeholder="Search…" />
        </div>
      </div>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
        <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xl text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6 text-xl"><input type="checkbox" id="check_all"></th>
              <th scope="col" class="py-3 px-6 text-xl">No</th>
              <th scope="col" class="py-3 px-6 text-xl uppercase">Type</th>
              <th scope="col" class="py-3 px-6 text-xl uppercase">State </th>
              <th scope="col" class="py-3 px-6 text-xl uppercase">Price ($)</th>
              <th scope="col" class="py-3 px-6 text-xl uppercase">Method </th>
              <th scope="col" class="py-3 px-6 text-xl uppercase">Card </th>
              <th scope="col" class="py-3 px-6 text-xl uppercase">Create at ( UTC +7)</th>

              <th scope="col" class="py-3 px-6 text-xl uppercase" v-if="hasAnyPermission(['user-manager'])">User</th>
              <!-- <th scope="col" class="py-3 px-6 text-xl uppercase">
                <span class="sr-only">Edit</span>
              </th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(payment, index) in payments.data" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input
                  type="checkbox" class="checkbox" v-model="selected" :value="payment.id"></td>
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index +1 }}
              </th>
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ payment.description }}</th>
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ (payment.state) }}</th>

                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><span
                  class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{{ formatPrice(payment.amount) }}</span>
              </th>
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                 payment.pay_gate
              }}</th>

              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                    payment.card_number
                  }}</th>
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ (payment.created_at) }}</th>

              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" v-if="hasAnyPermission(['user-manager'])">{{ payment.user? payment.user.name:null }}</th>

              <!-- <td class="py-4 px-6 text-right">
                <button @click="edit(payment)" type="button" data-toggle="modal" data-target="#exampleModal"
                  class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Edit Name</button>
                <button type="button" @click="Delete(payment.id)"
                  class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :links="payments.links" />
    </section>

  </template>

  <script>
  import { Link } from "@inertiajs/inertia-vue";
  import Layout from "@/Components/Layout/Layout";
  import ContentHeaderVue from "@/Components/Layout/ContentHeader";
  import Pagination from "@/Components/Pagination";
  export default {
    layout: Layout,
    components: {
      Link,
      ContentHeaderVue,
      Pagination,
    },
    props: {
        payments: Object,
    },
    data() {
      return {
        term: null,
        editMode: true,
        selected: [],
        form: this.$inertia.form({
            user : this.$page.props.auth.user,
            payments: this.payments,
        })
      }

    },

    methods: {
      search() {
        this.$inertia.get(
          this.route("payment.index"),
          { term: this.term },
          {
            preserveState: true
          }
        );
      },
    }
  }
  </script>

  <style>

  </style>
