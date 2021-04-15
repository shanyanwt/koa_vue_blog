<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo" @click="routeTo('/')">
            <img class="logo" src="../static/img/logo.png" />
            <span class="index-logo">时刻点</span>
          </div>
          <div class="layout-nav" ref="me">
            <ul>
              <li
                v-for="(item, index) in menuItem"
                id="ulMe"
                :class="$route.path == item.url ? selectedMenu : itemMenu"
                @click="routeTo(item.url)"
              >
                <Icon :type="item.icon"></Icon>{{ item.text }}
              </li>
              <Dropdown>
                <Button type="text" icon="ios-paper" class="skd-dropdown">
                  X实验室
                  <Icon type="arrow-down-b"></Icon>
                </Button>
                <template v-for="item in downMenu">
                  <DropdownMenu slot="list">
                    <DropdownItem @click.native="routeTo(item.url)">{{
                      item.text
                    }}</DropdownItem>
                  </DropdownMenu>
                </template>
              </Dropdown>
              <div class="writing">
                <Input
                  v-model="keyword"
                  :maxlength="50"
                  class="search"
                  size="large"
                  @on-enter="search(keyword)"
                >
                  <Button
                    slot="append"
                    icon="ios-search"
                    @click.native="search(keyword)"
                  ></Button>
                </Input>
                <Button
                  type="error"
                  class="font-16"
                  style="margin-left: 150px"
                  icon="edit"
                  @click.native="routeTo('/postedit')"
                  >发表文章</Button
                >
              </div>
            </ul>
          </div>
        </Menu>
      </Header>
      <div style="height: 64px"></div>
      <Content class="content" :style="widHeigth">
        <div style="height: 20px; margin: 5px 0">
          <!--<breadcrumb-nav></breadcrumb-nav>-->
        </div>
        <router-view></router-view>
      </Content>
      <BackTop :bottom="90" :right="190"></BackTop>
      <Footer class="layout-footer-center footer aaa">
        <p>
          <a @click="goa('/about')"> 关于我们</a>
          <a @click="goa('/history')"> 网站技术介绍</a>
        </p>
        <p>
          <a>友情链接：</a>
          <a target="_blank" href="http://www.runoob.com/js/js-tutorial.html">
            JavaScript 教程</a
          >
          <a
            href="http://es6.ruanyifeng.com/?search=tmeplate&x=0&y=0#README"
            target="_blank"
          >
            ECMAScript 6 入门</a
          >
        </p>
        <p><a>备案号：</a>2018-2021 &copy; 京ICP备18002635号</p>
      </Footer>
    </Layout>
  </div>
</template>

<script>
import breadcrumbNav from "../components/breadcrumb-nav.vue";
export default {
  data() {
    return {
      ss: true,
      widHeigth: "min-height: 600px",
      keyword: "",
      menuItem: [
        {
          text: "首页",
          url: "/",
          icon: "ios-navigate",
        },
        {
          text: "使用工具",
          url: "/tools",
          icon: "ios-cog",
        },
        {
          text: "推送历史",
          url: "/history",
          icon: "ios-clock-outline",
        },
        {
          text: "关于我",
          url: "/about",
          icon: "ios-paper",
        },
      ],
      downMenu: [
        {
          text: "时间倒计时",
          url: "/regular",
        },
      ],
      itemMenu: "ivu-menu-item",
      selectedMenu: "ivu-menu-item ivu-menu-item-active ivu-menu-item-selected",
    };
  },
  computed: {},
  methods: {
    routeTo(e) {
      this.$router.push(e).catch((err) => {});
    },

    touLogin(nodesc) {
      this.$Notice.success({
        title: "退出成功",
      });
      window.localStorage.removeItem("instance_id__instance_id");
    },
    search(v) {
      if (v != "") {
        this.$router.push({
          path: "/search",
          query: {
            q: v,
          },
        });
        setTimeout(() => {
          this.keyword = "";
        }, 200);
      }
    },
    goa(v) {
      this.$router.push({
        path: v,
      });
    },

    //页面滚动事件的实现
    menu() {
      this.scroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; //滚动的长度
      let conHeight = this.scroll; //内容的长度顶部
      let scrollHeight = document.body.scrollHeight; //总长度
      let comHeight = scrollHeight;
      if (conHeight > comHeight) {
        this.ss = true;
      } else {
        this.ss = false;
      }
    },
  },
  watch: {},
  components: {
    breadcrumbNav,
  },
  mounted() {
    window.addEventListener("scroll", this.menu);
    this.widHeigth = "min-height:" + (window.innerHeight - 202) + "px"; //滚动的长度
  },
};
</script>
<style>
.ivu-layout-header {
  padding: 0 20px;
  background: #ffffff;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.layout {
  min-width: 1200px;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}

.layout-logo {
  width: 270px;
  height: 30px;
  float: left;
  position: relative;
  top: 9px;
}

.logo {
  position: absolute;
  width: 45px;
  border-radius: 35px;
}

.index-logo {
  font-size: 34px;
  position: absolute;
  top: -10px;
  left: 67px;
}

.layout-nav {
  position: absolute;
  left: 20%;
}

.ivu-layout-footer {
  padding: 24px 190px;
}

.ivu-menu-dark {
  background: #ffffff;
}

.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu {
  color: #666;
  font-weight: 700;
}

.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {
  color: #00a1ec;
}

.writing {
  display: inline-block;
}

.search {
  width: 200px;
  /*right: 90px;*/
  display: -webkit-inline-box;
}

.skd-dropdown {
  font-weight: 700;
  font-size: 15px;
  color: #666;
}

.ivu-breadcrumb-item-separator {
  margin: 0 2px;
  color: #06a3ec;
}

.footer {
  background-color: #373d41;
}

.footer p {
  color: #9b9ea0;
  line-height: 30px;
}

.layout-footer-center a {
  color: #9b9ea0;
  display: inline-block;
  min-width: 12%;
}
/*导航悬起*/

.balance {
  position: relative;
}

.balancea {
  width: 100% !important;
  position: fixed;
}
</style>