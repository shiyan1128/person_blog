<template>
  <div class="fullPage">
    <div class="left-nav">
      <div class="top-style">
        <div class="picture"></div>
        <div class="personality">
          <span>唯有行动才能解除所有的不安~</span>
        </div>
        <div class="avatar-float"></div>
      </div>
      <div class="buttom-navigation">
        <RouterLink active-class="active" to="/">
          <span class="center">
            <span class="icon iconfont icon-shouye"></span>
            首页
          </span>
        </RouterLink>
        <RouterLink active-class="active" to="/details">
          <span class="center">
            <span class="icon iconfont icon-a-Frame20"></span>
            广场
          </span>
        </RouterLink>
        <RouterLink active-class="active" to="/personal/oneself">
          <span class="center">
            <span class="icon iconfont icon-gerenxinxi"></span>
            个人信息
          </span>
        </RouterLink>
        <RouterLink active-class="active" to="/personal/article">
          <span class="center">
            <span class="icon iconfont icon-wenzhangguanli"></span>
            文章管理
          </span>
        </RouterLink>
        <RouterLink active-class="active" to="/personal/musicList">
          <span class="center">
            <span class="icon iconfont icon-yinle"></span>
            音乐列表
          </span>
        </RouterLink>
      </div>
    </div>
    <div class="right-main">
      <!-- 是这个的95% -->
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="less">
.fullPage {
  width: 100%;
  height: 746px;
  background-color: rgb(215, 213, 214);
  display: flex;
  .left-nav {
    width: 275px;
    height: 100%;
    flex-shrink: 0;
    background-color: rgb(245, 252, 244);
    .top-style {
      height: 250px;
      position: relative;
      .picture {
        width: 100%;
        height: 180px;
        background: url('@/assets/images/16.jpeg') no-repeat center / cover;
      }
      .personality {
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
        width: 100%;
        height: 70px;
        padding-bottom: 10px;
        background-color: #faf4f4;
        span {
          display: inline-block;
        }
      }
      .avatar-float {
        position: absolute;
        top: 100px;
        left: 50%;
        margin-left: -50px;
        width: 100px;
        height: 100px;
        background: url('@/assets/images/13.jpeg') no-repeat center / cover;
        border-radius: 5px;
      }
    }
    .buttom-navigation {
      display: flex;
      flex-direction: column;
      a {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        font-size: 17px;
        text-align: center;
        .center {
          display: inline-block;
          height: 50px;
          width: 80%;
          text-align: left;
          padding: 0 5px;
          .icon {
            font-size: 18px;
          }
          .icon-shouye {
            font-size: 20px;
            font-weight: 600;
            color: black;
          }
          .icon-a-Frame20,
          .icon-gerenxinxi {
            font-size: 23px;
            margin-left: -2px;
          }
        }
      }
    }
  }
  .right-main {
    flex: 1;
    height: 100%;
    background-color: rgb(234, 234, 247);
  }
}
.active {
  color: rgb(247, 122, 122);
}
</style>
