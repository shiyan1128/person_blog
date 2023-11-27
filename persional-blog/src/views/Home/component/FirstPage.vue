<script setup>
import { ref } from 'vue'
import SecondPage from './SecondPage.vue'
import { useCarouselStore } from '@/stores/caroselStore'
let carousel = ref(null)

// 切换下一页
const changeNext = () => {
  carousel.value.next()
}
// 将初始页存在store中，提供详情页返回时改变
const carouselStore = useCarouselStore()
const initialIndex = carouselStore.initialIndex
</script>

<template>
  <div class="first">
    <div>
      <el-carousel
        height="auto"
        direction="vertical"
        :autoplay="false"
        arrow="always"
        ref="carousel"
        :initial-index="initialIndex"
      >
        <div class="icondown" @click="changeNext()">
          <span class="iconfont icon-arrow-down"></span>
        </div>
        <!-- style="height: 686px" -->
        <el-carousel-item style="height: 686px">
          <div class="homebody">
            <div class="content">
              <div class="left">
                <img src="@/assets/images/13.jpeg" alt="" />
              </div>
              <div class="right">
                <p>问世间情为何物？</p>
                <p>查看答案请先登录~</p>
              </div>
            </div>
          </div>
        </el-carousel-item>
        <!-- style="height: 686px" -->
        <el-carousel-item style="height: 686px">
          <SecondPage></SecondPage>
        </el-carousel-item>
        <el-carousel-item>
          <div class="third"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.first {
  height: 686px;
  .icondown {
    position: absolute;
    bottom: 5px;
    left: 50%;
    color: rgb(230, 109, 109);
    z-index: 500;
    cursor: pointer;

    .iconfont {
      font-size: 36px;
    }
  }

  .homebody {
    height: 100%;
    background: url('@/assets/images/4.jpg') no-repeat center / cover;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 500px;
      height: 400px;
      .left {
        img {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background-color: #fff;
        }
      }
      .right {
        p {
          font-size: 28px;
          text-align: center;
          color: #d7cccc;

          padding: 12px 0;
        }
        p:nth-child(2) {
          font-size: 16px;
        }
      }
    }
  }

  .third {
    height: 100%;
    background: url('@/assets/images/16.jpeg') no-repeat center / cover;
  }
}
</style>
