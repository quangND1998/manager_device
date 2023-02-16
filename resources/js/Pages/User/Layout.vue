<template>

    <div :class="['wrapper', classes]">
        <Header></Header>

        <!-- Left side column. contains the logo and sidebar -->
        <SiderBar />
        <div class="content-wrapper">
            <!-- <slot /> -->
            <div class="flex-1 overflow-hidden px-4 py-8 md:p-4 overflow-y-auto" scroll-region>
                <card-user :user="user"></card-user>
                <div class="xl:hidden relative w-12/12 mx-auto bg-white rounded">
                    <nav
                        class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-500 mb-3 rounded">
                        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
                            <div
                                class="w-full relative flex justify-between xl:w-auto px-4 lg:static lg:block lg:justify-start">
                                <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                                    href="#pablo">Menu</a>
                                <button
                                    class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block xl:hidden outline-none focus:outline-none"
                                    type="button" v-on:click="toggleNavbar()">
                                    <i class="fa fa-bars"></i>
                                </button>
                            </div>
                            <div v-bind:class="{ 'hidden': !showMenu, 'flex': showMenu }"
                                class="xl:flex xl:flex-grow items-center">
                                <MenuUserResponsive :user="user" />
                            </div>
                        </div>
                    </nav>
                </div>
                <div class="xl:w-full xl:mx-0 h-12 vs:hidden xl:block   bg-white shadow rounded">
                    <menu-user :user="user" />
                </div>
                <div
                    class="relative flex mt-3 flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded overflow-y-auto">
                    <div class="px-4 py-5 flex-auto overflow-y-auto">
                        <div class="tab-content tab-space overflow-y-auto">
                            <div class="flex-1 overflow-hidden px-4 py-8 md:p-12 overflow-y-auto" scroll-region>
                              
                                <slot />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <dash-footer></dash-footer>
    </div>

</template>

<script>
import { Link } from "@inertiajs/inertia-vue";
import ContentHeaderVue from "@/Components/Layout/ContentHeader";
import CardUser from '@/Pages/User/CardUser'
import DashFooter from "@/Components/Layout/DashFooter";
import Header from "@/Components/Layout/Header";
import Menu from "@/Components/Layout/Menu";
import SiderBar from "@/Components/Layout/SiderBar";
import MenuUser from "@/Pages/User/MenuUser";
import MenuUserResponsive from "@/Pages/User/MenuUserResponsive";
import config from "../../config";
import 'hideseek'
export default {
    components: {
        Link,
        ContentHeaderVue,
        CardUser,
        DashFooter,
        Header,
        Menu,
        SiderBar,
        MenuUserResponsive,
        MenuUser
    },
    props: {
        user: Object,
    },
    data: function () {
        return {
            // section: 'Dash',
            classes: {
                fixed_layout: config.fixedLayout,
                hide_logo: config.hideLogoOnMobile
            },
            showMenu: false
        };
    },
    methods: {
        toggleNavbar: function () {
            this.showMenu = !this.showMenu;
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
