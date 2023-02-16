<template>
    <section class="content">
        <ContentHeaderVue :name="'Groups'" />
        <alert :dismissible="true"></alert>
        <OpenAppModal v-if="hasAnyPermission(['Lite'])" :errors="errors" :applications="applications" :ids="selected" />
        <OpenAppModal v-else  :errors="errors" :applications="application_deivce" :ids="selected" />


        <OpenGroupApp v-if="hasAnyPermission(['Lite'])" :errors="errors" :applications="applications" :current_group="current_group" />
        <OpenGroupApp v-else :errors="errors" :applications="applications" :current_group="current_group" />


        <DefaultGroupAppVue v-if="hasAnyPermission(['Lite'])" :errors="errors" :applications="applications" :current_group="current_group"  />
        <DefaultGroupAppVue v-else :errors="errors" :applications="applications" :current_group="current_group"  />
        <button type="button"
            class="inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-toggle="modal" data-target="#exampleModal" @click="clickModal()">Create Group</button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" v-if="editMode">Update Group</h5>
                        <h5 class="modal-title" id="exampleModalLabel" v-else>Create Group</h5>

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
                            <div class="form-group">
                                <Multiselect v-model="form.devices" mode="tags" :appendNewTag="false" :createTag="false"
                                    :searchable="true" label="name" valueProp="id" trackBy="name" :options="devices"
                                    class="form-control" :classes="{
                                        tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                                        container: 'relative mx-auto w-full flex items-center py-2 px-3 justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-2xl leading-snug outline-none',
                                        tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 rtl:pl-0 rtl:pr-2',
                                        tag: 'bg-red-600 text-white text-xl font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
                                    }" />
                            </div>
                            <div class="text-red-500" v-if="errors.devices">{{ errors.devices }}</div>
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
        <div>
            <div class="md:grid md:grid-cols-3 md:gap-6 mt-5">
                <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">

                        <div class="shadow sm:rounded-md sm:overflow-hidden">
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <h3 class="text-xl font-medium leading-6 text-gray-900">Groups</h3>
                                <ul class="flex flex-col  p-4">
                                    <li class="border-gray-200 flex flex-row mb-2" v-for="(group, index) in groups"
                                        :key="index">
                                        <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                            :class="group.id == current_group.id ? 'bg-blue-500' : ''">
                                            <div class="w-full flex" @click="getGroup(group)">
                                                <div
                                                    class="flex flex-col rounded-md w-10 h-10 bg-gray-100 justify-center items-center mr-4">
                                                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                                                </div>
                                                <div class="flex-1 pl-1 mr-16">
                                                    <div class="font-medium">{{ group.name }}</div>
                                                </div>
                                            </div>
                                            <div class="text-gray-600 text-xl flex">
                                                <button type="button" data-toggle="modal" data-target="#exampleModal"
                                                    @click="edit(group)"
                                                    class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"><i
                                                        class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                <button type="button" @click="DeleteGroup(group.id)"
                                                    class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"><i
                                                        class="fa fa-trash" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div class=" md:mt-0 md:col-span-2" >

                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <h3 class="text-xl font-medium leading-6 text-gray-900">Devices </h3>
                            <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
                                <div class="w-full  mb-8 mt-8 flex justify-between ">
                                    <div>
                                        <div class="dropdown">
                                            <button
                                                class="inline-block px-8 py-3 bg-gray-300 text-gray-700 font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-ou dropdown-toggle"
                                                type="button" id="dropdownMenu1" data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="true">
                                                Control Device
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu shadow-md " aria-labelledby="dropdownMenu1">
                                                <li><button type="button" class="btn btn-secondary" data-toggle="modal"
                                                    :disabled="disableLauchGroup"  data-target="#OpenGroupAppModal"><i class="fa fa-rocket mr-2"
                                                        aria-hidden="true"></i>Lauch App Group</button></li>
                                                <li><button type="button" class="btn btn-secondary"
                                                        :disabled="disableLauchGroup" data-toggle="modal"
                                                        data-target="#DefaultGroupApp"><i class="fa fa-rocket mr-2"
                                                            aria-hidden="true"></i>Set Default App Group</button></li>
                                                <li><button type="button" class="btn btn-secondary"
                                                        :disabled="lauchDisabled" data-toggle="modal"
                                                        data-target="#openAppModal"><i class="fa fa-rocket mr-2"
                                                            aria-hidden="true"></i>Lauch App </button></li>
                                                <!-- <li><button  type="button"   class="btn btn-secondary" :disabled="lauchDisabled" data-toggle="modal" data-target="#WifiModal" ><i class="fa fa-wifi mr-2" aria-hidden="true"></i>Wifi</button></li>
                                            <li><button  type="button"   class="btn btn-secondary" :disabled="lauchDisabled" data-toggle="modal" data-target="#groupModal" ><i class="fa fa-folder-o mr-2" aria-hidden="true"></i>Group </button></li> -->
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- <div class="w-full max-w-md  p-4 mb-8 mt-8">
                                        <input v-model="search"
                                            class="relative w-full px-8 py-3 text-xl rounded-r focus:shadow-outline"
                                            autocomplete="off" type="text" name="search" placeholder="Search…" />
                                    </div> -->

                                </div>
                                <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400" v-if="current_group">
                                    <thead
                                        class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="py-3 px-6 text-xl"><input type="checkbox"
                                                    id="check_all" v-model="selectAll"></th>
                                            <th scope="col" class="py-3 px-6 text-xl uppercase">No</th>
                                            <th scope="col" class="py-3 px-6 text-xl uppercase">name</th>
                                            <th scope="col" class="py-3 px-6 text-xl uppercase">device ID</th>
                                            <th scope="col" class="py-3 px-6 text-xl uppercase">Brand</th>

                                            <!-- <th scope="col" class="py-3 px-6 text-xl">Os Version</th> -->
                                            <th scope="col" class="py-3 px-6 text-xl">Battery</th>
                                            <!-- <th scope="col" class="py-3 px-6 text-xl">Connect Wifi</th> -->


                                            <th scope="col" class="py-3 px-6 text-xl">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(device, index) in current_group.devices" :key="index"
                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td scope="row"
                                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <input type="checkbox" class="checkbox" v-model="selected"
                                                    :value="device.id">
                                            </td>
                                            <th scope="row"
                                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {{ index +1 }}
                                            </th>
                                            <th scope="row"
                                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {{ device.name }}</th>
                                            <th scope="row"
                                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {{
                                                        device.device_id
                                                }}</th>
                                            <th scope="row"
                                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <span
                                                    class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{{
                                                            device.brand
                                                    }}</span>
                                            </th>

                                            <!-- <th scope="row"
                                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {{ device.os_version }}</th> -->
                                            <th scope="row"
                                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <i class="fa fa-battery-full" aria-hidden="true"></i>{{ (device.battery
                                                        * 100)
                                                }} %
                                            </th>
                                            <!-- <th scope="row"
                                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <span v-if="device.connect_wifi"
                                                    class="text-xl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-600 text-white rounded"><i
                                                        class="fa fa-wifi  mr-2" aria-hidden="true"></i>{{
                                                                device.connect_wifi
                                                        }}</span>
                                                <p v-else>Not Connect</p>
                                            </th> -->
                                            <td class="py-4 px-6 text-right">

                                                <button type="button" @click="Delete(device.id)"
                                                    class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"><i
                                                        class="fa fa-trash" aria-hidden="true"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
