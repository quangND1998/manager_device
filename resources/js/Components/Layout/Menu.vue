<template>
  <ul class="sidebar-menu">
    <!-- <li class="header">TOOLS</li> -->
    <!-- <li tag="li" :class="[$page.component === 'Dashboard' ? 'active' : '']">
      <Link :href="route('dashboard')" >
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </Link>
    </li> -->



    <li class="header">Device Manager</li>
    <li tag="li" class="pageli">

      <li :class="[$page.component === 'Devices/Index' ? 'active' : '']">
          <Link :href="route('device.index')" :only="['devices']">
            <i class="fa fa-tasks"></i> Devices
          </Link>
        </li>
    </li>
    <li tag="li" class="pageli"  >
      <li :class="[$page.component === 'Application/Index' ? 'active' : '']" v-if="hasAnyPermission(['user-manager'])">
          <Link :href="route('application.index')">
            <i class="fa fa-th" aria-hidden="true"></i> Applications
          </Link>
        </li>

    </li>
    <li tag="li" class="pageli" >
      <li :class="[$page.component === 'Wifi/Index' ? 'active' : '']"  v-if="hasAnyPermission(['user-manager'])">
          <Link :href="route('wifi.index')">
            <i class="fa fa-wifi" aria-hidden="true"></i></i> Wifi
          </Link>
        </li>

    </li>
    <li tag="li" class="pageli">
      <li :class="[$page.component === 'Group/Index' ? 'active' : '']">
          <Link :href="route('group.index')">
            <i class="fa fa-folder-o" aria-hidden="true"></i></i> Groups
          </Link>
        </li>

    </li>
    <li :class="[$page.component === 'APK/Index' ? 'active' : '']" v-if="hasAnyPermission(['user-manager'])">
          <Link :href="route('apk.index')" >
            <i class="fa fa-file-archive-o" aria-hidden="true"></i> Installing 
          </Link>
    </li>

    <li class="header"></li>
    <li tag="li" :class="[$page.component === 'topup' ? 'active' : '']">
      <Link :href="route('topup.index')" >
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        <span class="page">Top Up</span>
      </Link>
    </li>
    <li tag="li" :class="[$page.component === 'payment' ? 'active' : '']">
      <Link :href="route('payment.index')" >
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        <span class="page">Bill</span>
      </Link>
    </li>


    
  
    <li class="header" v-if="hasAnyPermission(['user-manager'])">User managerment</li>
    <li class="treeview"  v-if="hasAnyPermission(['user-manager'])">
      <a href="#">
        <i class="fa fa-list"></i>
        <span class="treeview-title">User managerment</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li :class="[$page.component === 'Admin/Permission' ? 'active' : '']">
          <Link :href="route('permissions.index')">
            <i class="fa fa-shield"></i> Permissions
          </Link>
        </li>
        <li :class="[$page.component === 'Admin/Roles' ? 'active' : '']">
          <Link :href="route('roles.index')">
            <i class="fa fa-check-circle"></i> Roles
          </Link>
        </li>
        <li :class="[$page.component === 'Admin/User' ? 'active' : '']">
          <Link :href="route('users.index')">
            <i class="fa fa-users"></i> Users
          </Link>
        </li>
      </ul>
    </li>

    <li class="header" v-if="hasAnyPermission(['user-manager'])">Admin managerment</li>
    <li class="treeview"  v-if="hasAnyPermission(['user-manager'])">
      <a href="#">
        <i class="fa fa-list"></i>
        <span class="treeview-title">Admin managerment</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li :class="[$page.component === 'Package/Index' ? 'active' : '']">
          <Link :href="route('package.index')">
            <i class="fa fa-product-hunt" aria-hidden="true"></i> Package License
          </Link>
        </li>

      </ul>
    </li>
    <li class="header">Logout</li>
    <li tag="li" class="pageli">
      <Link :href="route('logout')" method="post">
        <i class="fa fa-sign-out text-yellow"></i>
        <span class="page">Logout</span>
      </Link>
    </li>
    <!-- <li class="header">LOGS</li>
    <li tag="li" class="pageli">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">Access</span>
      </a>
    </li>
    <li tag="li" class="pageli">
      <a>
        <i class="fa fa-hdd-o"></i>
        <span class="page">Server</span>
      </a>
    </li>
    <li tag="li" class="pageli" to="/repos">
      <a>
        <i class="fa fa-heart"></i>
        <span class="page">Repos</span>
        <small class="label pull-right bg-green">AJAX</small>
      </a>
    </li>

    <li class="header">PAGES</li>
    <li tag="li" class="pageli">
      <a>
        <i class="fa fa-circle-o text-yellow"></i>
        <span class="page">Login</span>
      </a>
    </li>
    <li tag="li" class="pageli">
      <a>
        <i class="fa fa-circle-o text-red"></i>
        <span class="page">404</span>
      </a>
    </li> -->
  </ul>
</template>
<script>
import { Link } from "@inertiajs/inertia-vue";
import { Inertia } from '@inertiajs/inertia'
export default {
  components: {
    Link
  },
  mounted(){
    Inertia.on('navigate', (event) => {
      $('body').removeClass('sidebar-open')
       console.log(`Navigated to ${event.detail.page.url}`)
  })
  }
  
};
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
