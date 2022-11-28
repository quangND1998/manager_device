<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img :src="$page.props.auth.user.avatar" class="user-image" alt="User Image" />
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{$page.props.auth.user.name}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{$page.props.auth.user.name}}</span>
          <small v-for="role in $page.props.auth.user.roles" :key="role">{{role}}</small>
        </p>
      </li>
      <li class="user-footer">
        <!-- <Link :href="route('logout')" method="post" class="btn btn-default btn-flat btn-block">
          <i class="fa fa-sign-out"></i>
          <span>Logout</span>
        </Link>-->
        <a class="btn btn-default btn-flat btn-block" @click="logout()">Logout</a>
      </li>
    </ul>
  </li>
</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
export default {
  components: {
    Link
  },
  methods: {
    logout() {
      this.$inertia.post(route("logout"));
    }
  }
};
</script>
