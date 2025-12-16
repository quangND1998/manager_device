import './bootstrap';
import Vue from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue'

import moment from 'moment';
import VueSwal from 'vue-swal';
import VueToast from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-bootstrap.css';
import VueCountdown from '@chenfengyuan/vue-countdown';

Vue.component('vue-countdown', VueCountdown);
Vue.use(VueToast);
createInertiaApp({
    resolve: name =>
        import (`./Pages/${name}`),
    setup({ el, App, props, plugin }) {
        Vue.use(plugin)

        new Vue({
            render: h => h(App, props),
        }).$mount(el)
    },
})
Vue.mixin({
    methods: {
        route: window.route,
    }
})

Vue.mixin({
    methods: {
        hasAnyPermission: function(permissions) {

            var allPermissions = this.$page.props.auth.can;
            var hasPermission = false;
            permissions.forEach(function(item) {
                if (allPermissions[item]) hasPermission = true;
            });
            return hasPermission;
        },
        hasAnyRoles: function(roles) {

            var allroles = this.$page.props.auth.roles;

            var hasRole = false;
            roles.forEach(function(item) {

                if (allroles[item]) hasRole = true;

            });
            return hasRole;
        },
        hasRoles: function(user, roles) {
            var hasRole = false;
            user.roles.forEach(function(item) {
                if (item.name == roles) hasRole = true;
            });
            return hasRole;
        },

        formatDate: function(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
            }
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        bytesToHuman(bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            if (bytes === 0) return '0 Bytes';

            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

            if (i === 0) return `${bytes} ${sizes[i]}`;

            return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
        },


    },
})

Vue.mixin(
    require('./base'))
Vue.mixin({
    methods: {
        route: window.route,
    }
})
Vue.use(VueSwal)
window.Bus = new Vue();
Vue.config.devtools = true;
Vue.config.productionTip = true
