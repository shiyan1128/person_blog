<script setup>
import { useCarouselStore } from '@/stores/caroselStore'
const caroselStore = useCarouselStore()
</script>

<template>
  <div class="home">
    <!-- 首页 nav + 架子+ 二级路由出口 -->

    <nav class="homenav">
      <ul>
        <li><RouterLink to="/" @click="caroselStore.setInitialIndex(0)">首页</RouterLink></li>
        <li><RouterLink to="/details">广场</RouterLink></li>
        <li><RouterLink to="/personal">个人中心</RouterLink></li>
        <li><RouterLink to="/login" class="login">登录</RouterLink></li>
      </ul>
    </nav>
    <RouterView></RouterView>
  </div>
</template>
<style scoped lang="scss">
.home {
  background: #fff;
  height: 686px;
  // height: 100%;

  .homenav {
    width: 100%;
    height: 60px;
    background: rgb(101, 153, 139);
    position: relative;
    top: 0;
    left: 0;
    ul {
      display: flex;
      justify-content: end;
      padding-right: 70px;
      li {
        width: 70px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        a {
          color: #fff;
        }
      }
      li:hover {
        border-bottom: 4px solid rgb(136, 199, 212);
      }
      li:nth-child(4):hover {
        border-bottom: none;
      }
      li:nth-child(3) {
        margin: 0 13px;
      }
      .login {
        display: inline-block;
        width: 58px;
        height: 25px;
        line-height: 25px;
        background: rgb(44, 101, 113);
        border-radius: 5px;
      }
    }
  }
}
</style>
