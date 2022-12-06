<template>
  <div
    class="min-h-screen  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"
  >
    <!-- <div>
            <Link href="/">
                <breeze-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </Link>
    </div>-->

    <div class="w-full xl:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg login-section">
      <slot />
    </div>
  </div>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";

import BreezeApplicationLogo from "@/Components/ApplicationLogo";

export default {
  components: {
    BreezeApplicationLogo,
    Link
  }
};
</script>
<style>
.login-section{
    min-width: 400px !important;
    font-size: 22px;
}
</style>
