<template>
    <Row type="flex" justify="center" align="middle" class="regist" @keydown.enter="submitRegist">
        <Col class="register-result-col" :xs="{span:22}">
            <Row class="success">
                <Icon type="md-checkmark-circle-outline" color="#52c41a" size="64"/>
                <p class="success-words">恭喜您，您的账户（{{username}}） 注册成功</p>
                <Row class="buttons">
                    <router-link to="/login">
                        <Button type="primary" size="large" style="margin-right:10px;">立即登录</Button>
                    </router-link>
                    <router-link to="/regist">
                        <Button size="large">返回注册</Button>
                    </router-link>
                </Row>
            </Row>
        </Col>
    </Row>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      username: "admin"
    };
  },
  methods: {},
  mounted() {
    //this.username = this.$route.query.username;
  }
};
</script>

<style lang="less">
@import "./regist-result.less";
</style>