import admin from "@/Pages/Admin/mixins/admin";
import Multiselect from "@vueform/multiselect/dist/multiselect.vue2.js";
import OpenAppModal from "@/Pages/Devices/Modal/OpenAppModal";
import OpenGroupApp from "@/Pages/Group/Modal/OpenGroupApp";
import DefaultGroupAppVue from "@/Pages/Group/Modal/DefaultGroupApp.vue";
export default {
    layout: Layout,
    mixins: [admin],
    components: {
        Link,
        ContentHeaderVue,
        Pagination,
        Alert,
        Multiselect,
        OpenAppModal,
        OpenGroupApp,
        DefaultGroupAppVue
    },
    props: {
        // group_id:Number,
        groups: Array,
        errors: Object,
        current_group: Object,
        devices: Array,
        applications: Array,
    },
    mounted() {
        Bus.$on('LauchAppSuccess', () => {
            this.selected = [];
        })
        Bus.$on('cloesModal', () => {
            this.selected = [];
        })
    
    },
    data() {

        return {
            editMode: false,
            selected: [],
            search: '',
            form: this.$inertia.form({
                id: null,
                name: null,
                devices: null
            })
        }
    },
    computed: {
        selectAll: {
            get: function () {
                return this.current_group.devices ? this.selected.length == this.current_group.devices : false;
            },
            set: function (value) {
                var selected = [];

                if (value) {
                    this.current_group.devices.forEach(function (device) {
                        selected.push(device.id);
                    });
                }

                this.selected = selected;
            }
        },

        filteredList() {
            return this.current_group.devices.filter(device => {
                return device.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        groupId() {
            return this.current_group.id
        },
        application_deivce() {
            if (this.selected.length > 0) {
                if (this.selected.length == 1) {
                    const found = this.current_group.devices.find(element => element.id == this.selected[0]);
                    // console.log('found',found);
                    // console.log('current_group',this.current_group);
                    return found.applications
                }

                return this.applications;
            }
            return [];
        },
        lauchDisabled() {
            return this.selected.length > 0 ? false : true
        },
        disableLauchGroup() {
            return this.current_group && this.current_group.devices.length >0? false : true
        }
    },
    methods: {
        reset() {
            this.form = this.$inertia.form({
                id: null,
                name: null,
                devices: null
            })
        },
        getGroup(group) {

            this.$inertia.get(route('group.index'),
                { group: group.id },
                {
                    preserveState: true
                })
        },
        Delete(id) {

            if (!confirm("Are you sure want to remove owner Deive for Group")) return;
            this.$inertia.post(route("group.deleteOwnerDevice", id), { group_id: this.current_group.id }, {
                preserveState: true,
                onError: errors => {
                    if (Object.keys(errors).length > 0) {
                        this.editMode = false;
                    }
                },
                onSuccess: page => {
                }
            });
        },
        save() {
            if (this.editMode) {
                this.form.put(route("group.update", this.form.id), {
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
                this.form.post(route("group.store"), {
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
            this.reset();
        },
        edit(data) {
            this.editMode = true;
            this.form.id = data.id;
            this.form.name = data.name;
            this.form.devices = this.multipleSelect(data.devices);

        },
        DeleteGroup(id) {
            if (!confirm("Are you sure want to remove?")) return;
            this.$inertia.delete(route("group.destroy", id));
        },

    }
}
</script>
<style src="@vueform/multiselect/themes/default.css">

</style>
<style>
.multiselect-tags-search {
    font-size: 1.25rem;
}
</style>
