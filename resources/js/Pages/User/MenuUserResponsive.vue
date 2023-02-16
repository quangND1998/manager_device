<template>
  <ul class="grid gap-4 grid-cols-3">
    <li class="nav-item">
      <Link
        :href="route('user.devices.index', user.id)"
        class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75"
      >
        <icon
          name="information"
          class="icon icon-tabler icon-tabler-home"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <span class="ml-2">Devices</span>
      </Link>
    </li>

    <li class="nav-item">
      <Link
        :href="route('user.devices.history', user.id)"
        class="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-white hover:opacity-75"
      >
        <icon
          name="information"
          class="icon icon-tabler icon-tabler-home"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <span class="ml-2">History Devices</span>
      </Link>
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
