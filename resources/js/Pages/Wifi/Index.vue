<template>
    <section class="content">
        <ContentHeaderVue :name="'wifis'" />
        <alert :dismissible="true"></alert>
        <button type="button"
            class="inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-toggle="modal" data-target="#exampleModal" @click="clickModal()">Create News</button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" v-if="editMode">Update Wifi</h5>
                        <h5 class="modal-title" id="exampleModalLabel" v-else>Create Wifi</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="save">
                            <div class="form-group" :class="errors.ssid ? 'is-valid' : ''">
                                <label for="recipient-name" class="col-form-label">SSID(Name Wifi):</label>
                                <input type="text" class="form-control text-xl" :class="errors.ssid ? 'is-valid' : ''"
                                    v-model="form.ssid" id="recipient-name" />
                                <div class="text-red-500" v-if="errors.ssid">{{ errors.ssid }}</div>
                            </div>
                            <div class="form-group" :class="errors.password ? 'is-valid' : ''">
                                <label for="recipient-name" class="col-form-label">Password:</label>
                                <input type="text" class="form-control text-xl" :class="errors.password ? 'is-valid' : ''"
                                    v-model="form.password" id="recipient-name" />
                                <div class="text-red-500" v-if="errors.password">{{ errors.password }}</div>
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
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">

            <div class="w-full max-w-md mr-4 mb-8 mt-8">
                <input v-model="ssid" @keyup="search"
                    class="relative w-full px-8 py-3 text-xl rounded-r focus:shadow-outline" autocomplete="off"
                    type="text" name="search" placeholder="Search…" />
            </div>
            <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        <th scope="col" class="py-3 px-6 text-xl">STT</th>
                        <th scope="col" class="py-3 px-6 text-xl">SSID</th>
                        <th scope="col" class="py-3 px-6 text-xl">Password</th>
                        <th scope="col" class="py-3 px-6 text-xl">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(wifi, index) in wifis.data" :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                        <th scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white">
                            {{ index +1 }}
                        </th>
                        <th scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white">
                            {{ wifi.SSID }}
                        </th>
                        <th scope="row"
                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:text-white">
                            {{ wifi.password }}
                        </th>





                        <td class="py-4 px-6 text-right">
                            <button @click="edit(wifi)" type="button" data-toggle="modal" data-target="#exampleModal"
                  class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Edit</button>
                <button type="button" @click="Delete(wifi.id)"
                  class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination :links="wifis.links" />
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
        wifis: Object,
        errors:Object
    },
    data() {
        return {
            ssid: null,
            editMode: false,
            form: this.$inertia.form({
                id:null,
                password: null,
                ssid: null
            })
        }

    },
    methods: {
        search() {
            this.$inertia.get(
                this.route("wifi.index"),
                { ssid: this.ssid },
                {
                    preserveState: true
                }
            );
        },
        save() {
            if (this.editMode) {
                this.form.put(route("wifi.update", this.form.id), {
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
                this.form.post(route("wifi.store"), {
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
            this.form.ssid = data.SSID;
            this.form.password = data.password;
        },
        Delete(id) {
            if (!confirm("Are you sure want to remove?")) return;
            this.$inertia.delete(route("wifi.delete", id));
        },
    }

}
</script>
  
<style>

</style>