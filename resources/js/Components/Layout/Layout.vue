<template>
  <div :class="['wrapper', classes]">
    <Header></Header>

    <!-- Left side column. contains the logo and sidebar -->
    <SiderBar />
    <div class="content-wrapper">
      <transition name="custom-classes-transition" enter-active-class="animated pulse">

        <slot />
      </transition>

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
  data: function () {
    return {
      // section: 'Dash',
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      }
    };
  },
  mounted() {
    this.listenNotificationGroup()
    this.listenNotificationDevice()
  },
  methods: {
    listenNotificationGroup() {
      this.sockets.subscribe(`time-play-notification.${this.$page.props.auth.user.id}:App\\Events\\TimeEndGroupNotification`, (data) => {
        console.log(data)
        // this.$toast.warning(`Group ${data.group_name} Timer Ends`, {
        //   // override the global option
        //   position: 'bottom-right',

        //   duration: 60000,
        //   dismissible: true
        // })

        this.$swal(`Group ${data.group_name} Timer Ends`, {
          icon: "warning",
          timer: 60000,
        });
      });
    },
    listenNotificationDevice() {
      console.log(this.user.id)
      if (this.user) {
        this.sockets.subscribe(`time-end-device.${this.$page.props.auth.user.id}:App\\Events\\TimeEndDeviceNotification`, (data) => {
          console.log(data)
          this.$swal(`Group ${data.group_name} Timer Ends`, {
            icon: "warning",
            timer: 60000,
          });
        });
      }

    }
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
