<script setup>
import { useShiyanStore } from '@/stores/shiyanStore'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useCarouselStore } from '@/stores/caroselStore'
import { Edit } from '@element-plus/icons-vue'
// 根据传递的id值，获取文章等信息
const shiyanStore = useShiyanStore()

const route = useRoute()
const content = ref('')

// 根据图片id拿到store中的picture
content.value = shiyanStore.getContentById(parseInt(route.params.id))

console.log(content.value, '233')
// 如果没有设置背景图，将要设置默认背景(实际上没用)
const bgcPicture = content.value.picture || 'src/assets/images/7.jpg'

// 点击返回，并使走马灯初始页设置为第二页
const router = useRouter()
const carouselStore = useCarouselStore()
const goBack = () => {
  router.back()
  carouselStore.setInitialIndex(1)
}
</script>
<template>
  <div class="contain" :style="{ background: 'url(' + bgcPicture + ') no-repeat center / cover' }">
    <el-scrollbar>
      <div class="center">
        <nav class="nav">
          <span class="iconfont icon-fanhui" @click="goBack"></span>
          <el-button
            class="edit"
            :icon="Edit"
            circle
            @click="router.push(`/edit/${route.params.id}`)"
          />
        </nav>

        <h1 class="title">{{ content.title }}</h1>
        <div class="text" v-html="content.content"></div>
      </div>
    </el-scrollbar>
    <RouterView></RouterView>
  </div>
</template>
<style scoped lang="less">
.contain {
  width: 100%;
  // height: 100%;
  height: 686px;
  background: url('@/assets/images/7.jpg') no-repeat center / cover;

  .center {
    width: 900px;
    min-height: 686px;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 20px;
    background: rgba(255, 255, 255, 0.3);
    .nav {
      display: flex;
      justify-content: space-between;
      height: 40px;
      .icon-fanhui {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        font-size: 24px;
        margin: 20px 0 0 20px;
        cursor: pointer;
        &:hover {
          color: aliceblue;
        }
      }
      .edit {
        margin: 20px 30px 0 0;
      }
    }

    .title {
      // height: 30px;
      // line-height: 30px;
      margin: 0 auto;
      padding: 30px 0 50px 0;
      text-align: center;
    }
    .text {
      padding: 0 15px;
      font-size: 17px;
      // text-indent: 2em;
      line-height: 1.5;
      text-align: justify; // 两端对齐
    }
  }
  // .my-edit {
  //   position: absolute;
  //   top: 15px;
  //   right: 0;
  // }
}
</style>
