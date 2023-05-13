/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/base.js":
/*!******************************!*\
  !*** ./resources/js/base.js ***!
  \******************************/
/***/ ((module) => {

module.exports = {
  methods: {
    /**
     * Translate the given key.
     */
    __: function __(key) {
      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var translation = this.$page.props.language[key] ? this.$page.props.language[key] : key;
      Object.keys(replace).forEach(function (key) {
        translation = translation.replace(':' + key, replace[key]);
      });
      return translation;
    },
    _lang: function _lang(key) {
      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var translation = this.$page.props.virtual_language[key] ? this.$page.props.virtual_language[key] : key;
      Object.keys(replace).forEach(function (key) {
        translation = translation.replace(':' + key, replace[key]);
      });
      return translation;
    }
  }
};

/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "@fortawesome/free-brands-svg-icons":
/*!*****************************************************!*\
  !*** external "@fortawesome/free-brands-svg-icons" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/free-brands-svg-icons");

/***/ }),

/***/ "@fortawesome/free-regular-svg-icons":
/*!******************************************************!*\
  !*** external "@fortawesome/free-regular-svg-icons" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/free-regular-svg-icons");

/***/ }),

/***/ "@fortawesome/free-solid-svg-icons":
/*!****************************************************!*\
  !*** external "@fortawesome/free-solid-svg-icons" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "@fortawesome/vue-fontawesome":
/*!***********************************************!*\
  !*** external "@fortawesome/vue-fontawesome" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fortawesome/vue-fontawesome");

/***/ }),

/***/ "@inertiajs/inertia-vue":
/*!*****************************************!*\
  !*** external "@inertiajs/inertia-vue" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@inertiajs/inertia-vue");

/***/ }),

/***/ "@inertiajs/server":
/*!************************************!*\
  !*** external "@inertiajs/server" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@inertiajs/server");

/***/ }),

/***/ "@vue/composition-api":
/*!***************************************!*\
  !*** external "@vue/composition-api" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@vue/composition-api");

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "vue" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("vue");

/***/ }),

/***/ "vue-server-renderer":
/*!**************************************!*\
  !*** external "vue-server-renderer" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("vue-server-renderer");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./resources/js/ssr.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-server-renderer */ "vue-server-renderer");
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @inertiajs/inertia-vue */ "@inertiajs/inertia-vue");
/* harmony import */ var _inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _inertiajs_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @inertiajs/server */ "@inertiajs/server");
/* harmony import */ var _inertiajs_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/composition-api */ "@vue/composition-api");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "@fortawesome/fontawesome-svg-core");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "@fortawesome/free-brands-svg-icons");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "@fortawesome/free-regular-svg-icons");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _fortawesome_vue_fontawesome__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/vue-fontawesome */ "@fortawesome/vue-fontawesome");
/* harmony import */ var _fortawesome_vue_fontawesome__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_vue_fontawesome__WEBPACK_IMPORTED_MODULE_9__);
// import './bootstrap';










_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__.library.add(_fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__.fab, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__.fas, _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_8__.far);
vue__WEBPACK_IMPORTED_MODULE_0___default().component('font-awesome-icon', _fortawesome_vue_fontawesome__WEBPACK_IMPORTED_MODULE_9__.FontAwesomeIcon);
vue__WEBPACK_IMPORTED_MODULE_0___default().use((_vue_composition_api__WEBPACK_IMPORTED_MODULE_4___default()));
_inertiajs_server__WEBPACK_IMPORTED_MODULE_3___default()(function (page) {
  return (0,_inertiajs_inertia_vue__WEBPACK_IMPORTED_MODULE_2__.createInertiaApp)({
    page: page,
    render: (0,vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__.createRenderer)().renderToString,
    resolve: function resolve(name) {
      var pages = ({}).glob('./Pages/**/*.vue', {
        eager: true
      });
      return pages["./Pages/".concat(name, ".vue")];
    },
    title: function title(_title) {
      return "".concat(_title, " - CartonShop");
    },
    setup: function setup(_ref) {
      var App = _ref.App,
          props = _ref.props,
          plugin = _ref.plugin;
      vue__WEBPACK_IMPORTED_MODULE_0___default().use(plugin);
      return new (vue__WEBPACK_IMPORTED_MODULE_0___default())({
        render: function render(h) {
          return h(App, props);
        }
      });
    }
  });
}); // Vue.mixin({
//     methods: {
//         route: window.route,
//     }
// })
// Vue.prototype.route = route

vue__WEBPACK_IMPORTED_MODULE_0___default().mixin({
  methods: {
    hasAnyPermission: function hasAnyPermission(permissions) {
      var allPermissions = this.$page.props.auth.can;
      var hasPermission = false;
      permissions.forEach(function (item) {
        if (allPermissions[item]) hasPermission = true;
      });
      return hasPermission;
    },
    hasAnyRoles: function hasAnyRoles(roles) {
      var allroles = this.$page.props.auth.roles;
      var hasRole = false;
      roles.forEach(function (item) {
        if (allroles[item]) hasRole = true;
      });
      return hasRole;
    },
    hasRoles: function hasRoles(user, roles) {
      var hasRole = false;
      user.roles.forEach(function (item) {
        if (item.name == roles) hasRole = true;
      });
      return hasRole;
    },
    formatDate: function formatDate(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm');
      }
    }
  }
});
vue__WEBPACK_IMPORTED_MODULE_0___default().mixin(__webpack_require__(/*! ./base */ "./resources/js/base.js"));
(vue__WEBPACK_IMPORTED_MODULE_0___default().config.devtools) = true;
(vue__WEBPACK_IMPORTED_MODULE_0___default().config.productionTip) = false;
})();

/******/ })()
;