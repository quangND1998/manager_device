<template>
  <div :class="['wrapper', classes]">
    <Header></Header>

    <!-- Left side column. contains the logo and sidebar -->
    <SiderBar />
    <div class="content-wrapper">
      <slot />
    </div>
    <dash-footer></dash-footer>
  </div>
</template>

<script>
import DashFooter from "@/Components/Layout/DashFooter";
import Header from "@/Components/Layout/Header";
import Menu from "@/Components/Layout/Menu";
import SiderBar from "@/Components/Layout/SiderBar";
import UserMenu from "@/Components/Layout/UserMenu";
import config from "../../config";
import 'hideseek'
export default {
  components: {
    DashFooter,
    Header,
    Menu,
    SiderBar,
    UserMenu
  },
  data: function() {
    return {
      // section: 'Dash',
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      }
    };
  }
};
</script>

<style>
.wrapper.fixed_layout .main-header {
  position: fixed;
  width: 100%;
}
.wrapper.fixed_layout .content-wrapper {
  padding-top: 50px;
}
.wrapper.fixed_layout .main-sidebar {
  position: fixed;
  height: 100vh;
}

@media (max-width: 767px) {
  .wrapper.hide_logo .main-header .logo {
    display: none;
  }
}

.logo-mini,
.logo-lg {
  text-align: left;
}
.logo-mini img,
.logo-lg img {
  padding: 0.4em !important;
}

.logo-lg img {
  display: -webkit-inline-box;
  width: 25%;
}

.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
