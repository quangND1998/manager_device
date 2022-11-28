<template>
  <div class="ml-4 language_icon">
    <Link :href="route('language', 'vi')" class="language">
      <icon class="w-5 h-5" :name="'vi'" />
    </Link>
    <Link :href="route('language', 'en')" class="language">
      <icon class="w-5 h-5" :name="'en'" />
    </Link>
  </div>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Icon from "@/Components/Icon";

export default {
  components: {
    Icon,
    Link,
  },

  computed: {
    selectable_locale() {
      if (this.$page.locale == "en") {
        return "vi";
      }
      return "en";
    },
  },
};
</script>
<style>
.language_icon {
  display: flex;
}
.language {
  margin-left: 5px;
}
</style>
