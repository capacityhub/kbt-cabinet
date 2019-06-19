<template>
  <div class="chart-container">
    <chart :appStatis="this.appStatisData" height="100%" width="100%" />
  </div>
</template>

<script>
import { getStore, setStore } from '@/libs/storage';
import {getAppStatis} from "@/api/app";
import Chart from '@/components/Charts/MixChart'

export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      appStatisData: {
        appTitle: "小程序访问统计",
        type: "打开小程序统计",
        xData: [],
        yData: []
      },
    }
  },
  beforeCreate: function(){
    setStore('extAccessToken', this.$route.query.extAccessToken);
  },
  mounted() {
    getAppStatis('').then(res => {
      if (res.success === true) {
        console.log("load ok")
        this.appStatisData = res.result;
      } else {
        console.log("load error")
      }

    });
  },
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

