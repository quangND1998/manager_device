<template>
            <div class="modal fade" id="groupModal" tabindex="-1" role="dialog" aria-labelledby="groupModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="groupModalLabel">Create Group</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="reset()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveGroup">
                            <div class="form-group" :class="errors.name ? 'is-valid' : ''">
                                <label for="recipient-name" class="col-form-label">Name:</label>
                                <input type="text" class="form-control text-xl" :class="errors.name ? 'is-valid' : ''"
                                    v-model="form.name" id="recipient-name" />
                                <div class="text-red-500" v-if="errors.name">{{ errors.name }}</div>
                            </div>
                    
                            <div class="modal-footer">
                                <button type="button"
                                    class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                                    data-dismiss="modal" @click="reset()">Close</button>
                                <button @click.prevent="saveGroup()" type="submit"
                                    class="inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Save
                                    changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props:{
        ids:Array,
        errors:Object,
      
    },
    data(){
        return {
            form: this.$inertia.form({
                name:null,
                devices: this.ids
            })
        }
    },
    methods:{
        reset(){
            this.form = this.$inertia.form({
                name:null,
                devices: this.ids

            })
        },
        saveGroup(){
            this.form.devices = this.ids;
            this.form.post(route("group.store"), {
                preserveState: true,
                onError: errors => {

                },
                onSuccess: page => {
                    $("#groupModal").modal("hide");
                    this.reset();
                }
            });
        },
    }
}
</script>

<style>

</style>