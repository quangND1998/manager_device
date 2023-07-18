<template>
    <div>
        <div class="modal fade" id="openAppTime" tabindex="-1" role="dialog" aria-labelledby="openAppTimeLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="openAppTimeLabel">Launch App</h5>
                        <button type="button" class="close" data-dismiss="modal"  @click="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="w-full max-w-md  p-4 mb-8 mt-8">
                                <input v-model="search"
                                    class="relative w-full px-8 py-3 text-xl rounded-r focus:shadow-outline"
                                    autocomplete="off" type="text" name="search" placeholder="Search…" />
                            </div>
           
                            <ul class="flex flex-col  p-4" v-for="(app, index) in filteredList" :key="index">
                                <li class="border-gray-200 flex flex-row mb-2" @click.prevent="clickApp(app)">
                                    <div
                                        class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                        <div
                                            class="flex flex-col rounded-md w-10 h-10 bg-gray-100 justify-center items-center mr-4">
                                            <img :src="app.icon" width="50px" />
                                        </div>
                                        <div class="flex-1 pl-1 mr-16">
                                            <div class="font-medium">{{ app.appName }}</div>
                                            <div class="text-gray-600 tex-xl">{{ app.packageName }}</div>
                                        </div>


                                    </div>
                                </li>

                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="openNotificationTime" tabindex="-1" role="dialog"
            aria-labelledby="openNotificationLabel" aria-hidden="true" style="padding-right:0px">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="openNotificationLabel" >Launch App With Time</h5>
                        <button type="button" class="close" data-dismiss="modal"   @click="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="lauchApp">
                            <div class="bg-blue-100 rounded-lg py-5 px-6 mb-3 tex-xl text-blue-700 inline-flex items-center w-full"
                                role="alert">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle"
                                    class="w-6 h-6 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path fill="currentColor"
                                        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z">
                                    </path>
                                </svg>
                                <p>Are you want to run app &nbsp; <strong>{{ form.appName }}</strong>&nbsp; for
                                {{ ids.length }} devices?</p>
                                <select id="countries" v-model="form.time" class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 ml-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a Time</option>
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">60 minutes</option>
                                </select>
                                <div class="text-red-500" v-if="errors.time">{{ errors.time }}</div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" @click="close()"
                                    class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                                    data-dismiss="modal">Close</button>
                                <button @click.prevent="lauchApp()" type="submit"
                                    class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Run
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        errors: Object,
        applications: Array,
        ids: Array
    },
    data() {
        return {
            search: '',
            editMode: true,
            form: this.$inertia.form({
                ids: this.ids,
                appName: null,
                link_app: null,
                time:null,
            })
        }
    },
    computed: {
        filteredList() {
            return this.applications.filter(app => {
                return app.appName.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
   
    methods: {
        reset() {
        this.form = this.$inertia.form({
            ids: this.ids,
            appName: null,
            link_app: null,
            time:null
        })
    },
    close(){
        Bus.$emit('cloesModal')
        $("#openNotificationTime").modal("hide");
                    $("#openAppTime").modal("hide");
    },
        clickApp(app) {
            $("#openAppTime").modal("hide");
            $("#openNotificationTime").modal("show");
            this.form.ids = this.ids;
            this.form.link_app = app.packageName;
            this.form.appName = app.appName;


        },
        lauchApp() {
            console.log(this.form.ids)
         
            this.form.post(route("device.launch-app-time"), {
                preserveState: true,
                onError: errors => {

                },
                onSuccess: page => {
                    Bus.$emit('LauchAppSuccess')
                    this.$emit('updateTime', this.form.time)
                    $("#openNotificationTime").modal("hide");
                    $("#openAppTime").modal("hide");
                 
                    this.reset();
                }
            });
        }
    }

}
</script>

<style>

</style>