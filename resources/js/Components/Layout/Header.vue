<template>
  <header class="main-header">
    <span class="logo-mini">
      <a href="/">
        <img
          src="/static/img/copilot-logo-white.svg"
          alt="Logo"
          class="img-responsive center-block logo"
        />
      </a>
    </span>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <UserMenu></UserMenu>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import UserMenu from "@/Components/Layout/UserMenu";

export default {
  components: {
    UserMenu
  }
};
</script>
