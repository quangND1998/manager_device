<template>
  <ul class="flex border-b px-5">

    <li :class="[$page.component === 'User/Devices' ? 'text-indigo-700' : '']"
      class="text-xl border-indigo-700 pt-3 rounded-t text-gray-600 mr-12 hover:text-indigo-700 cursor-pointer">
      <Link class="flex items-center mb-3" :href="route('user.devices.index', user.id)">
      <icon name="information" class="icon icon-tabler icon-tabler-home" width="16" height="16" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <span class="ml-1 font-normal">Devices</span>
      </Link>
      <div :class="[$page.component === 'User/Devices' ? 'w-full h-1 bg-indigo-700 rounded-t-md' : '']"></div>
    </li>
    <li :class="[$page.component === 'User/History' ? 'text-indigo-700' : '']"
      class="text-xl border-indigo-700 pt-3 rounded-t text-gray-600 mr-12 hover:text-indigo-700 cursor-pointer">
      <Link class="flex items-center mb-3" :href="route('user.devices.history', user.id)">
      <icon name="information" class="icon icon-tabler icon-tabler-home" width="16" height="16" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <span class="ml-1 font-normal">History Devices</span>
      </Link>
      <div :class="[$page.component === 'User/History' ? 'w-full h-1 bg-indigo-700 rounded-t-md' : '']"></div>
    </li>

 

  </ul>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Icon from "@/Components/Icon";
export default {
  props: {
    user: Object
  },
  components: {
    Link,
    Icon
  }
};
</script>

<style>
</style>