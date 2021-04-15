<template>
  <div>
    <div class="skd-body">
      <div class="article ba" v-for="(item, index) in articleList">
        <div class="articleLeft">
          <a @click="getArticle(item)">
            <img v-lazy="imgUrl + item.cover" />
          </a>
        </div>
        <div class="articleMain">
          <h2 class="skd-ellipsis">
            <a @click="getArticle(item)">{{ item.title }}</a>
          </h2>
          <div class="articleConten">
            <p>{{ item.summary }}</p>
          </div>
        </div>
        <div class="foot skd-ellipsis">
          <span> 阅读量：{{ item.number }} </span>
          <span>
            {{ item.create_time }}
          </span>
          <span v-if="item.classify">分类：</span>
          <template v-for="items in item.classify">
            <Tag checked color="green" v-if="item.classify">{{ items }}</Tag>
          </template>
        </div>
      </div>
      <re-a></re-a>
    </div>
    <keep-alive>
      <vmenu class="skd-recommend-lsit"></vmenu>
    </keep-alive>
  </div>
</template>
<script>
import Vmenu from "../../components/menu";
import axios from "../../common/httpUtils";
import api from "../../api/index";
import CONSTS from "../../common/consts";
import dateFormat from "../../common/dateFormat";
import path from "../../common/navData.js";
import reA from "../../components/recommendArticle.vue";
import utils from "../../common/utils";

export default {
  data() {
    return {
      articleList: [],
      imgUrl: api.IMGURL,
      nav: path.currentPath,
    };
  },
  methods: {
    getArticle(type) {
      var url = "article/" + type.id;
      this.$router.push(url);
    },
    get() {
      axios({
        method: "post",
        url: api.ARTICLE_API.article_list,
        data: {
          type: 0,
          status: 0,
        },
      })
        .then((res) => {
          if (res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
            this.articleList = res.result_data;
            this.articleList.map((item) => {
              if (item.classify) {
                item.classify = utils.markSplit(item.classify);
              }
              item.create_time = dateFormat.diffTime(item.create_time * 1000);
            });
          } else {
            console.log("服务器异常");
          }
        })
        .catch((err) => {
          console.log("失误：" + err);
        });
    },
  },
  mounted() {
    document.title = "时刻点官网";
    this.get();
    this.nav = [];
    var index = {
      path: "/index",
      name: "index",
      title: "首页",
    };
    this.nav.push(index);
    //获取真实ip
    //  	console.log(window.returnCitySN)
  },
  components: {
    Vmenu,
    reA,
  },
};
</script>

<style scoped>
.article {
  height: 200px;
  padding: 20px;
  margin-bottom: 16px;
  overflow: hidden;
}

.articleLeft {
  width: 210px;
  height: 160px;
  float: left;
  margin-right: 10px;
  overflow: hidden;
}
/*添加a标签鼠标经过方法效果*/

.article a img {
  width: 100%;
  height: 160px;
  transition: all 500ms linear;
}

.article a:hover img {
  -webkit-transition: scale(1.5, 1.5);
  -moz-transition: scale(1.5, 1.5);
  -ms-transition: scale(1.5, 1.5);
  -o-transition: scale(1.5, 1.5);
  transform: scale(1.5, 1.5);
}

.articleMain {
  height: 90%;
}

.articleConten {
  margin: 10px;
  line-height: 24px;
  height: 68%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.articleConten p {
  height: 100%;
}

.foot span {
  margin-right: 20px;
}

.wid80 {
  width: 80%;
  height: 182px;
}

.tag {
  display: flex;
  float: right;
  margin-top: -42px;
  margin-right: 5px;
}
</style>