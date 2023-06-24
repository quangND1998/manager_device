<template>
  <!-- <div class="ml-4 py-5  language_icon">
    <Link :href="route('language', [selectable_locale])" class="language" aria-label="VietNam">
      <icon class="w-8 h-8" :name="selectable_locale" />
    </Link>
   
  </div> -->
  <li class="dropdown  user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <icon class="w-8 h-8" :name="selectable_locale" />
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu  " style="width:100px;">
      <li v-for="(value, key) in $page.props.locales" :key="key" :class="key==$page.props.locale ? 'bg-gray-300':''">
        <Link :href="route('language', [key])"  class="language " style="display:flex;" >
          <icon class="w-8 h-10" :name="key" />
          <span class="pl-4 text-center">{{value}}</span>
          <!-- <i v-if="key==$page.props.locale" class="fa fa-check pl-2" aria-hidden="true"></i> -->
        </Link>
     
      </li>

    </ul>
  </li>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import Icon from "@/Components/Icon";
export default {
  components: {
    Icon,
    Link
  },
  props:{

  },

  computed: {
    selectable_locale() {
      return this.$page.props.locale;
    },
  },
};
</script>
<style scoped>
.language_icon {
  display: flex;
}
a span{
  color: black !important;;
}
</style>
