<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>

<template>
    <div class="home-main">

        <Row :gutter="10">
            <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="md-map"></Icon>
                        数据统计
                    </p>
                    <div class="data-source-row">
                        <chart :appStatis="this.appStatisData" height="100%" width="100%" />
                    </div>
                </Card>
            </Col>
        </Row>


        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row>
                    <Col :md="12" :lg="24">
                        <Card>
                            <p slot="title" class="card-title" style="overflow:visible">
                                <a href="#" target="_blank">
                                    <Icon type="md-bookmark"></Icon>
                                    欢迎
                                </a>
                            </p>
                            <div style="height:60px;overflow:auto">
                                <div class="qr">

                                </div>
                                <div class="flex">
                                   欢迎 {{ username }} 登录
                                </div>
                            </div>
                        </Card>
                    </Col>

                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row>
                    <Col :md="24" :lg="12" style="padding: 0 5px 10px 0;">
                        <Card>
                            <p slot="title" class="card-title" style="overflow:visible">
                                <a href="#" target="_blank">
                                    <Icon type="md-bookmark"></Icon>
                                    小程序管理平台概述
                                </a>
                            </p>
                            <div style="height:60px;overflow:auto">
                                <div class="qr">

                                </div>
                                <div class="flex">
                                    小程序发布，上下架等
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col :md="24" :lg="12" style="padding: 0 0 10px 5px;" >
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="md-bookmark"></Icon>
                                更新日志
                            </p>
                            <div style="height:60px;overflow:auto">
                                <div class="qr">

                                </div>
                                <Alert style="padding: 8px 16px 8px 16px;">
                                    初始版本
                                </Alert>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>

    </div>
</template>

<script>

import Chart from '@/components/Charts/MixChart'
import {getAppStatis} from "@/api/app";
import Cookies from "js-cookie";

export default {
  name: "home",
  components: {
    Chart
  },
  data() {
    return {
      showVideo: false,
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      newToDoItemValue: "",
      city: "",
      weather: "",
      username: "",
      appStatisData: {
        appTitle: "小程序访问统计",
        type: "打开小程序统计",
        xData: [],
        yData: []
      },
    };
  },
  computed: {
    avatarPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    init() {

        try {
            let userInfo = JSON.parse(Cookies.get("userInfo"));
            this.username = userInfo.username;
        } catch (e) {
            username = "unknown"
            console.log("userInfo parse error" + Cookies.get("userInfo"))
        }


    }
  },
  mounted() {
    this.init();
    getAppStatis('').then(res => {
      if (res.success === true) {
          console.log("load ok")
          this.appStatisData = res.result;
      } else {
          console.log("load error")
      }

    });
  }
};
</script>
