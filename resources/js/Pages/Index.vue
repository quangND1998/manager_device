<template>
  <div>
    <Link :href="route('route')">aaaaaaaaaa</Link>
  </div>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Layout from "@/Components/Layout/Layout"
export default {
  layout:Layout,
  components: {
    Link
  }
};
</script>

<style>
</style>