(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AmapRoute = {}, global.vue));
}(this, (function (exports, vue) { 'use strict';

  var script = {
    name:'AmapRoute',
  };

  var _hoisted_1 = /*#__PURE__*/vue.createVNode("span", null, "这是组件", -1 /* HOISTED */);

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", null, [
      _hoisted_1
    ]))
  }

  script.render = render;
  script.__file = "src/amap-route.vue";

  function install(Vue) {
    if(install.installed) { return; }
    install.installed = true;
    Vue.component('AmapRoute', script);
  }

  var plugin = {
    install: install,
  };

  var GlobalVue = null;

  if (typeof window!= 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global != 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = script;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
