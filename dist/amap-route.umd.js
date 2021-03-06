(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('uuid')) :
  typeof define === 'function' && define.amd ? define(['exports', 'uuid'], factory) :
  (global = global || self, factory(global.AmapRoute = {}, global.uuid));
}(this, (function (exports, uuid) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name:'log',
    props:{
      className:String,
      loadPoint:Array,
      unloadPoint:Array,
      loadRule:Function,
      unloadRule:Function,
      amap:Object,
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "log" }, [
      _c("div", [_vm._v("className:" + _vm._s(_vm.className))]),
      _vm._v(" "),
      _c("div", [_vm._v("logPoint:" + _vm._s(_vm.logPoint))]),
      _vm._v(" "),
      _c("div", [_vm._v("unloadPoint:" + _vm._s(_vm.unloadPoint))]),
      _vm._v(" "),
      _c("div", [_vm._v("loadRule:" + _vm._s(_vm.loadRule))]),
      _vm._v(" "),
      _c("div", [_vm._v("unloadRule:" + _vm._s(_vm.unloadRule))]),
      _vm._v(" "),
      _c("div", [_vm._v("amap:" + _vm._s(_vm.amap))])
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-3b1db39e_0", { source: "\ndiv.log[data-v-3b1db39e] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n", map: {"version":3,"sources":["/media/liuhanru/mywork/practice/contribute/amap-route/src/components/log.vue"],"names":[],"mappings":";AA0BA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;AACA","file":"log.vue","sourcesContent":["<template>\n<div class=\"log\">\n  <div>className:{{className}}</div>\n  <div>logPoint:{{logPoint}}</div>\n  <div>unloadPoint:{{unloadPoint}}</div>\n  <div>loadRule:{{loadRule}}</div>\n  <div>unloadRule:{{unloadRule}}</div>\n  <div>amap:{{amap}}</div>\n</div>\n</template>\n\n<script>\nexport default {\n  name:'log',\n  props:{\n    className:String,\n    loadPoint:Array,\n    unloadPoint:Array,\n    loadRule:Function,\n    unloadRule:Function,\n    amap:Object,\n  },\n}\n</script>\n\n<style scoped>\ndiv.log {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-3b1db39e";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  var loadPointMarker = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"56px\" height=\"56px\" viewBox=\"0 0 56 56\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n  <title>?????? 10</title>\n  <g id=\"2020.04.03--????????????\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n    <g id=\"A4-1--2-????????????-????????????\" transform=\"translate(-747.000000, -654.000000)\">\n      <g id=\"??????-10\" transform=\"translate(747.000000, 654.000000)\">\n        <path d=\"M3.02083333,25.0568182 C1.36397908,25.0568182 0.0208333333,23.7136724 0.0208333333,22.0568182 L0.0208333333,3 C0.0208333333,1.34314575 1.36397908,-1.53269159e-12 3.02083333,-1.53299595e-12 L52.1458333,-1.53299595e-12 C53.8026876,-1.52888557e-12 55.1458333,1.34314575 55.1458333,3 L55.1458333,22.0568182 C55.1458333,23.7136724 53.8026876,25.0568182 52.1458333,25.0568182 L32.5265152,25.0568182 L27.5833333,30 L22.6401515,25.0568182 L3.02083333,25.0568182 Z\" id=\"????????????\" fill=\"#37A800\"></path>\n        <text id=\"?????????\" font-family=\"PingFang-SC-Heavy, PingFang SC\" font-size=\"14\" font-weight=\"600\" line-spacing=\"13\" letter-spacing=\"-1.07692308\" fill=\"#FFFFFF\">\n          <tspan x=\"8.08333333\" y=\"16.5284091\">?????????</tspan>\n        </text>\n      </g>\n    </g>\n  </g>\n  <g id=\"2020.04.03--????????????\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n    <g id=\"A4-1--2-????????????-????????????\" transform=\"translate(-764.000000, -689.000000)\" fill-rule=\"nonzero\">\n      <g id=\"??????-15\" transform=\"translate(764.000000, 689.000000)\">\n        <circle id=\"?????????\" fill=\"#BBE8A7\" cx=\"28\" cy=\"45\" r=\"11\"></circle>\n        <circle id=\"?????????\" fill=\"#37A800\" cx=\"28\" cy=\"45\" r=\"6\"></circle>\n      </g>\n    </g>\n  </g>\n</svg>";

  var unloadPointMarker = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"56px\" height=\"56px\" viewBox=\"0 0 56 56\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n  <title>?????? 10</title>\n  <g id=\"2020.04.03--????????????\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n    <g id=\"A4-1--2-????????????-????????????\" transform=\"translate(-331.000000, -1026.000000)\">\n      <g id=\"??????-10\" transform=\"translate(331.476117, 1026.748301)\">\n        <path d=\"M3.02083333,25.0568182 C1.36397908,25.0568182 0.0208333333,23.7136724 0.0208333333,22.0568182 L0.0208333333,3 C0.0208333333,1.34314575 1.36397908,-1.53269159e-12 3.02083333,-1.53299595e-12 L52.1458333,-1.53299595e-12 C53.8026876,-1.53330031e-12 55.1458333,1.34314575 55.1458333,3 L55.1458333,22.0568182 C55.1458333,23.7136724 53.8026876,25.0568182 52.1458333,25.0568182 L32.5265152,25.0568182 L27.5833333,30 L22.6401515,25.0568182 L3.02083333,25.0568182 Z\" id=\"????????????\" fill=\"#E02020\"></path>\n        <text id=\"?????????\" font-family=\"PingFang-SC-Heavy, PingFang SC\" font-size=\"14\" font-weight=\"600\" line-spacing=\"13\" letter-spacing=\"-1.07692308\" fill=\"#FFFFFF\">\n          <tspan x=\"8.08333333\" y=\"16.5284091\">?????????</tspan>\n        </text>\n      </g>\n    </g>\n  </g>\n  <g id=\"2020.04.03--????????????\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n    <g id=\"A4-1--2-????????????-????????????\" transform=\"translate(-348.000000, -1060.000000)\" fill-rule=\"nonzero\">\n      <g id=\"??????-40\" transform=\"translate(348.000000, 1060.000000)\">\n        <circle id=\"22\" fill=\"#FFA6A6\" cx=\"28\" cy=\"45\" r=\"11\"></circle>\n        <circle id=\"???????????????-12\" fill=\"#E02020\" cx=\"28\" cy=\"45\" r=\"6\"></circle>\n      </g>\n    </g>\n  </g>\n</svg>";

  //

  var tian_an_men = [116.397423,39.909117];
  var pointRule = function (distance, circleOption, marker) {
    if ( distance === void 0 ) distance=0;

    if(distance <= 10e3) {
      return [marker, Object.assign({type:'circle', radius:3000}, circleOption)];
    } else if (distance <= 30e3) {
      return [marker, Object.assign({type:'circle', radius:4000}, circleOption)];
    } else if (distance < 100e3) {
      return [
        marker,
        Object.assign({ type:'district' }, circleOption, {fillOpacity:0.4}),
        Object.assign({ type:'circle', radius:5000 }, circleOption)
      ];
    } else {
      return [
        marker,
        Object.assign({ type:'district' }, circleOption, {fillOpacity:0.4}),
        Object.assign({ type:'circle', radius:10000 }, circleOption)
      ];
    }  
  };
  var defaultLoadRule = function (distance){
    if ( distance === void 0 ) distance=0;

    var circleOption={
      fillColor: "#37A80040",
      strokeColor: "#37A80080",
      fillOpacity: 0.5, //???????????????
      strokeOpacity: 0.5 //????????????
    };
    // console.log('loadPointMarker', loadPointMarker);
    var marker = {
      image: URL.createObjectURL(new Blob([loadPointMarker], {type:'image/svg+xml'})),
      size:[56, 56],
      offset:[-28, -45],
      type:'marker',
    };
    return pointRule(distance, circleOption, marker);
  };
  var defaultUnloadRule = function (distance) {
    if ( distance === void 0 ) distance=0;

    var circleOption={
      fillColor: "#E0202040",
      strokeColor: "#E0202080",
      fillOpacity: 0.5, //???????????????
      strokeOpacity: 0.5 //????????????
    };
    // console.log('unloadPointMarker', unloadPointMarker);
    var marker = {
      image: URL.createObjectURL(new Blob([unloadPointMarker], {type:'image/svg+xml'})),
      size:[56, 56],
      offset:[-28, -45],
      type:'marker',
    };
    return pointRule(distance, circleOption, marker);
  };
  var prepareMap = function (vue) {
    if(!vue.amapResolve) { return Promise.reject('null amap'); }
    if(!vue.containerResolve) {
      vue.containerResolve = vue.amapResolve.then(function (amap) {
        var amapContainer = new amap.Map(vue.amapId, {
          center: tian_an_men,
          zoom:11,
        });
        return new Promise(function (resolve, reject) {
          amapContainer.on("complete", function (){
            resolve(amapContainer);
          });
        });
      });
    }  return Promise.resolve('ok');
  };
  var codeMap = {
    district:"adcode",
  };
  var districtMap = {};
  var getKeyOfPoint = function (point){
    var key = (point[0].toFixed(4)) + "/" + (point[1].toFixed(4));
    return key;  
  };
  var drawDistrict = function (amap, container, point, options) {
    if ( options === void 0 ) options={};

    var key = getKeyOfPoint(point);
    return new Promise(function (resolve, reject) {
      new amap.Geocoder().getAddress(new (Function.prototype.bind.apply( amap.LngLat, [ null ].concat( point) )), function (status, result) {
        var isSuccess = status == 'complete' && result.info== 'OK';
        if (!isSuccess) { return reject('unknown district,' + point); }
        var code = result.regeocode.addressComponent[codeMap[options.type]];
        new amap.DistrictSearch({
          level:options.type, extensions:'all', subdistrict:0,
        }).search(code, function (status, result){
          if(status!='complete') { return Promise.reject('unknown district,'+code); }
          var districtResult = result.districtList[0];
          if(!districtResult) { return Promise.reject('unknown district,'+result); }
          var bounds = districtResult.boundaries;
          if(districtMap[key]){
            container.remove(districtMap[key]);
          }
          var districtOption = Object.assign({}, options, {
            type:undefined,
            map:container,
            path: bounds,
          });
          var polygon = new amap.Polygon(districtOption);
          districtMap[key] = polygon;
          // console.log("boundPoints", boundPoints, bounds);
          resolve(polygon);
        });
      });
    });
  };
  var circleMap = {};
  var drawCircle = function (amap, container, point, options) {
    if ( options === void 0 ) options={};

    var key = getKeyOfPoint(point);
    if(circleMap[key]) {
      container.remove(circleMap[key]);
    }  var circleOption = Object.assign({}, options, {
      type:undefined,
      center:point.slice(),
    });
    var circle = new amap.Circle(circleOption);
    circleMap[key] = circle;
    container.add(circle);
    return Promise.resolve(circle);
  };

  var markerMap = {};
  var drawMarker = function (amap, container, point, options) {
    if ( options === void 0 ) options={};

    var key = getKeyOfPoint(point);
    if(markerMap[key]) {
      container.remove(markerMap[key]);
    }  var ref = options.size;
    var w = ref[0];
    var h = ref[1];
    var pointIcon = new amap.Icon({
      image: options.image, size: new amap.Size(w, h), imageSize:new amap.Size(w, h),
    });
    var ref$1 = options.offset;
    var xo = ref$1[0];
    var yo = ref$1[1];
    var pointMarker = new amap.Marker({
      position: point.slice(),
      offset: new amap.Pixel(xo, yo),
      icon:pointIcon,
      autoRotation:true, 
      angle:0, extData:key,
    });
    markerMap[key] = pointMarker;
    container.add(pointMarker);
    return pointMarker;
  };
  var drawPoint = function (amap, container, point, pointRule, distance) {
    var drawTask = pointRule(distance).map(function (ruleOptions) {
      switch(ruleOptions.type) {
        case "province":
        case "city":
        case "district":
          return drawDistrict(amap, container, point, ruleOptions);
        case "circle":
          return drawCircle(amap, container, point, ruleOptions);
        case 'marker':
          return drawMarker(amap, container, point, ruleOptions);
        default:
          return [point, point];
      }
    }) || [[point, point]];
    return Promise.all(drawTask);
  };

  var zoomMap = function (amap, container, avoid) {
    if ( avoid === void 0 ) avoid=[20, 20, 20, 20];

    container.setFitView(null, true, avoid, 18);
  };

  var renderTheRoute = function (vue) {
    return prepareMap(vue).then(function (ok) {
      return Promise.all([vue.amapResolve, vue.containerResolve]);
    }).then(function (ref) {
      var amap = ref[0];
      var container = ref[1];

      var loadPoint = vue.loadPoint || vue.unloadPoint || tian_an_men;
      var unloadPoint = vue.unloadPoint || vue.loadPoint || tian_an_men;
      var distance = amap.GeometryUtil.distance([].concat( loadPoint ), [].concat( unloadPoint ));
      var drawLoad =vue.loadPoint && drawPoint(amap, container, [].concat( vue.loadPoint ), vue.loadRule || defaultLoadRule, distance) || [loadPoint, loadPoint];
      var drawUnload = vue.unloadPoint && drawPoint(amap, container, [].concat( vue.unloadPoint ), vue.unloadRule || defaultUnloadRule, distance) || [unloadPoint, unloadPoint];
      return Promise.all([amap, container, drawLoad, drawUnload]);
    }).then(function (ref){
      var amap = ref[0];
      var container = ref[1];

      return zoomMap(amap, container, vue.avoid);
    });
  };
  var script$1 = {
    name:'AmapRoute',
    components:{
      log: __vue_component__,
    },
    props:{
      className:String,
      loadPoint:Array,
      unloadPoint:Array,
      loadRule:Function,
      unloadRule:Function,
      amap:null,
      avoid:{
        type:Array, default: function default$1(){return [20, 20, 20, 20]; },
      }
    },
    data: function data(){
      // const vue = this;
      var amapId = uuid.v4();
      return {
        amapResolve:null,
        amapId:amapId,
        containerResolve:null,
      };
    },
    mounted: function mounted(){
      var vue = this;
      if(!vue.amap) { return; }
      if(!vue.amapResolve) {
        vue.amapResolve = Promise.resolve(vue.amap);
      }
      vue.drawRoute();
    },
    updated: function updated(){
      var vue = this;
      if(!vue.amap) { return; }
      if(!vue.amapResolve) {
        vue.amapResolve = Promise.resolve(vue.amap);
      }
      vue.drawRoute();
    },
    methods: {
      drawRoute: function drawRoute() {
        var vue = this;
        renderTheRoute(vue).then(function (ok) {
          vue.$emit('drawRoute', ok);
        }).catch(function (err){
          console.log(err);
        });
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: _vm.className, attrs: { id: _vm.amapId } },
      [
         _vm._e()
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  function install(Vue) {
    if(install.installed) { return; }
    install.installed = true;
    Vue.component('AmapRoute', __vue_component__$1);
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

  exports.default = __vue_component__$1;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
