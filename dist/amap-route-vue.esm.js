import { openBlock, createBlock, createVNode } from 'vue';

var script = {
  name:'AmapRoute',
};

var _hoisted_1 = /*#__PURE__*/createVNode("span", null, "这是组件", -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", null, [
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

export default script;
export { install };
