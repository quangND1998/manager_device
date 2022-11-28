<template>
  <div>
    <breeze-validation-errors class="mb-4" />
    <div class="text-center mb-3">
      <img class="image-logo" src="asset/img/HolomiaExpo.svg" alt />
    </div>
    <h1 class="text-center">Register</h1>
    <form @submit.prevent="submit">
      <!-- <div v-if="check==false" class="block">
        <span class="text-left text-gray-700 ml-1">Please select your account type ?</span>
        <div class="mt-2">
          <div>
            <label class="inline-flex items-center">
              <input
                v-model="form.type"
                type="radio"
                class="form-radio"
                name="radio"
                value="ve"
                checked
              />
              <span class="ml-2">Virtual Expo Account</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input v-model="form.type" type="radio" class="form-radio" name="radio" value="fh" />
              <span class="ml-2">Future Home Account</span>
            </label>
          </div>
        </div>
      </div>-->
      <!-- <button
        class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150"
        v-if="check==false"
        @click="nextStep()"
      >Next</button> -->
      <div >
        <breeze-label for="name" value="Name" />
        <input
          id="name"
          type="text"
            class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
          v-model="form.name"
          required
          autofocus
          autocomplete="name"
        />
      </div>

      <div  class="mt-4">
        <breeze-label for="email" value="Email" />
        <input
          id="email"
          type="email"
           class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
          v-model="form.email"
          required
          autocomplete="username"
        />
      </div>

      <div  class="mt-4">
        <breeze-label for="password" value="Password" />
        <input
          id="password"
          type="password"
         class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="mt-4">
        <breeze-label for="password_confirmation" value="Confirm Password" />
        <input
          id="password_confirmation"
          type="password"
         class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
          v-model="form.password_confirmation"
          required
          autocomplete="new-password"
        />
      </div>

      <div  class="flex items-center justify-end mt-3">
        <Link
          :href="route('login')"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >Already registered?</Link>
        <!-- <button
          @click="nextStep()"
          class="inline-flex items-center px-4 py-2 bg-yellow-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-500 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150 ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >Go Back</button> -->

        <breeze-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >Register</breeze-button>
        <!-- <div class="flex items-center justify-around mt-4">
          <a class="btn" @click="Login('facebook')">
            <i class="fab fa-facebook fa-2x" aria-hidden="true"></i>
          </a>
          <a class="btn" @click="Login('google')">
            <i class="fab fa-google-plus-square fa-2x" aria-hidden="true"></i>
          </a>
        </div>-->
        <div class="col-md-2">
          <!-- <a class="btn" :href="'/auth/facebook?userType=' + form.type">
            <i class="fab fa-facebook fa-2x" aria-hidden="true"></i>
          </a>-->
          <!-- <a class="btn" :href="'auth/google?userType=' + form.type">
            <i class="fab fa-google-plus-square fa-2x" aria-hidden="true"></i>
          </a> -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BreezeButton from "@/Components/Button";
import BreezeGuestLayout from "@/Layouts/Guest";
import BreezeInput from "@/Components/Input";
import BreezeLabel from "@/Components/Label";
import BreezeValidationErrors from "@/Components/ValidationErrors";
import { Link } from "@inertiajs/inertia-vue";
export default {
  layout: BreezeGuestLayout,

  components: {
    BreezeButton,
    BreezeInput,
    BreezeLabel,
    BreezeValidationErrors,
    Link
  },

  data() {
    return {
      check: false,
      form: this.$inertia.form({
        type: "ve",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms: false
      })
    };
  },

  methods: {
    submit() {
      this.form.post(this.route("register"), {
        onFinish: () => this.form.reset("password", "password_confirmation")
      });
    },
    nextStep() {
      this.check = !this.check;
    }
    // Login(social) {
    //   this.form.get(this.route("auth.social", social), this.form, {
    //     preserveState: false
    //   });
    // }
  }
};
</script>