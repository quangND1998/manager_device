<template>
    <div
      class="modal fade"
      id="updateAllModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
          
            <h5 class="modal-title" id="exampleModalLabel" >Update All User</h5>

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
                    >{{__('US')}}</label>
                    <div class="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" value="us" v-model="form.check" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-radio-1" class="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                        </div>
                    <p class="text-red-500 text-xl italic" v-if="errors.name">{{ errors.check }}</p>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
                      for="grid-last-name"
                    >{{__('China')}}</label>
                    <div class="flex items-center">
                            <input  id="default-radio-2" type="radio" value="china"  v-model="form.check"  name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-radio-2" class="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                        </div>
                        <p class="text-red-500 text-xl italic" v-if="errors.email">{{ errors.check }}</p> 
                  </div>
                </div>
                <!-- <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
                      for="grid-first-name"
                    >{{__('All')}}</label>
                    <div class="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" value="all"  v-model="form.check"  name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-radio-1" class="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                        </div>
                    <p class="text-red-500 text-xl italic" v-if="errors.name">{{ errors.name }}</p>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                  
                  </div>
                </div> -->
               
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:text-white hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out mx-2"
                  data-dismiss="modal"
                  @click="reset()"
                >Close</button>
                <button
                  @click.prevent="save()"
                  type="submit"
                  class="inline-block px-6 py-2.5 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out"
                >Import</button>
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
        errors:Object
    },
    data() {
    return {
      term: null,
      form: this.$inertia.form({
        check: 'us',
      
      })
    };
  },
  methods: {

    clickModal() {},
    save() {
     
        this.form.post(route("users.update-users"), {
          preserveState: true,
          onError: errors => {
            if (Object.keys(errors).length > 0) {
            
            }
          },
          onSuccess: page => {
            $("#updateAllModal").modal("hide");
            this.reset();
          }
        });
     
    },
    reset: function() {
      this.form = this.$inertia.form({
        check: 'us',
      });
    },

    clickModal() {
     
        
      this.reset();
    },

  }
}
</script>

<style>

</style>