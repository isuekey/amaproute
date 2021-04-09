<template>
  <div :class="className" :id="amapId">
    <log v-if="false" 
      :className="className" :loadPoint="loadPoint" :unloadPoint="unloadPoint"
      :loadRule="loadRule" :unloadRule="unloadRule" :amap="amap"
      />
  </div>
</template>

<script>
import log from './components/log.vue';
import {v4 as uuidv4} from 'uuid';

const tian_an_men = [116.397423,39.909117];
const defaultLoadRule = (distance=0)=>{
  return [{
    type:'district'
  }];
};
const defaultUnloadRule = (distance=0) => {
  return [{
    type:'district'
  }];
};
const prepareMap = (vue) => {
  if(!vue.amapResolve) return Promise.reject('null amap');
  if(!vue.containerResolve) {
    vue.containerResolve = vue.amapResolve.then(amap => {
      const amapContainer = new amap.Map(vue.amapId, {
        center: tian_an_men,
        zoom:11,
      });
      return new Promise((resolve, reject) => {
        amapContainer.on("complete", ()=>{
          resolve(amapContainer);
        });
      });
    });
  };
  return Promise.resolve('ok');
};
const codeMap = {
  district:"adcode",
};
const districtMap = {};
const getKeyOfPoint = (point)=>{
  const key = `${point[0].toFixed(4)}/${point[1].toFixed(4)}`;
  return key;  
};
const drawDistrict = (amap, container, point, options={}) => {
  const key = getKeyOfPoint(point);
  return new Promise((resolve, reject) => {
    new amap.Geocoder().getAddress(new amap.LngLat(...point), (status, result) => {
      const isSuccess = status == 'complete' && result.info== 'OK';
      if (!isSuccess) return reject('unknown district,' + point);
      let code = result.regeocode.addressComponent[codeMap[options.type]];
      new amap.DistrictSearch({
        level:options.type, extensions:'all', subdistrict:0,
      }).search(code, (status, result)=>{
        if(status!='complete') return Promise.reject('unknown district,'+code);
        const districtResult = result.districtList[0];
        if(!districtResult) return Promise.reject('unknown district,'+result);
        const bounds = districtResult.boundaries;
        if(districtMap[key]){
          container.remove(districtMap[key]);
        }
        const districtOption = Object.assign({}, options, {
          type:undefined,
          map:container,
          path: bounds,
        });
        const polygon = new amap.Polygon(districtOption);
        districtMap[key] = polygon;
        resolve(findRect(bounds));
      });
    });
  });
};
const circleMap = {};
const drawCircle = (amap, container, point, options={}) => {
  const key = getKeyOfPoint(point);
  if(cricleMap[key]) {
    container.remove(circleMap[key]);
  };
  const circleOption = Object.assign({}, options, {
    type:undefined,
    center:point.slice(),
  });
  const circle = new amap.Circle(circleOption);
  circleMap[key] = circle;
  container.add(circle);
  return [
    point.slice(),point.slice(),
  ];
};

const findRect = (pointArray=[], rect=[[-Infinity, -Infinity], [Infinity, Infinity]])=> {
  const leftTop = rect[0].slice();
  const rightBottom = rect[1].slice();
  pointArray.forEach(point => {
    point.forEach((val, idx) => {
      if(val > leftTop[idx]) {
        leftTop[idx] = val;
      }
      if(val < rightBottom[idx]) {
        rightBottom[idx] = val;
      }
    });
  });
  return [leftTop, rightBottom];
};
const drawPoint = (amap, container, point, pointRule, distance) => {
  const drawTask = pointRule(distance).map(ruleOptions => {
    switch(ruleOptions.type) {
      case "province":
      case "city":
      case "district":
        return drawDistrict(amap, container, point, ruleOptions);
      case "circle":
        return drawCircle(amap, container, point, ruleOptions);
      default:
        return [point, point];
    }
  }) || [[point, point]];
  return Promise.all(drawTask).then(rectArray => {
    return rectArray.reduce((sum, cur)=>{
      sum = findRect(rect, sum);
      return sum;
    }, [[-Infinity, -Infinity], [Infinity, Infinity]])
  })
};

const zoomMap = (amap, container, loadRect, unloadRect) => {
  
};

const renderTheRoute = (vue) => {
  return prepareMap(vue).then(ok => {
    return Promise.all([vue.amapResolve, vue.containerResolve]);
  }).then(([amap, container]) => {
    const loadPoint = vue.loadPoint || vue.unloadPoint || tian_an_men;
    const unloadPoint = vue.unloadPoint || vue.loadPoint || tian_an_men;
    const distance = amap.GeometryUtil.distance([...loadPoint], [...unloadPoint]);
    const drawLoad =vue.loadPoint && drawPoint(amap, container, [...vue.loadPoint], vue.loadRule || defaultLoadRule, distance) || [loadPoint, loadPoint];
    const drawUnload = vue.unloadPoint && drawPoint(amap, container, [...vue.unloadPoint], vue.unloadRule || defaultUnloadRule, distance) || [unloadPoint, unloadPoint];
    return Promise.all([amap, container, drawLoad, drawUnload]);
  }).then(([amap, container, loadRect, unloadRect])=> {
    return zoomMap(amap, container, loadRect, unloadRect);
  });
}
export default {
  name:'AmapRoute',
  components:{
    log,
  },
  props:{
    className:String,
    loadPoint:Array,
    unloadPoint:Array,
    loadRule:Function,
    unloadRule:Function,
    amap:null,
  },
  data(){
    // const vue = this;
    const amapId = uuidv4();
    return {
      amapResolve:null,
      amapId:amapId,
      containerResolve:null,
    };
  },
  mounted(){
    const vue = this;
    if(!vue.amap) return;
    if(!vue.amapResolve) {
      vue.amapResolve = Promise.resolve(vue.amap);
    }
    vue.drawRoute();
  },
  updated(){
    const vue = this;
    if(!vue.amap) return;
    if(!vue.amapResolve) {
      vue.amapResolve = Promise.resolve(vue.amap);
    }
    vue.drawRoute();
  },
  methods: {
    drawRoute() {
      const vue = this;
      renderTheRoute(vue).then(ok => {
        vue.$emit('drawRoute', ok);
      }).catch(err=>{
        console.log(err);
      });
    }
  }
}
</script>

