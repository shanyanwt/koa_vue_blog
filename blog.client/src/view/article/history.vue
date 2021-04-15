/** * 简介： 推送历史 * 时间：2018-05-27 * 作者： Y J */

<template>
  <div>
    <div class="skd-body skd-content">
      <Timeline>
        <template v-for="item in timeline">
          <TimelineItem :color="item.color">
            <Icon
              v-if="item.icon"
              :type="item.icon"
              size="30"
              slot="dot"
            ></Icon>
            <p class="time" v-show="item.time">{{ item.time }}</p>
            <p class="padding5">{{ item.title }}</p>
          </TimelineItem>
        </template>
      </Timeline>
    </div>
    <keep-alive>
      <vmenu class="skd-recommend-lsit"></vmenu>
    </keep-alive>
  </div>
</template>
<script>
import axios from "../../common/httpUtils";
import consts from "../../common/consts";
import api from "../../api/index";
import CONSTS from "../../common/consts";
import Vmenu from "../../components/menu.vue";

export default {
  data() {
    return {
      timeline: [
        {
          title: "发布里程碑版本，屌丝的逆袭",
          icon: "trophy",
          color: "#f90",
        },
        {
          title:
            "时隔多年老僵尸爬起升级版本，优化多余且不必要的依赖，他很懒只优化了基本功能，关注他的可以取关了",
          time: "2021-04-15",
        },
        {
          title: "失踪~斯嘎~",
          time: "2019-08至2021-04",
        },
        {
          title: "使用到的技术并不多，开源公布一下代码供大家参考指点！",
          time: "2019-08-5",
        },
        {
          title:
            "此次没有发布版本，话说购买阿里的服务器也一年了，打算续费，结算金额一千三百多，吓得我辣条都掉了，然后捡起来檫檫真贵！以后还要不要吃辣条了，然后放弃的了阿里云！",
          time: "2019-05-20",
        },
        {
          title: "发布1.3版本，增加实用工具推荐，各种技术栈，好玩好看的小工具",
          time: "2018-12-10",
        },
        {
          title:
            "服务调整，之前在阿里购买的服务器，前几个月还挺正常，后台jar启动时无法正常连接mysql，调试去就也为解决。思前想后干脆更换服务框架，使用Nodejs、Koa、Mysql、Sequelize、Pm2作为服务的解决方案，也尝试一下Node srevice作为服务可行度。别说了还挺香！",
          time: "2018-10-10",
        },
        {
          title:
            "发布1.2版本,增加了上传图片的服务，遇到大的图片，瞬间回到远古时代，1M的宽带不应该很快吗？  啥原因咱也不知道，咱也不敢问！",
          time: "2018-05-26",
        },
        {
          title:
            "发布1.1版本，发布完成一切运行正常，屌丝这时感觉达到人生巅峰，阿里云短信一条接一条，你付费不来看看俺这个服务可好了，可香了可带劲了，看的蠢蠢欲动，决定买它！！！，一下干了我一年的辣条钱，18年一年没吃辣条 (´;︵;`)",
          time: "2018-04-05",
        },
        {
          title:
            "发布1.0版本，购买域名：shikedian.com，免费品尝阿里云一月豪华CPU： 1核 1M超大带宽 ，信你个鬼，你个糟老头子坏地很！",
          time: "2018-03-02",
        },
        {
          title:
            "博客初心萌芽，分为两系统一服务，分别PC客户端、PC管理端、API服务。决定采用前后端分离，没别的想法，就是感觉这样很吊，技术栈：后端 Java、Spring boot、MySql、Mybatis ，前端：Vue、Iview、Axios、Webpack，前端采用 Nginx 转发，哎，真想！",
          time: "2018-02-20",
        },
        {
          title: "前端小白，从Vue入门到放弃的平凡之路！",
          time: "江小二一枚",
          icon: "ribbon-a",
        },
      ],
    };
  },
  methods: {},
  mounted() {
    document.title = "推送历史";
  },
  components: {
    Vmenu,
  },
};
</script>

<style scoped>
.time {
  font-size: 14px;
  font-weight: bold;
}

.padding5 {
  font-size: 14px;
  padding-left: 5px;
  line-height: 25px;
}
</style>