# 高德地图路线预览 #
  * 没啥稀奇的，不过是给两个项目用，单独提取处理。
  * 这是一个vue的项目
  
# 简单用法 #

## npm ##
  * npm i amap-route
  * somepage.vue 
    * template: 
    ```
    <amap-route :amap="amap" :loadPoint="loadPoint" unloadPoint="unloadPoint"/>
    ```
    * script: import AmapRoute from 'amap-route'
    * vue components: AmapRoute

## yarn ##
  * yarn add amap-route
  * somepage.vue 
    * template: 
    ```
    <amap-route :amap="amap" :loadPoint="loadPoint" unloadPoint="unloadPoint"/>
    ```
    * script: import AmapRoute from 'amap-route'
    * vue components: AmapRoute

## 也没有复杂用法 ##

# 外部参数 #
  * className:'',
  * loadPoint:[lng, lat]
  * unloadPoint:[lng, lat]
  * loadRule:
  
  ```
  (distance) => { // distance单位米
    return [{
      type:'province',// 'city', 'district', 
      strokeColor:'',
      strokeWeight:'',
      fillOpacity:0.4,
      fillColor:'',
    }, {
      type:'circle',
      strokeColor:'',
      strokeWeight:'',
      fillOpacity:0.4,
      fillColor:'',
      circleRange:10,
    }, {
      type:'marker',
      image:'url', // URL.createObjectURL()
      size:[56,56],
      offset:[-28,-45],
    }]
  } || defaultLoadRule
  ```
  
  * unloadRule:
  
  ```
  (distance) => { // distance单位米
    return [{
      type:'province',// 'city', 'district', 
      strokeColor:'',
      strokeWeight:'',
      fillOpacity:0.4,
      fillColor:'',
    }, {
      type:'circle',
      strokeColor:'',
      strokeWeight:'',
      fillOpacity:0.4,
      fillColor:'',
      circleRange:10,
    }, {
      type:'marker',
      image:'url', // URL.createObjectURL()
      size:[56,56],
      offset:[-28,-45],
    }]
  } || defaultUnloadRule
  ```
  
  * amap 需要插件 AMap.DistrictSearch,AMap.Geolocation,AMap.Geocoder

# 内部参数 #
  * defaultLoadRule
  
  ```
    (distance) => {
      const circleOption={
        fillColor: "#E0202040",
        strokeColor: "#E0202080",
        fillOpacity: 0.5, //填充透明度
        strokeOpacity: 0.5 //线透明度
      };
      const marker = {
        image: URL.createObjectURL(new Blob([loadPointMarker], {type:'image/svg+xml'})),
        size:[56, 56],
        offset:[-28, -45],
        type:'marker',
      };
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
      };
    }
  ```
  
  * defaultUnloadRule:
  
  ```
    (distance) => {
      const circleOption={
        fillColor: "#E0202040",
        strokeColor: "#E0202080",
        fillOpacity: 0.5, //填充透明度
        strokeOpacity: 0.5 //线透明度
      };
      const marker = {
        image: URL.createObjectURL(new Blob([unloadPointMarker], {type:'image/svg+xml'})),
        size:[56, 56],
        offset:[-28, -45],
        type:'marker',
      };
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
      };
    }
  ```
  
