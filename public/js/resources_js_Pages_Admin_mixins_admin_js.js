"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Admin_mixins_admin_js"],{

/***/ "./resources/js/Pages/Admin/mixins/admin.js":
/*!**************************************************!*\
  !*** ./resources/js/Pages/Admin/mixins/admin.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    multipleSelect: function multipleSelect(data) {
      var object = Object.assign({}, data);
      console.log(_typeof(object)); // // // let first = Object.assign({}, object[0]);

      var array = [];
      $.each(object, function (key, value) {
        array.push(parseInt(value.id));
      });
      return array;
    }
  }
});

/***/ })

}]);