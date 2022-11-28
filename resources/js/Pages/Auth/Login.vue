<template>
  <div>
    <breeze-validation-errors class="mb-4" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">{{ status }}</div>

    <form @submit.prevent="submit">
      <div class="text-center mb-3">
        <img class="image-logo" src="asset/img/HolomiaExpo.svg" alt />
      </div>
      <h1 class="text-center">Login</h1>
      <div>
        <breeze-label for="email" value="Email" />
        <input
          id="email"
          type="email"
            class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
          v-model="form.email"
          required
          autofocus
          autocomplete="username"
        />
      </div>

      <div class="mt-4">
        <breeze-label for="password" value="Password" />
        <div class="password-hidden">
          <input
            id="password"
            :type="passwordFieldType"
             class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
            v-model="form.password"
            required
            autocomplete="current-password"
          />
          <span class="span-hidden">
            <i
              :class="passwordFieldType =='password'? 'fa fa-eye' :'fa fa-eye-slash'"
              @click="switchVisibility"
            ></i>
          </span>
        </div>
      </div>

      <div class="block mt-4">
        <div class="flex items-center">
          <input
            type="checkbox"
            id="checkbox-example"
            v-model="form.remember"
            class="h-4 w-4 text-gray-700 border rounded mr-2"
          />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </div>
      </div>

      <div class="flex items-center justify-end mt-4">
        <Link
          :href="route('register')"
          class="underline text-sm mr-3 text-gray-600 hover:text-gray-900 text-left link ml"
        >Register ?</Link>
        <Link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >Forgot your password?</Link>

        <breeze-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :loading="form.processing"
        >Log in</breeze-button>
      </div>
      <div class="col-md-12" style="padding-left:65px">
        <!-- <a class="btn" :href="'/auth/facebook'">
          <i class="fab fa-facebook fa-2x" aria-hidden="true"></i>
        </a>-->
        <!-- <a class="btn" :href="'auth/google'">
          <i class="fab fa-google-plus-square fa-2x" aria-hidden="true"></i>
        </a> -->
      </div>
    </form>
  </div>
</template>

<script>
import BreezeButton from "@/Components/Button";
import BreezeGuestLayout from "@/Layouts/Guest";
import BreezeInput from "@/Components/Input";
import BreezeCheckbox from "@/Components/Checkbox";
import BreezeLabel from "@/Components/Label";
import BreezeValidationErrors from "@/Components/ValidationErrors";
import { Link } from "@inertiajs/inertia-vue";
export default {
  layout: BreezeGuestLayout,

  components: {
    BreezeButton,
    BreezeInput,
    BreezeCheckbox,
    BreezeLabel,
    BreezeValidationErrors,
    Link
  },

  props: {
    canResetPassword: Boolean,
    status: String
  },
  remember: {
    data: ["form"]
  },
  data() {
    return {
      passwordFieldType: "password",
      form: this.$inertia.form({
        email: null,
        password: null,
        remember: false
      })
    };
  },

  methods: {
    submit() {
      this.form.post(this.route("login"), {
        onFinish: () => this.form.reset("password")
      });
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    }
  }
};
</script>
<style scoped>
.show-password {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  cursor: pointer;
}

.form-floating-label {
  position: relative;
}
.password-hidden {
  position: relative;
}
.span-hidden {
  top: 30%;
  position: absolute;
  right: 20px;
  transition: auto;
}
</style>
