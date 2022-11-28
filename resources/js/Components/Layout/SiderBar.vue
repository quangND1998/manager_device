<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div class="pull-left image">
          <img v-if="$page.props.auth.user" :src="$page.props.auth.user.avatar" />
        </div>
        <div class="pull-left info">
          <div>
            <p class="white" v-if="$page.props.auth.user">{{$page.props.auth.user.name}}</p>
          </div>
          <a href="javascript:;">
            <i class="fa fa-circle text-success"></i> Online
          </a>
        </div>
      </div>

      <!-- search form (Optional) -->
      <form v-on:submit.prevent class="sidebar-form" id="searchForm">
        <div class="input-group" id="searchContainer">
          <span class="input-group-btn">
            <input
              type="text"
              name="search"
              id="search"
              class="search form-control"
              data-toggle="hideseek"
              p
              laceholder="Search Menus"
              data-list=".sidebar-menu"
            />
            <button type="submit" name="search" id="search-btn" class="btn btn-flat">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
      <!-- /.search form -->

      <!-- Sidebar Menu -->
      <Menu />
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import Menu from "@/Components/Layout/Menu";

export default {
  components: { Menu },
  mounted: function() {
    $('[data-toggle="hideseek"]')
      .off()
      .hideseek();
  }
};
</script>
<style scope="local">
.user-panel .image img {
  border-radius: 50%;
}
#searchForm {
  padding-left: 0em;
  padding-right: 0em;
}
#searchContainer {
  height: 100%;
  padding-bottom: 0em;
}
#search {
  width: 80%;
  float: right;
}

#search-btn {
  width: 20%;
}
</style>
