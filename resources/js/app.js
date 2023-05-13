import './bootstrap';
// import jQuery from 'jQuery'
import Vue from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue'
import { InertiaProgress } from '@inertiajs/progress'
import VueCompositionAPI from '@vue/composition-api'
import moment from 'moment';
InertiaProgress.init({})
Vue.use(VueCompositionAPI)
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

// router.on('navigate', (event) => {
//     console.log(`Navigated to ${event.detail.page.url}`)
// })
Vue.mixin(require('./base'))
const el = document.getElementById('app')
Vue.mixin({
    methods: {
        route: window.route,
    }
})
window.Bus = new Vue();
InertiaProgress.init({
    delay: 150,
    color: '#1E377F',
    includeCSS: true,
    showSpinner: true,
});
Vue.config.devtools = true;
Vue.config.productionTip = true
    // window.jQuery = jQuery