(self.webpackChunk=self.webpackChunk||[]).push([[90],{4491:(t,e,a)=>{"use strict";a.d(e,{Z:()=>s});const s={serverURI:"",fixedLayout:!0,hideLogoOnMobile:!0}},6542:(t,e,a)=>{"use strict";a.d(e,{Z:()=>r});var s=a(3645),i=a.n(s)()((function(t){return t[1]}));i.push([t.id,".wrapper.fixed_layout .main-header{position:fixed;width:100%}.wrapper.fixed_layout .content-wrapper{padding-top:50px}.wrapper.fixed_layout .main-sidebar{height:100vh;position:fixed}@media (max-width:767px){.wrapper.hide_logo .main-header .logo{display:none}}.logo-lg,.logo-mini{text-align:left}.logo-lg img,.logo-mini img{padding:.4em!important}.logo-lg img{display:-webkit-inline-box;width:25%}.user-panel{height:4em}hr.visible-xs-block{background-color:rgba(0,0,0,.17);border-color:transparent;height:1px;width:100%}",""]);const r=i},9078:(t,e,a)=>{"use strict";a.d(e,{Z:()=>r});var s=a(3645),i=a.n(s)()((function(t){return t[1]}));i.push([t.id,".sidebar-menu>li>a{padding:12px 15px}.sidebar-menu li.active>a>.fa-angle-left,.sidebar-menu li.active>a>.pull-right-container>.fa-angle-left{-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-name:rotate;animation-name:rotate}.treeview-title{z-index:1}@-webkit-keyframes rotate{0%{transform:rotate(0deg)}to{transform:rotate(-90deg)}}@keyframes rotate{0%{transform:rotate(0deg)}to{transform:rotate(-90deg)}}",""]);const r=i},6581:(t,e,a)=>{"use strict";a.d(e,{Z:()=>r});var s=a(3645),i=a.n(s)()((function(t){return t[1]}));i.push([t.id,".user-panel .image img{border-radius:50%}#searchForm{padding-left:0;padding-right:0}#searchContainer{height:100%;padding-bottom:0}#search{float:right;width:80%}#search-btn{width:20%}",""]);const r=i},5549:(t,e,a)=>{"use strict";a.d(e,{Z:()=>r});var s=a(3645),i=a.n(s)()((function(t){return t[1]}));i.push([t.id,".fm-grid{padding-top:1rem}.fm-grid .fm-grid-item{border-radius:5px;margin-bottom:1rem;margin-right:1rem;padding:.4rem;position:relative;width:125px}.fm-grid .fm-grid-item.active{background-color:#c2e5eb;box-shadow:3px 2px 5px gray}.fm-grid .fm-grid-item:not(.active):hover{background-color:#f8f9fa;box-shadow:3px 2px 5px gray}.fm-grid .fm-grid-item .fm-item-icon{cursor:pointer}.fm-grid .fm-grid-item .fm-item-icon>figure>i,.fm-grid .fm-grid-item .fm-item-icon>i{color:#6d757d}.fm-grid .fm-grid-item .fm-item-info{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",""]);const r=i},3645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var a=t(e);return e[2]?"@media ".concat(e[2]," {").concat(a,"}"):a})).join("")},e.i=function(t,a,s){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(s)for(var r=0;r<this.length;r++){var n=this[r][0];null!=n&&(i[n]=!0)}for(var o=0;o<t.length;o++){var l=[].concat(t[o]);s&&i[l[0]]||(a&&(l[2]?l[2]="".concat(a," and ").concat(l[2]):l[2]=a),e.push(l))}},e}},9193:()=>{!function(t,e,a){"use strict";t.fn.hideseek=function(e){e=t.extend({list:".hideseek-data",nodata:"",attribute:"text",matches:!1,highlight:!1,ignore:"",headers:"",navigation:!1,ignore_accents:!1,hidden_mode:!1,min_chars:1},e);return this.each((function(){var a=t(this);a.opts=[],t.map(["list","nodata","attribute","matches","highlight","ignore","headers","navigation","ignore_accents","hidden_mode","min_chars"],(function(t,s){a.opts[t]=a.data(t)||e[t]})),a.opts.headers&&(a.opts.ignore+=a.opts.ignore?", "+a.opts.headers:a.opts.headers);var s=t(a.opts.list);a.opts.navigation&&a.attr("autocomplete","off"),a.opts.hidden_mode&&s.children().hide(),a.keyup((function(e){if(-1==[38,40,13].indexOf(e.keyCode)&&(8==e.keyCode||a.val().length>=a.opts.min_chars)){var i=a.val().toLowerCase();s.children(a.opts.ignore.trim()?":not("+a.opts.ignore+")":"").removeClass("selected").each((function(){var e=("text"!=a.opts.attribute?t(this).attr(a.opts.attribute)||"":t(this).text()).toLowerCase();-1==e.removeAccents(a.opts.ignore_accents).indexOf(i)||i===(!!a.opts.hidden_mode&&"")?t(this).hide():(r(t(this)),a.opts.matches&&null!==i.match(new RegExp(Object.keys(a.opts.matches)[0]))&&(null!==e.match(new RegExp(Object.values(a.opts.matches)[0]))?r(t(this)):t(this).hide())),a.trigger("_after_each")})),a.opts.nodata&&(s.find(".no-results").remove(),s.children(':not([style*="display: none"])').length||(s.children().first().clone().removeHighlight().addClass("no-results").show().prependTo(a.opts.list).text(a.opts.nodata),a.trigger("_after_nodata"))),a.opts.headers&&t(a.opts.headers,s).each((function(){t(this).nextUntil(a.opts.headers).not('[style*="display: none"],'+a.opts.ignore).length?t(this).show():t(this).hide()})),a.trigger("_after")}function r(t){a.opts.highlight?t.removeHighlight().highlight(i).show():t.show()}function n(t){return t.children(".selected:visible")}var o;a.opts.navigation&&(38==e.keyCode?n(s).length?((o=s,n(o).prevAll(":visible:first")).addClass("selected"),n(s).last().removeClass("selected")):s.children(":visible").last().addClass("selected"):40==e.keyCode?n(s).length?(function(t){return n(t).nextAll(":visible:first")}(s).addClass("selected"),n(s).first().removeClass("selected")):s.children(":visible").first().addClass("selected"):13==e.keyCode&&(n(s).find("a").length?document.location=n(s).find("a").attr("href"):a.val(n(s).text())))}))}))},t(document).ready((function(){t('[data-toggle="hideseek"]').hideseek()}))}(jQuery),jQuery.fn.highlight=function(t){function e(t,a){var s=0;if(3==t.nodeType){var i=t.data.removeAccents(!0).toUpperCase().indexOf(a);if(i>=0){var r=document.createElement("mark");r.className="highlight";var n=t.splitText(i);n.splitText(a.length);var o=n.cloneNode(!0);r.appendChild(o),n.parentNode.replaceChild(r,n),s=1}}else if(1==t.nodeType&&t.childNodes&&!/(script|style)/i.test(t.tagName))for(var l=0;l<t.childNodes.length;++l)l+=e(t.childNodes[l],a);return s}return this.length&&t&&t.length?this.each((function(){e(this,t.toUpperCase())})):this},jQuery.fn.removeHighlight=function(){return this.find("mark.highlight").each((function(){with(this.parentNode.firstChild.nodeName,this.parentNode)replaceChild(this.firstChild,this),normalize()})).end()},String.prototype.removeAccents=function(t){return t?this.replace(/[áàãâä]/gi,"a").replace(/[éè¨ê]/gi,"e").replace(/[íìïî]/gi,"i").replace(/[óòöôõ]/gi,"o").replace(/[úùüû]/gi,"u").replace(/[ç]/gi,"c").replace(/[ñ]/gi,"n"):this}},3379:(t,e,a)=>{"use strict";var s,i=function(){return void 0===s&&(s=Boolean(window&&document&&document.all&&!window.atob)),s},r=function(){var t={};return function(e){if(void 0===t[e]){var a=document.querySelector(e);if(window.HTMLIFrameElement&&a instanceof window.HTMLIFrameElement)try{a=a.contentDocument.head}catch(t){a=null}t[e]=a}return t[e]}}(),n=[];function o(t){for(var e=-1,a=0;a<n.length;a++)if(n[a].identifier===t){e=a;break}return e}function l(t,e){for(var a={},s=[],i=0;i<t.length;i++){var r=t[i],l=e.base?r[0]+e.base:r[0],c=a[l]||0,d="".concat(l," ").concat(c);a[l]=c+1;var p=o(d),u={css:r[1],media:r[2],sourceMap:r[3]};-1!==p?(n[p].references++,n[p].updater(u)):n.push({identifier:d,updater:g(u,e),references:1}),s.push(d)}return s}function c(t){var e=document.createElement("style"),s=t.attributes||{};if(void 0===s.nonce){var i=a.nc;i&&(s.nonce=i)}if(Object.keys(s).forEach((function(t){e.setAttribute(t,s[t])})),"function"==typeof t.insert)t.insert(e);else{var n=r(t.insert||"head");if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(e)}return e}var d,p=(d=[],function(t,e){return d[t]=e,d.filter(Boolean).join("\n")});function u(t,e,a,s){var i=a?"":s.media?"@media ".concat(s.media," {").concat(s.css,"}"):s.css;if(t.styleSheet)t.styleSheet.cssText=p(e,i);else{var r=document.createTextNode(i),n=t.childNodes;n[e]&&t.removeChild(n[e]),n.length?t.insertBefore(r,n[e]):t.appendChild(r)}}function f(t,e,a){var s=a.css,i=a.media,r=a.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}var h=null,m=0;function g(t,e){var a,s,i;if(e.singleton){var r=m++;a=h||(h=c(e)),s=u.bind(null,a,r,!1),i=u.bind(null,a,r,!0)}else a=c(e),s=f.bind(null,a,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(a)};return s(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;s(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=i());var a=l(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var s=0;s<a.length;s++){var i=o(a[s]);n[i].references--}for(var r=l(t,e),c=0;c<a.length;c++){var d=o(a[c]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}a=r}}}},4013:(t,e,a)=>{"use strict";a.d(e,{Z:()=>i});const s={name:"Alert",props:{dismissible:{type:Boolean,default:!0}}};const i=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.$page.props.flash.warning||Object.keys(t.$page.props.errors).length>0?a("div",{class:["alert","alert-error",{"alert-dismissible":t.dismissible}]},[t.dismissible?a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-hidden":"true"}},[t._v("×")]):t._e(),t._v(" "),a("h4",[Object.keys(t.$page.props.errors).length>0?a("i",{staticClass:"fa fa-warning"}):t._e(),t._v(" "),Object.keys(t.$page.props.errors).length>0?a("span",[t._v("There are "+t._s(Object.keys(t.$page.props.errors).length)+" form errors.")]):t._e(),t._v(" "),t.$page.props.flash.warning?a("i",{staticClass:"fa fa-warning"}):t._e(),t._v(" "),t.$page.props.flash.warning?a("span",[t._v(t._s(t.$page.props.flash.warning))]):t._e()]),t._v(" "),a("span",[t._t("default")],2)]):t.$page.props.flash.success?a("div",{class:["alert","alert-success",{"alert-dismissible":t.dismissible}]},[t.dismissible?a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-hidden":"true"}},[t._v("×")]):t._e(),t._v(" "),a("h4",[a("i",{staticClass:"fa fa-check"}),t._v(" "),a("span",[t._v(t._s(t.$page.props.flash.success))])]),t._v(" "),a("span",[t._t("default")],2)]):t._e()}),[],!1,null,null,null).exports},8886:(t,e,a)=>{"use strict";a.d(e,{Z:()=>i});const s={props:{name}};const i=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"content-header"},[a("h1",[t._v(t._s(t.name.toUpperCase()))]),t._v(" "),a("ol",{staticClass:"breadcrumb"},[t._m(0),t._v(" "),a("li",{staticClass:"active"},[t._v(t._s(t.name.toUpperCase()))])])])}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"fa fa-home"}),t._v("Home\n      ")])])}],!1,null,null,null).exports},9741:(t,e,a)=>{"use strict";a.d(e,{Z:()=>i});const s={data:function(){return{year:(new Date).getFullYear()}}};const i=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"main-footer"},[a("strong",[t._v("Copyright © "+t._s(t.year)+"\n  "),a("a",{attrs:{href:"javascript:;"}}),t._v(".")]),t._v(" All rights reserved.\n")])}),[],!1,null,null,null).exports},4054:(t,e,a)=>{"use strict";a.d(e,{Z:()=>i});const s={components:{UserMenu:a(2167).Z}};const i=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",{staticClass:"main-header"},[a("span",{staticClass:"logo-mini"},[a("a",{attrs:{href:"/"}},[a("img",{staticClass:"img-responsive center-block logo",attrs:{src:"/static/img/copilot-logo-white.svg",alt:"Logo"}})])]),t._v(" "),a("nav",{staticClass:"navbar navbar-static-top",attrs:{role:"navigation"}},[a("a",{staticClass:"sidebar-toggle",attrs:{href:"javascript:;","data-toggle":"offcanvas",role:"button"}},[a("span",{staticClass:"sr-only"},[t._v("Toggle navigation")])]),t._v(" "),a("div",{staticClass:"navbar-custom-menu"},[a("ul",{staticClass:"nav navbar-nav"})])])])}],!1,null,null,null).exports},7841:(t,e,a)=>{"use strict";a.d(e,{Z:()=>h});var s=a(9741),i=a(4054),r=a(1079),n=a(809),o=a(2167),l=a(4491);a(9193);const c={components:{DashFooter:s.Z,Header:i.Z,Menu:r.Z,SiderBar:n.Z,UserMenu:o.Z},data:function(){return{classes:{fixed_layout:l.Z.fixedLayout,hide_logo:l.Z.hideLogoOnMobile}}}};var d=a(3379),p=a.n(d),u=a(6542),f={insert:"head",singleton:!1};p()(u.Z,f);u.Z.locals;const h=(0,a(1900).Z)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:["wrapper",t.classes]},[a("Header"),t._v(" "),a("SiderBar"),t._v(" "),a("div",{staticClass:"content-wrapper"},[t._t("default")],2),t._v(" "),a("dash-footer")],1)}),[],!1,null,null,null).exports},1079:(t,e,a)=>{"use strict";a.d(e,{Z:()=>d});var s=a(6454),i=a(9680);const r={components:{Link:s.rU},mounted:function(){i.Inertia.on("navigate",(function(t){$("body").removeClass("sidebar-open"),console.log("Navigated to ".concat(t.detail.page.url))}))}};var n=a(3379),o=a.n(n),l=a(9078),c={insert:"head",singleton:!1};o()(l.Z,c);l.Z.locals;const d=(0,a(1900).Z)(r,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"sidebar-menu"},[a("li",{staticClass:"header"},[t._v("Device Manager")]),t._v(" "),a("li",{staticClass:"pageli",attrs:{tag:"li"}}),a("li",{class:["Devices/Index"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("device.index"),only:["devices"]}},[a("i",{staticClass:"fa fa-tasks"}),t._v(" Devices\n        ")])],1),t._v(" "),a("li",{staticClass:"pageli",attrs:{tag:"li"}}),t.hasAnyPermission(["user-manager"])?a("li",{class:["Application/Index"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("application.index")}},[a("i",{staticClass:"fa fa-th",attrs:{"aria-hidden":"true"}}),t._v(" Applications\n        ")])],1):t._e(),t._v(" "),a("li",{staticClass:"pageli",attrs:{tag:"li"}}),a("li",{class:["Window/Index"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("window-app.index")}},[a("i",{staticClass:"fa fa-windows",attrs:{"aria-hidden":"true"}}),t._v(" WinodwApp\n        ")])],1),t._v(" "),a("li",{staticClass:"pageli",attrs:{tag:"li"}}),t.hasAnyPermission(["user-manager"])?a("li",{class:["Wifi/Index"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("wifi.index")}},[a("i",{staticClass:"fa fa-wifi",attrs:{"aria-hidden":"true"}}),t._v(" Wifi\n        ")])],1):t._e(),t._v(" "),a("li",{staticClass:"pageli",attrs:{tag:"li"}}),a("li",{class:["Group/Index"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("group.index")}},[a("i",{staticClass:"fa fa-folder-o",attrs:{"aria-hidden":"true"}}),t._v(" Groups\n        ")])],1),t._v(" "),t.hasAnyPermission(["user-manager"])?a("li",{class:["APK/Index"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("apk.index")}},[a("i",{staticClass:"fa fa-file-archive-o",attrs:{"aria-hidden":"true"}}),t._v(" Installing \n        ")])],1):t._e(),t._v(" "),a("li",{staticClass:"header"}),t._v(" "),a("li",{class:["topup"===t.$page.component?"active":""],attrs:{tag:"li"}},[a("Link",{attrs:{href:t.route("topup.index")}},[a("i",{staticClass:"fa fa-shopping-cart",attrs:{"aria-hidden":"true"}}),t._v(" "),a("span",{staticClass:"page"},[t._v("Top Up")])])],1),t._v(" "),a("li",{class:["payment"===t.$page.component?"active":""],attrs:{tag:"li"}},[a("Link",{attrs:{href:t.route("payment.index")}},[a("i",{staticClass:"fa fa-shopping-cart",attrs:{"aria-hidden":"true"}}),t._v(" "),a("span",{staticClass:"page"},[t._v("Bill")])])],1),t._v(" "),t.hasAnyPermission(["user-manager"])?a("li",{staticClass:"header"},[t._v("User managerment")]):t._e(),t._v(" "),t.hasAnyPermission(["user-manager"])?a("li",{staticClass:"treeview"},[t._m(0),t._v(" "),a("ul",{staticClass:"treeview-menu"},[a("li",{class:["Admin/Permission"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("permissions.index")}},[a("i",{staticClass:"fa fa-shield"}),t._v(" Permissions\n        ")])],1),t._v(" "),a("li",{class:["Admin/Roles"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("roles.index")}},[a("i",{staticClass:"fa fa-check-circle"}),t._v(" Roles\n        ")])],1),t._v(" "),a("li",{class:["Admin/User"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("users.index")}},[a("i",{staticClass:"fa fa-users"}),t._v(" Users\n        ")])],1)])]):t._e(),t._v(" "),t.hasAnyPermission(["user-manager"])?a("li",{staticClass:"header"},[t._v("Admin managerment")]):t._e(),t._v(" "),t.hasAnyPermission(["user-manager"])?a("li",{staticClass:"treeview"},[t._m(1),t._v(" "),a("ul",{staticClass:"treeview-menu"},[a("li",{class:["Package/Index"===t.$page.component?"active":""]},[a("Link",{attrs:{href:t.route("package.index")}},[a("i",{staticClass:"fa fa-product-hunt",attrs:{"aria-hidden":"true"}}),t._v(" Package License\n        ")])],1)])]):t._e(),t._v(" "),a("li",{staticClass:"header"},[t._v("Logout")]),t._v(" "),a("li",{staticClass:"pageli",attrs:{tag:"li"}},[a("Link",{attrs:{href:t.route("logout"),method:"post"}},[a("i",{staticClass:"fa fa-sign-out text-yellow"}),t._v(" "),a("span",{staticClass:"page"},[t._v("Logout")])])],1)])}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{attrs:{href:"#"}},[a("i",{staticClass:"fa fa-list"}),t._v(" "),a("span",{staticClass:"treeview-title"},[t._v("User managerment")]),t._v(" "),a("span",{staticClass:"pull-right-container pull-right"},[a("i",{staticClass:"fa fa-angle-left fa-fw"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{attrs:{href:"#"}},[a("i",{staticClass:"fa fa-list"}),t._v(" "),a("span",{staticClass:"treeview-title"},[t._v("Admin managerment")]),t._v(" "),a("span",{staticClass:"pull-right-container pull-right"},[a("i",{staticClass:"fa fa-angle-left fa-fw"})])])}],!1,null,null,null).exports},809:(t,e,a)=>{"use strict";a.d(e,{Z:()=>l});const s={components:{Menu:a(1079).Z},mounted:function(){$('[data-toggle="hideseek"]').off().hideseek()}};var i=a(3379),r=a.n(i),n=a(6581),o={insert:"head",singleton:!1};r()(n.Z,o);n.Z.locals;const l=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("aside",{staticClass:"main-sidebar"},[a("section",{staticClass:"sidebar"},[a("div",{staticClass:"user-panel"},[a("div",{staticClass:"pull-left image"},[t.$page.props.auth.user?a("img",{attrs:{src:t.$page.props.auth.user.avatar}}):t._e()]),t._v(" "),a("div",{staticClass:"pull-left info"},[a("div",[t.$page.props.auth.user?a("p",{staticClass:"white"},[t._v(t._s(t.$page.props.auth.user.name))]):t._e()]),t._v(" "),t._m(0)])]),t._v(" "),a("form",{staticClass:"sidebar-form",attrs:{id:"searchForm"},on:{submit:function(t){t.preventDefault()}}},[t._m(1)]),t._v(" "),a("Menu")],1)])}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{attrs:{href:"javascript:;"}},[a("i",{staticClass:"fa fa-circle text-success"}),t._v(" Online\n        ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"input-group",attrs:{id:"searchContainer"}},[a("span",{staticClass:"input-group-btn"},[a("input",{staticClass:"search form-control",attrs:{type:"text",name:"search",id:"search","data-toggle":"hideseek",p:"",laceholder:"Search Menus","data-list":".sidebar-menu"}}),t._v(" "),a("button",{staticClass:"btn btn-flat",attrs:{type:"submit",name:"search",id:"search-btn"}},[a("i",{staticClass:"fa fa-search"})])])])}],!1,null,null,null).exports},2167:(t,e,a)=>{"use strict";a.d(e,{Z:()=>i});const s={components:{Link:a(6454).rU},methods:{logout:function(){this.$inertia.post(route("logout"))}}};const i=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"dropdown user user-menu"},[a("a",{staticClass:"dropdown-toggle",attrs:{href:"javascript:;","data-toggle":"dropdown"}},[a("img",{staticClass:"user-image",attrs:{src:t.$page.props.auth.user.avatar,alt:"User Image"}}),t._v(" "),a("span",{staticClass:"hidden-xs"},[t._v(t._s(t.$page.props.auth.user.name))])]),t._v(" "),a("ul",{staticClass:"dropdown-menu"},[a("li",{staticClass:"user-header",staticStyle:{height:"auto","min-height":"85px","padding-bottom":"15px"}},[a("p",[a("span",[t._v(t._s(t.$page.props.auth.user.name))]),t._v(" "),t._l(t.$page.props.auth.user.roles,(function(e){return a("small",{key:e},[t._v(t._s(e))])}))],2)]),t._v(" "),a("li",{staticClass:"user-footer"},[a("a",{staticClass:"btn btn-default btn-flat btn-block",on:{click:function(e){return t.logout()}}},[t._v("Logout")])])])])}),[],!1,null,null,null).exports},9306:(t,e,a)=>{"use strict";a.d(e,{Z:()=>i});const s={components:{Link:a(6454).rU},props:{links:Array}};const i=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.links.length>3?a("div",{staticClass:"mt-8"},[a("div",{staticClass:"flex flex-wrap -mb-1"},t._l(t.links,(function(e,s){return a("div",{key:s},[null===e.url?a("div",{staticClass:"mr-1 mb-1 px-6 py-3 text-xl leading-4 text-gray-400 border rounded",domProps:{innerHTML:t._s(e.label)}}):a("Link",{staticClass:"mr-1 mb-1 px-6 py-3 text-xl leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500",class:{"bg-blue-700 text-white":e.active},attrs:{href:e.url},domProps:{innerHTML:t._s(e.label)}})],1)})),0)]):t._e()}),[],!1,null,null,null).exports},7090:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>f});var s=a(6454),i=a(7841),r=a(8886),n=a(9306),o=a(4013);const l={layout:i.Z,components:{Link:s.rU,ContentHeaderVue:r.Z,Pagination:n.Z,Alert:o.Z},props:{window_apps:Object,errors:Object},data:function(){return{ssid:null,editMode:!1,image:null,form:this.$inertia.form({id:null,name:null,path:null,version:null,icon:null,packageName:null})}},methods:{save:function(){var t=this;this.editMode?this.form.post(route("window-app.update",this.form.id),{preserveState:!0,onError:function(e){Object.keys(e).length>0&&(t.editMode=!0)},onSuccess:function(e){$("#exampleModal").modal("hide"),t.reset()}}):this.form.post(route("window-app.store"),{preserveState:!0,onError:function(e){Object.keys(e).length>0&&(t.editMode=!1)},onSuccess:function(e){$("#exampleModal").modal("hide"),t.reset()}})},clickModal:function(){this.editMode=!1,this.form.reset()},edit:function(t){this.editMode=!0,this.form.id=t.id,this.form.name=t.name,this.form.packageName=t.packageName,this.form.version=t.version,this.form.path=t.path},reset:function(){this.form=this.$inertia.form({id:null,name:null,path:null,icon:null,version:null,packageName:null})},Delete:function(t){confirm("Are you sure want to remove?")&&this.$inertia.delete(route("window-app.delete",t))},onChangeFile:function(t){var e=t.target.files[0];this.image=e?URL.createObjectURL(e):null}}};var c=a(3379),d=a.n(c),p=a(5549),u={insert:"head",singleton:!1};d()(p.Z,u);p.Z.locals;const f=(0,a(1900).Z)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"content"},[a("ContentHeaderVue",{attrs:{name:"Window App"}}),t._v(" "),a("alert",{attrs:{dismissible:!0}}),t._v(" "),a("button",{staticClass:"inline-block px-8 py-4 bg-blue-600 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",attrs:{type:"button","data-toggle":"modal","data-target":"#exampleModal"},on:{click:function(e){return t.clickModal()}}},[t._v("Save App")]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"exampleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),a("div",{staticClass:"modal-body"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.save.apply(null,arguments)}}},[t.form.progress?a("div",{staticClass:"w-1/4 bg-gray-200 rounded-full dark:bg-gray-700 mb-8 ml-3"},[a("div",{staticClass:"bg-blue-600 text-xl font-medium text-blue-100 text-center p-0.5 leading-none rounded-full",style:{width:t.form.progress.percentage+"%"}},[t._v(t._s(t.form.progress.percentage)+"%")])]):t._e(),t._v(" "),a("div",{staticClass:"form-group",class:t.errors.name?"is-valid":""},[a("label",{staticClass:"col-form-label",attrs:{for:"recipient-name"}},[t._v("Name:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],staticClass:"form-control text-xl",class:t.errors.name?"is-valid":"",attrs:{type:"text",id:"recipient-name"},domProps:{value:t.form.name},on:{input:function(e){e.target.composing||t.$set(t.form,"name",e.target.value)}}}),t._v(" "),t.errors.name?a("div",{staticClass:"text-red-500"},[t._v(t._s(t.errors.name))]):t._e()]),t._v(" "),a("div",{staticClass:"form-group",class:t.errors.path?"is-valid":""},[a("label",{staticClass:"col-form-label",attrs:{for:"recipient-name"}},[t._v("Path to .exe file :")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.path,expression:"form.path"}],staticClass:"form-control text-xl",class:t.errors.path?"is-valid":"",attrs:{type:"text",id:"recipient-name"},domProps:{value:t.form.path},on:{input:function(e){e.target.composing||t.$set(t.form,"path",e.target.value)}}}),t._v(" "),t.errors.path?a("div",{staticClass:"text-red-500"},[t._v(t._s(t.errors.path))]):t._e()]),t._v(" "),a("div",{staticClass:"form-group",class:t.errors.packageName?"is-valid":""},[a("label",{staticClass:"col-form-label",attrs:{for:"recipient-name"}},[t._v("Package Name:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.packageName,expression:"form.packageName"}],staticClass:"form-control text-xl",class:t.errors.packageName?"is-valid":"",attrs:{type:"text",id:"recipient-name",placeholder:"com.holomia.holomia"},domProps:{value:t.form.packageName},on:{input:function(e){e.target.composing||t.$set(t.form,"packageName",e.target.value)}}}),t._v(" "),t.errors.packageName?a("div",{staticClass:"text-red-500"},[t._v(t._s(t.errors.packageName))]):t._e()]),t._v(" "),a("div",{staticClass:"form-group",class:t.errors.version?"is-valid":""},[a("label",{staticClass:"col-form-label",attrs:{for:"recipient-name"}},[t._v("version:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.version,expression:"form.version"}],staticClass:"form-control text-xl",class:t.errors.version?"is-valid":"",attrs:{type:"text",id:"recipient-name"},domProps:{value:t.form.version},on:{input:function(e){e.target.composing||t.$set(t.form,"version",e.target.value)}}}),t._v(" "),t.errors.version?a("div",{staticClass:"text-red-500"},[t._v(t._s(t.errors.version))]):t._e()]),t._v(" "),a("div",{staticClass:"form-group",class:t.errors.path?"is-valid":""},[a("label",{staticClass:"col-form-label",attrs:{for:"recipient-name"}},[t._v("\n                Upload\n                icon app\n              ")]),t._v(" "),a("div",{staticClass:"flex items-center justify-center w-full"},[a("label",{staticClass:"flex flex-col w-full h-48 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"},[a("div",{staticClass:"flex flex-col items-center justify-center pt-7"},[a("i",{staticClass:"fa fa-file-o w-12 h-15",attrs:{"aria-hidden":"true"}}),t._v(" "),a("p",{staticClass:"pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"},[t._v("Drag file .jpg .jepg .png")]),t._v(" "),a("img",{attrs:{src:t.image,width:"50px"}}),t._v(" "),a("input",{staticClass:"opacity-0",class:t.errors.icon?"border-red-500":"",attrs:{type:"file",accept:"image/*"},on:{input:function(e){t.form.icon=e.target.files[0]},change:t.onChangeFile}})])]),t._v(" "),t.errors.icon?a("div",{staticClass:"text-red-500"},[t._v(t._s(t.errors.icon))]):t._e()])]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Cancel")]),t._v(" "),a("button",{staticClass:"inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.save()}}},[t._v("Upload")])])])])])])]),t._v(" "),a("div",{staticClass:"overflow-x-auto relative shadow-md sm:rounded-lg mt-5"},[a("table",{staticClass:"w-full text-xl text-left text-gray-500 dark:text-gray-400"},[a("thead",{staticClass:"text-xl text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"},[a("tr",[a("th",{staticClass:"py-3 px-6 text-xl",attrs:{scope:"col"}},[t._v("No")]),t._v(" "),a("th",{staticClass:"py-3 px-6 text-xl uppercase",attrs:{scope:"col"}},[t._v("name")]),t._v(" "),a("th",{staticClass:"py-3 px-6 text-xl uppercase",attrs:{scope:"col"}},[t._v("Path")]),t._v(" "),a("th",{staticClass:"py-3 px-6 text-xl uppercase",attrs:{scope:"col"}},[t._v("Icon")]),t._v(" "),a("th",{staticClass:"py-3 px-6 text-xl uppercase",attrs:{scope:"col"}},[t._v("PackageName")]),t._v(" "),a("th",{staticClass:"py-3 px-6 text-xl uppercase",attrs:{scope:"col"}},[t._v("Version")]),t._v(" "),t.hasAnyPermission(["user-manager"])?a("th",{staticClass:"py-3 px-6 text-xl uppercase",attrs:{scope:"col"}},[t._v("User")]):t._e(),t._v(" "),t._m(1)])]),t._v(" "),a("tbody",t._l(t.window_apps.data,(function(e,s){return a("tr",{key:s,staticClass:"bg-white border-b dark:bg-gray-800 dark:border-gray-700"},[a("th",{staticClass:"py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white",attrs:{scope:"row"}},[t._v("\n            "+t._s(s+1)+"\n          ")]),t._v(" "),a("th",{staticClass:"py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white",attrs:{apk:"row"}},[t._v(t._s(e.name))]),t._v(" "),a("th",{staticClass:"py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white",attrs:{apk:"row"}},[t._v(t._s(e.path))]),t._v(" "),a("th",{staticClass:"py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white",attrs:{scope:"row"}},[a("img",{attrs:{src:e.icon,width:"50px"}})]),t._v(" "),a("th",{staticClass:"py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white",attrs:{apk:"row"}},[t._v(t._s(e.packageName))]),t._v(" "),a("th",{staticClass:"py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white",attrs:{apk:"row"}},[t._v(t._s(e.version))]),t._v(" "),t.hasAnyPermission(["user-manager"])?a("th",{staticClass:"py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white",attrs:{scope:"row"}},[e.user?a("Link",{attrs:{href:t.route("user.detail.devices",e.user.id)}},[t._v("\n              "+t._s(e.user?e.user.name:null)+"\n            ")]):t._e()],1):t._e(),t._v(" "),a("td",{staticClass:"py-4 px-6 text-right"},[a("button",{staticClass:"inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",attrs:{type:"button","data-toggle":"modal","data-target":"#exampleModal"},on:{click:function(a){return t.edit(e)}}},[t._v("\n              Edit\n              Name\n            ")]),t._v(" "),a("button",{staticClass:"inline-block px-6 py-2.5 bg-gray-800 text-white font-black text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out",attrs:{type:"button"},on:{click:function(a){return t.Delete(e.id)}}},[t._v("Delete")])])])})),0)])]),t._v(" "),a("pagination",{attrs:{links:t.window_apps.links}})],1)}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("th",{staticClass:"py-3 px-6 text-xl uppercase",attrs:{scope:"col"}},[a("span",{staticClass:"sr-only"},[t._v("Edit")])])}],!1,null,null,null).exports},1900:(t,e,a)=>{"use strict";function s(t,e,a,s,i,r,n,o){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=a,c._compiled=!0),s&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),n?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},c._ssrRegister=l):i&&(l=o?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(c.functional){c._injectStyles=l;var d=c.render;c.render=function(t,e){return l.call(e),d(t,e)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,l):[l]}return{exports:t,options:c}}a.d(e,{Z:()=>s})}}]);