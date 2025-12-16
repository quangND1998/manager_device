"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Devices_Modal_WifiModel_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    errors: Object,
    ids: Array,
    wifis: Array
  },
  data: function data() {
    return {
      search: '',
      editMode: true,
      form: this.$inertia.form({
        ids: this.ids,
        wifi_id: null,
        ssid: null,
        password: null
      })
    };
  },
  computed: {
    filteredList: function filteredList() {
      var _this = this;

      return this.wifis.filter(function (wifi) {
        return wifi.SSID.toLowerCase().includes(_this.search.toLowerCase());
      });
    }
  },
  methods: {
    clickApp: function clickApp(wifi) {
      $("#WifiModal").modal("hide");
      $("#openWifiNotification").modal("show");
      this.form.ids = this.ids;
      this.form.ssid = wifi.SSID;
      this.form.password = wifi.password;
    },
    reset: function reset() {
      this.form = this.$inertia.form({
        ids: this.ids,
        wifi_id: null,
        ssid: null,
        password: null
      });
      $("#openWifiNotification").modal("hide");
      $("#WifiModal").modal("hide");
    },
    createWifi: function createWifi() {
      this.form.ids = this.ids;
      $("#WifiModal").modal("hide");
    },
    saveWifi: function saveWifi() {
      var _this2 = this;

      //console.log(this.form.ids)
      this.form.post(route("device.connectWifi"), {
        preserveState: true,
        onError: function onError(errors) {},
        onSuccess: function onSuccess(page) {
          $("#WifiModal").modal("hide");

          _this2.reset();
        }
      });
    },
    connectWifi: function connectWifi() {
      var _this3 = this;

      //console.log(this.form.ids)
      this.form.post(route("device.connectWifi"), {
        preserveState: true,
        onError: function onError(errors) {},
        onSuccess: function onSuccess(page) {
          $("#openWifiNotification").modal("hide");
          $("#WifiModal").modal("hide");
          $('#createWifiModal').modal('hide');

          _this3.reset();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=template&id=9d8425b2&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=template&id=9d8425b2& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", [_c("div", {
    staticClass: "modal fade",
    attrs: {
      id: "createWifiModal",
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "exampleModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog",
    attrs: {
      role: "document"
    }
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_c("div", {
    staticClass: "modal-header"
  }, [_vm.editMode ? _c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Update Wifi")]) : _c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLabel"
    }
  }, [_vm._v("Create Wifi")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    },
    on: {
      click: function click($event) {
        return _vm.reset();
      }
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.saveWifi.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "form-group",
    "class": _vm.errors.ssid ? "is-valid" : ""
  }, [_c("label", {
    staticClass: "col-form-label",
    attrs: {
      "for": "recipient-name"
    }
  }, [_vm._v("SSID(Name Wifi):")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.ssid,
      expression: "form.ssid"
    }],
    staticClass: "form-control text-xl",
    "class": _vm.errors.ssid ? "is-valid" : "",
    attrs: {
      type: "text",
      id: "recipient-name"
    },
    domProps: {
      value: _vm.form.ssid
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;

        _vm.$set(_vm.form, "ssid", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.ssid ? _c("div", {
    staticClass: "text-red-500"
  }, [_vm._v(_vm._s(_vm.errors.ssid))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "form-group",
    "class": _vm.errors.password ? "is-valid" : ""
  }, [_c("label", {
    staticClass: "col-form-label",
    attrs: {
      "for": "recipient-name"
    }
  }, [_vm._v("Password:")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.password,
      expression: "form.password"
    }],
    staticClass: "form-control text-xl",
    "class": _vm.errors.password ? "is-valid" : "",
    attrs: {
      type: "text",
      id: "recipient-name"
    },
    domProps: {
      value: _vm.form.password
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;

        _vm.$set(_vm.form, "password", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.password ? _c("div", {
    staticClass: "text-red-500"
  }, [_vm._v(_vm._s(_vm.errors.password))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    },
    on: {
      click: function click($event) {
        return _vm.reset();
      }
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "submit"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.saveWifi();
      }
    }
  }, [_vm._v("Save\n                                changes")])])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "modal fade",
    attrs: {
      id: "WifiModal",
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "WifiModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog",
    attrs: {
      role: "document"
    }
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "WifiModalLabel"
    }
  }, [_vm._v("Connect Wifi")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    },
    on: {
      click: function click($event) {
        return _vm.reset();
      }
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", [_c("div", {
    staticClass: "w-full max-w-md p-4 mb-8 mt-8"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    staticClass: "block w-full py-3 pl-5 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500",
    attrs: {
      autocomplete: "off",
      type: "text",
      name: "search",
      placeholder: "Search…"
    },
    domProps: {
      value: _vm.search
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.search = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("h6", {
    staticClass: "font-medium leading-tight text-xl mt-0 mb-2 p-4 text-blue-600"
  }, [_vm._v("Choose some Wifi\n                        ")]), _vm._v(" "), _vm._l(_vm.filteredList, function (wifi, index) {
    return _c("ul", {
      key: index,
      staticClass: "flex flex-col p-4"
    }, [_c("li", {
      staticClass: "border-gray-200 flex flex-row mb-2",
      on: {
        click: function click($event) {
          $event.preventDefault();
          return _vm.clickApp(wifi);
        }
      }
    }, [_c("div", {
      staticClass: "select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
    }, [_vm._m(0, true), _vm._v(" "), _c("div", {
      staticClass: "flex-1 pl-1 mr-16"
    }, [_c("div", {
      staticClass: "font-medium"
    }, [_vm._v(_vm._s(wifi.SSID))])])])])]);
  }), _vm._v(" "), _c("h6", {
    staticClass: "font-medium leading-tight text-xl mt-0 mb-2 p-4"
  }, [_vm._v(" Or Create")]), _vm._v(" "), _c("button", {
    staticClass: "inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-toggle": "modal",
      "data-target": "#createWifiModal"
    },
    on: {
      click: function click($event) {
        return _vm.createWifi();
      }
    }
  }, [_vm._v("Create\n                            News")])], 2)])])])]), _vm._v(" "), _c("div", {
    staticClass: "modal fade",
    staticStyle: {
      "padding-right": "0px"
    },
    attrs: {
      id: "openWifiNotification",
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "openWifiNotificationLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog",
    attrs: {
      role: "document"
    }
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "openWifiNotificationLabel"
    }
  }, [_vm._v("Launch App")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    },
    on: {
      click: function click($event) {
        return _vm.reset();
      }
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.connectWifi.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "bg-blue-100 rounded-lg py-5 px-6 mb-3 tex-xl text-blue-700 inline-flex items-center w-full",
    attrs: {
      role: "alert"
    }
  }, [_c("svg", {
    staticClass: "w-4 h-4 mr-2 fill-current",
    attrs: {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fas",
      "data-icon": "info-circle",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }
  }, [_c("path", {
    attrs: {
      fill: "currentColor",
      d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
    }
  })]), _vm._v("\n                            Are you want to connect     "), _c("i", {
    staticClass: "fa fa-wifi",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("    "), _c("strong", [_vm._v(_vm._s(_vm.form.ssid))]), _vm._v("  for\n                            " + _vm._s(_vm.ids.length) + " devices?\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    },
    on: {
      click: function click($event) {
        return _vm.reset();
      }
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c("button", {
    staticClass: "inline-block px-6 py-2.5 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out",
    attrs: {
      type: "submit"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.connectWifi();
      }
    }
  }, [_vm._v("Run\n                            ")])])])])])])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "flex flex-col rounded-md w-10 h-10 bg-gray-100 justify-center items-center mr-4"
  }, [_c("i", {
    staticClass: "fa fa-wifi",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/Pages/Devices/Modal/WifiModel.vue":
/*!********************************************************!*\
  !*** ./resources/js/Pages/Devices/Modal/WifiModel.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WifiModel_vue_vue_type_template_id_9d8425b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WifiModel.vue?vue&type=template&id=9d8425b2& */ "./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=template&id=9d8425b2&");
/* harmony import */ var _WifiModel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WifiModel.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WifiModel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WifiModel_vue_vue_type_template_id_9d8425b2___WEBPACK_IMPORTED_MODULE_0__.render,
  _WifiModel_vue_vue_type_template_id_9d8425b2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Devices/Modal/WifiModel.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WifiModel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WifiModel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WifiModel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=template&id=9d8425b2&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=template&id=9d8425b2& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WifiModel_vue_vue_type_template_id_9d8425b2___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WifiModel_vue_vue_type_template_id_9d8425b2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WifiModel_vue_vue_type_template_id_9d8425b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WifiModel.vue?vue&type=template&id=9d8425b2& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Devices/Modal/WifiModel.vue?vue&type=template&id=9d8425b2&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);