# 高德地图路线预览 #
  * 没啥稀奇的，不过是给两个项目用，单独提取处理。
  * 这是一个vue的项目

# 外部参数 #
  * loadPoint:[lng, lat]
  * unloadPoint:[lng, lat]
  * loadRule:(distance) => { // distance单位米
    return [{
      type:'province',// 'city', 'district', 'circle',
      border:true,
      borderColor:'',
      borderWidth:'',
      fill:true,
      fillColor:'',
      marker:'url',
      markerOffset:[],
      circleRange:10,
    }]
  } || defaultLoadRule
  * unloadRule:(distance) => { // distance单位米
    return [{
      type:'province',// 'city', 'district', 'circle',
      border:true,
      borderColor:'',
      borderWidth:'',
      fill:true,
      fillColor:'',
      marker:'url',
      markerOffset:[],
      circleRange:10,
    }]
  } || defaultUnloadRule
  * amap 需要插件 AMap.DistrictSearch,AMap.Geolocation,AMap.Geocoder

# 内部参数 #
  * defaultLoadRule:(distance) =>{
  }
  * defaultUnloadRule:(distance) =>{
  }
  
