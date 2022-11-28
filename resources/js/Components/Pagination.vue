<template>
  <div v-if="links.length > 3" class="mt-8">
    <div class="flex flex-wrap -mb-1">
      <div v-for="(link, k) in links" :key="k">
        <div
          v-if="link.url === null"
          class="mr-1 mb-1 px-6 py-3 text-xl leading-4 text-gray-400 border rounded"
          v-html="link.label"
        />
        <Link
          v-else
          class="mr-1 mb-1 px-6 py-3 text-xl leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500"
          :class="{ 'bg-blue-700 text-white': link.active }"
          :href="link.url"
          v-html="link.label"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import { Link } from "@inertiajs/inertia-vue";
export default {
  components: {
    Link
  },
  props: {
    links: Array
  }
};
</script> 