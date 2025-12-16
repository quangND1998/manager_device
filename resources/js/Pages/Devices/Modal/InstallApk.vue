<template>
    <div>
        <div class="modal fade" id="openInstallApk" tabindex="-1" role="dialog" aria-labelledby="openInstallApkLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="openAppModalLabel">Install Apk</h5>
                        <button type="button" class="close" data-dismiss="modal" @click="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="w-full max-w-md  p-4 mb-8 mt-8">
                                <input v-model="search"
                                    class="block w-full py-3 pl-5 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    autocomplete="off" type="text" name="search" placeholder="Search…" />
                            </div>

                            <ul class="flex flex-col  p-4" v-for="(apk, index) in filteredList" :key="index">
                                <li class="border-gray-200 flex flex-row mb-2" @click.prevent="clickApp(apk)">
                                    <div
                                        class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                        <div
                                            class="flex flex-col rounded-md w-10 h-10 bg-gray-100 justify-center items-center mr-4">
                                            <i class="fa fa-file" aria-hidden="true"></i>
                                        </div>
                                        <div class="flex-1 pl-1 mr-16 justify-between">
                                            <div class="font-medium">{{ apk.name }}</div>
                                           
                                        </div>
                                        <div class="text-gray-600 tex-xl">{{ bytesToHuman(apk.size) }}</div>


                                    </div>
                                </li>

                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="openInstallApkNotification" tabindex="-1" role="dialog"
            aria-labelledby="openNotificationLabel" aria-hidden="true" style="padding-right:0px">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="openNotificationLabel">Install Apk</h5>
                        <button type="button" class="close" data-dismiss="modal" @click="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="installApk">
                            <div class="bg-blue-100 rounded-lg py-5 px-6 mb-3 tex-xl text-blue-700 inline-flex items-center w-full"
                                role="alert">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle"
                                    class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path fill="currentColor"
                                        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z">
                                    </path>
                                </svg>
                                Are you want to install  &nbsp; <strong>{{ form.appName }}</strong>&nbsp; for
                                {{ ids.length }} devices?
                            </div>
                            <div class="modal-footer">
                                <button type="button" @click="close()"
                                    class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                                    data-dismiss="modal">Close</button>
                                <button @click.prevent="installApk()" type="submit"
                                    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out">Run
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
        apk_files: Array,
        ids: Array
    },
    data() {
        return {
            search: '',
            editMode: true,
            form: this.$inertia.form({
                ids: this.ids,
                appName: null,
                path: null,
            })
        }
    },
    computed: {
        filteredList() {
            return this.apk_files.filter(apk => {
                return apk.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },

    methods: {
        reset() {
            this.form = this.$inertia.form({
                ids: this.ids,
                appName: null,
                path: null,
            })
        },
        close() {
            Bus.$emit('cloesModal')
            $("#openInstallApkNotification").modal("hide");
            $("#openInstallApk").modal("hide");
        },
        clickApp(apk) {
            $("#openInstallApk").modal("hide");
            $("#openInstallApkNotification").modal("show");
            this.form.ids = this.ids;
            this.form.path = apk.path;
            this.form.appName =apk.name


        },
        installApk() {
            console.log(this.form.ids)

            this.form.post(route("apk.install"), {
                preserveState: true,
                onError: errors => {

                },
                onSuccess: page => {
                    Bus.$emit('LauchAppSuccess')
                    $("#openInstallApkNotification").modal("hide");
                    $("#openInstallApk").modal("hide");

                    this.reset();
                }
            });
        }
    }

}
</script>

<style>

</style>