<script setup>
import { useShiyanStore } from '@/stores/shiyanStore'
const shiyanStore = useShiyanStore()
const contentList = shiyanStore.contentList
</script>
<template>
  <div class="article">
    <span class="iconfont icon-chuangzuo">
      <span class="prompt">来尽情创作吧~</span>
    </span>
    <el-scrollbar height="620px" native="true">
      <div class="main" v-for="item in contentList" :key="item">
        <div
          class="picture"
          :style="{ background: 'url(' + item.picture + ') no-repeat center / cover' }"
        ></div>
        <div class="article-container">
          <div class="title">{{ item.title }}</div>
          <div class="content" v-html="item.content"></div>
          <div class="buttom">
            <div class="time">{{ item.time.substr(0, 10) }}</div>
            <el-dropdown trigger="click">
              <el-button type="primary"> 操作 </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <div class="button" @click="$router.push(`/details/${item.id}`)">查看详情</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="less">
.article {
  width: 100%;
  height: 100%;
  background-color: #3c3434;
  padding-top: 50px;
  .el-scrollbar {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    ::-webkit-scrollbar {
      // 只有宽度，导致原生滚动条不显示
      width: 0px;
    }
  }
  .icon-chuangzuo {
    position: relative;
    left: 80%;
    // display: inline-block;
    display: flex;
    width: 130px;
    height: 30px;
    line-height: 30px;
    color: white;
    font-size: 26px;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
      color: rgb(186, 236, 219);
    }
    .prompt {
      display: inline-block;
      font-size: 14px;
      margin-left: 8px;
      font-family: '方正舒体';
      // margin-bottom: 10px;
    }
  }
  .main {
    display: flex;
    justify-content: center;
    width: 90%;
    height: 180px;
    background-color: #dad5d5;
    border-radius: 5px;
    padding: 5px 20px;
    margin: 0 auto 20px;

    .picture {
      width: 300px;
      height: 170px;
      border-radius: 5px 0 0 5px;
      margin-right: 20px;
      background-color: pink;
    }
    .article-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      .title {
        height: 30px;
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 5px;
      }
      .content {
        height: 100px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 10px;
        ::v-deep {
          * {
            font-size: 14px !important;
            font-family: '等黑' !important;
          }
        }
      }
      .buttom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // height: 30px;
        padding: 0 10px 0 0;
        .time {
          color: #898585;
        }
        ::v-deep .el-dropdown {
          .el-dropdown-menu__item {
            color: #000;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
