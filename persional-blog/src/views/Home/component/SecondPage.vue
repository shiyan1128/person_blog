<script setup>
import '@/assets/iconfont/iconfont.css'
import { onMounted, onUpdated, ref, onUnmounted } from 'vue'
import { useShiyanStore } from '@/stores/shiyanStore.js'
import { searchContentByUserId } from '@/api/shiyan'

const shiyanStore = useShiyanStore()
const searchContent = async () => {
  const res = await searchContentByUserId(1)
  console.log(res)
  // console.log('cdscjksndcuj')
  shiyanStore.setContent(res.data.data)
  // console.log(res.data.data)
  // console.log(shiyanStore.contentList)
}
onMounted(() => {
  searchContent()
})
// const contentList = shiyanStore.contentList
// console.log(contentList)

const audioList = ref([
  'src/assets/audios/棉子 - 勇气.mp3',
  'src/assets/audios/葛东琪 - 悬溺.mp3',
  'src/assets/audios/鹿晗 - 我们的明天.mp3'
])
const nameList = ref([
  { name: '勇气', author: '棉子' },
  { name: '悬溺', author: '葛东琪' },
  { name: '我们的明天', author: '鹿晗' }
])
let audioListIndex = ref(0)
const audioPlayer = ref(true)
const audio = ref()

// 进度条外框
const progressBarBg = ref()
// 进度条调节按钮
const progressDot = ref()
// 进度条
const progressBar = ref()
// 已播放时长
const audioCurTime = ref()
// 总时长
const duration = ref()
// 声音调节按钮
const sound = ref(true)

// 定时器
let timer = ''
const myPlay = (flag, change = false) => {
  if (change) {
    return
  }
  if (flag) {
    audio.value.play()
    audioPlayer.value = !flag
  } else {
    audio.value.pause()
    audioPlayer.value = !flag
  }
}

const handleDowm = (e) => {
  // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以

  // console.log(this.audio.currentTime)
  // console.log(e)
  // console.log(progressBarBg.value)
  if (!audio.value.paused || audio.value.currentTime != 0) {
    // let pgsWidth = progressBarBg.value.offsetWidth
    let pgsWidth = 196
    let rate = e.offsetX / pgsWidth
    audio.value.currentTime = audio.value.duration * rate
    updateProgress()
  }
}

// const handleDowm = (e) => {
//   console.log('我点击了', e)
//   // 播放条的最左边是133px 最右边是326px
//   // 点击的时候先停止歌曲的播放
//   audio.value.pause()
//   // 点击的时候获得当前点击的x轴位置
//   let current_x = ((e.pageX - 130) / (330 - 130)) * 100
//   console.log(current_x, e.pageX)
//   // 将这个位置同步给函数进行更新,然后再开始播放音乐
//   audio.value.currentTime = (audio.value.duration * current_x) / 100
//   // let value = audio.value.currentTime / audio.value.duration
//   progressBar.value.style.width = current_x + '%'
//   progressDot.value.style.left = current_x + '%' // 初始时间
//   audioCurTime.value.innerHTML = transTime(audio.value.currentTime)
//   let duration2 = transTime(audio.value.duration)
//   duration.value.innerHTML = formatTime(duration2)
//   if (!audioPlayer.value) {
//     audio.value.play()
//   }
// }

// 格式化时间显示，补零对齐

function formatTime(value) {
  let time = ''
  let s = value.split(':')
  let i = 0
  for (; i < s.length - 1; i++) {
    time += s[i].length == 1 ? '0' + s[i] : s[i]
    time += ':'
  }
  time += s[i].length == 1 ? '0' + s[i] : s[i]
  return time
}

// 播放时间换算
function transTime(value = 0) {
  let time = ''
  let h = parseInt(value / 3600)
  value %= 3600
  let m = parseInt(value / 60)
  let s = parseInt(value % 60)
  if (h > 0) {
    time = formatTime(h + ':' + m + ':' + s)
  } else {
    time = formatTime(m + ':' + s)
  }
  return time
}

// 更新进度条
const updateProgress = () => {
  let audioElement = new Audio(audioList.value[audioListIndex.value])

  // 每一次播放都会调用的函数
  const updateTheProgress = () => {
    let value = audio.value.currentTime / audio.value.duration
    progressBar.value.style.width = value * 100 + '%'
    progressDot.value.style.left = value * 100 - 2 + '%' // 初始时间
    audioCurTime.value.innerHTML = transTime(audio.value.currentTime)
    // (audioElement.duration / 60).toFixed(2).replace('.', ':')
    let duration2 = transTime(audio.value.duration)
    duration.value.innerHTML = formatTime(duration2)
  }
  // 只在点击暂停或播放时执行一次
  audioElement.addEventListener('loadedmetadata', () => {
    // 每次暂停时，先把timer清理掉
    if (audioPlayer.value) {
      console.log(audioPlayer.value)
      clearInterval(timer)
      return
    } else {
      // 点击开始时需执行
      updateTheProgress()
    }
    // setTimeout是延迟执行回调函数，只执行一次；
    // setInterval是定时执行回调函数，会不断重复执行直到取消
    timer = setInterval(updateTheProgress, 1000)
  })
}

// 结束时
const audioEnded = () => {
  // progressBar.value.style.width = 0 + '%'
  // progressDot.value.style.left = 0 + '%'
  audioPlayer.value = true
}

// 开始时
const startProgress = () => {
  audio.value.addEventListener(
    'timeupdate',
    () => {
      updateProgress()
    },
    false
  )
  audio.value.addEventListener(
    'ended',
    () => {
      audioEnded()
    },
    false
  )
}

// 调节上下曲目
const songNext = (index) => {
  audioPlayer.value = true
  audio.value.pause()
  audioListIndex.value = Math.abs(audioListIndex.value + index)
  audioListIndex.value %= audioList.value.length
  setTimeout(() => {
    myPlay(audioPlayer.value)
  }, 10)
}

onUpdated(() => {
  startProgress()
})

// 实现声音调节
let progressY = ref()
let currentProgressY = ref()
let circleY = ref()
let soundValue = 0
// 调节声音条
const handleVolumeMousedown = (e) => {
  console.log('我点击了音量', e)
  soundValue = ((595 - e.pageY) / progressY.value.offsetHeight) * 100
  // console.log(parseInt(soundValue))
  // console.log(progressY.value.offsetHeight) // 55
  if (soundValue >= 0 && soundValue <= 100) {
    currentProgressY.value.style.height = soundValue + '%'
    // 音量  【0 - 1】 区间
    audio.value.volume = soundValue / 100
    console.log(soundValue)
    // 小圆圈取值： -1 ~ 49
    circleY.value.style.bottom = (soundValue - 1) / 2 + 'px'

    console.log(circleY.value.style.bottom)
  }
}
// 点击 静音与否
const adjustSound = (flag) => {
  if (flag) {
    sound.value = !flag
    currentProgressY.value.style.height = 0
    audio.value.volume = 0
    circleY.value.style.bottom = -0.5 + 'px'
  } else {
    sound.value = !flag
    currentProgressY.value.style.height = soundValue + '%'
    audio.value.volume = soundValue / 100
    circleY.value.style.bottom = (soundValue - 1) / 2 + 'px'
  }
}

// 音乐列表
const musicListFlag = ref(false)
// 实现鼠标移出时 列表隐藏  =》思路：当宽度小于400时，display:none; else: display: block
const left = ref()
const isdisplay = ref(false)
let resizeObserver
onMounted(() => {
  resizeObserver = new ResizeObserver(async (entries) => {
    let widthLeft = entries[0].contentRect.width
    console.log(entries[0].contentRect.width)
    // console.log(entries[0].contentRect.height)
    if (widthLeft < 400) {
      // 将music-list设置为display:none;
      isdisplay.value = true
      // 将控制music-list的点击事件设置为false
      musicListFlag.value = false
      console.log('成功')
    } else {
      isdisplay.value = false
      console.log('40000')
    }
  })
  resizeObserver.observe(left.value)
})
// 离开页面时，取消对过渡效果时宽度变化的监听
onUnmounted(() => {
  resizeObserver.disconnect()
})

// 实现点击歌曲播放效果
const listPlay = (index) => {
  audioPlayer.value = true
  audio.value.pause()
  audioListIndex.value = index
  setTimeout(() => {
    myPlay(audioPlayer.value)
  }, 10)
}
</script>

<template>
  <div class="second">
    <div class="left" ref="left">
      <div class="left-bottom">
        <div class="music">
          <div class="audio-player">
            <audio ref="audio" :src="audioList[audioListIndex]" loop="true">
              <!-- <source
              ref="source"
              :src="audioList[audioListIndex]"
              type="audio/mp3"
            /> -->
            </audio>
            <!-- 播放和暂停 -->
            <div
              class="iconfont icon-caret-right"
              v-if="audioPlayer"
              @click="myPlay(audioPlayer)"
            ></div>
            <div class="iconfont icon-pause" @click="myPlay(audioPlayer)" v-else></div>
          </div>
        </div>
        <div class="audio-right">
          <!-- 歌曲名字和上下曲 -->
          <div class="about-audio">
            <div class="sing-name">
              <span class="name">
                {{ nameList[audioListIndex].name }}
              </span>
              <span class="gang">-</span>
              <span class="author">{{ nameList[audioListIndex].author }}</span>
            </div>
            <!-- 图标 -->
            <div class="audio-iconfont">
              <!-- 声音图标 -->
              <div class="sound">
                <!-- 音量背景 -->
                <div class="progress-bg">
                  <!-- 音量调节框框 -->
                  <div class="progressY" ref="progressY" @mousedown="handleVolumeMousedown">
                    <!-- 音量条 -->
                    <div class="currentProgressY" ref="currentProgressY">
                      <!-- 小圆点 -->
                      <span class="circleY" ref="circleY"></span>
                    </div>
                  </div>
                </div>
                <span
                  class="iconfont icon-shengyin"
                  @click="adjustSound(sound)"
                  v-if="sound"
                ></span>
                <span
                  class="iconfont icon-shengyinguanbi"
                  v-else
                  @click="adjustSound(sound)"
                ></span>
              </div>
              <span class="iconfont icon-step-backward" @click="songNext(-1)"></span>
              <span
                class="iconfont icon-caret-right"
                v-if="audioPlayer"
                @click="myPlay(audioPlayer)"
              ></span>
              <span class="iconfont icon-pause" v-else @click="myPlay(audioPlayer)"></span>
              <span class="iconfont icon-step-forward" @click="songNext(1)"></span>
              <div class="icon-music" v-if="musicListFlag">
                <!-- 音乐列表和图标 -->
                <div class="list" ref="list" :class="{ displaylist: isdisplay }">
                  <div class="music-list">
                    <div
                      class="music-item"
                      v-for="(item, index) in nameList"
                      :key="index"
                      @click="listPlay(index)"
                      :class="{ active: index === audioListIndex }"
                    >
                      <div class="music-index">{{ index + 8889 }}</div>
                      <div class="music-name">{{ item.name }}</div>
                      <div class="music-author">{{ item.author }}</div>
                    </div>
                  </div>
                </div>
                <span class="iconfont icon-musiclist" @click="musicListFlag = false"></span>
              </div>

              <span v-else class="iconfont icon-musiclist" @click="musicListFlag = true"></span>
            </div>
          </div>
          <!-- 时间和进度条 -->
          <div class="audio-time">
            <div class="progress-bar-bg" ref="progressBarBg" @mousedown="handleDowm">
              <span ref="progressDot"></span>
              <div class="progress-bar" ref="progressBar"></div>
            </div>
            <span class="timeWatch">
              <span class="audio-length-current" ref="audioCurTime">00:00</span>
              <span class="xiegang"> / </span>
              <span class="audio-length-total" ref="duration">00:00</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="container">
        <el-scrollbar height="620px" native="true">
          <!-- <h1>噬颜的博客</h1> -->
          <img src="@/assets/images/17.jpg" alt="" />
          <div class="bottom" v-for="item in shiyanStore.contentList" :key="item.id">
            <RouterLink :to="`/details/${item.id}`">
              <div class="content">
                <h3>{{ item.title }}</h3>
                <!-- <p>{{ item.article.content }}</p> -->
                <p class="show-content" v-html="item.content"></p>
              </div>
            </RouterLink>
            <div class="picture">
              <img :src="item.picture" alt="" />
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="right">
      <div class="icons">右侧小图标</div>
    </div>
  </div>
</template>
<style scoped lang="less">
.second {
  height: 686px;
  // height: 100%;
  background: url('@/assets/images/12.jpg') no-repeat center / cover;
  display: flex;
  justify-content: space-around;
  // padding: 0 60px;
  .left {
    position: relative;
    width: 0;
    height: 100px;
    bottom: -526px;
    transition-property: width;
    transition-duration: 1s;
    .icon-music {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .list {
        position: absolute;
        bottom: 44px;
        .music-list {
          width: 400px;
          height: 200px;
          padding: 10px 2px;
          background-color: #99ece2;
          border-radius: 5px 5px 0 0;
          .music-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            margin-bottom: 5px;
            padding: 0 15px;

            cursor: pointer;
            .music-index {
              width: 45px;
            }
            .music-name {
              width: 190px;
              text-align: left;
            }
            .music-author {
              width: 100px;
              text-align: right;
            }
          }
        }
      }
      .icon-musiclist {
        cursor: pointer;
      }
    }

    .left-bottom {
      position: relative;
      &:hover .audio-right {
        width: 300px;
        border-radius: 5px;
        transform: translateX(120px);
        .sing-name {
          font-size: 16px;
        }
      }
    }
    .music {
      position: relative;
      width: 120px;
      height: 120px;
      overflow-x: hidden;
      background: #fff;
      border-radius: 5px;
      transition-property: width;
      transition-duration: 1s;
      z-index: 2;

      .audio-player {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 0px;
        left: 0px;
        background: url('@/assets/images/15.jpeg') no-repeat center / cover;
        width: 120px;
        height: 120px;
        border-radius: 5px;
        cursor: auto;
        audio {
          width: 100px;
          height: 100px;
        }

        .iconfont {
          display: block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          font-size: 26px;
          color: #f9f6f6;
          text-align: center;
          border: 2px solid #f9f7f7;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
    .audio-right {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 120px;
      width: 120px;
      border-radius: 5px;
      background-color: pink;
      padding: 10px;
      transition: all 1s ease;
      cursor: auto;
      z-index: 0;

      .about-audio {
        display: flex;
        justify-content: space-between;
        margin: 12px 0 20px;
        .sing-name {
          font-size: 0;
          .name {
            font-size: 18px;
          }
          .gang {
            font-size: 16px;
            margin: 0 6px;
          }
        }

        .audio-iconfont {
          position: relative;
          display: flex;
          align-items: center;
          font-size: 18px;
          height: 20px;
          line-height: 20px;
          .sound {
            cursor: pointer;
            position: relative;
            top: -37px;
            span {
              position: absolute;
              top: 27px;
              right: 7px;
              cursor: pointer;
              display: block;
              width: 10px;
              height: 10px;
              text-align: center;
            }
          }
          .sound:hover {
            position: relative;
            height: 70px;
            width: 20px;
            .iconfont {
              position: absolute;
              top: 62px;
            }
            .progress-bg {
              position: absolute;
              width: 20px;
              height: 70px;
              padding-bottom: 5px;
              // margin-bottom: 5px;
              bottom: 10px;
              left: -1px;
              background-color: rgba(227, 227, 239, 0.5);
              cursor: auto;

              .progressY {
                position: relative;
                width: 3px;
                height: 85%;
                border-radius: 3px;
                margin: 5px 8px 10px 8px;
                background-color: #fff;
                cursor: pointer;
                .currentProgressY {
                  position: absolute;
                  bottom: 0;
                  height: 0%;
                  background-color: #3853fe;
                  border-radius: 3px;
                  width: 100%;
                  .circleY {
                    position: absolute;
                    bottom: -1px;
                    right: -3.5px;
                    top: unset;
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    // margin-bottom: 5px;
                    // padding-bottom: 5px;
                    border-radius: 50%;
                    border: 1px solid #3853fe;
                    background-color: #fff;
                    &:hover span {
                      width: 12px;
                      height: 12px;
                      right: -4px;
                      top: unset;
                      border-radius: 50%;
                    }
                  }
                }
              }
            }
          }

          span {
            cursor: pointer;
          }
          .icon-musiclist {
            display: block;
            height: 25px;
            line-height: 25px;
            font-size: 24px;
          }
          .icon-shengyinguanbi,
          .icon-shengyin {
            margin: 0 2px;
          }
        }
      }

      .audio-time {
        position: relative;
        // bottom: -70px;
        // 进度条外框
        .progress-bar-bg {
          position: relative;
          background-color: #d9d9d9;
          width: 70%;
          margin-right: 2px;
          // padding-right: 5px;
          height: 2px;
          cursor: pointer;
          // margin-bottom: 5px;

          // 进度条
          .progress-bar {
            background-color: #649fec;
            width: 0;
            height: 2px;
          }
          // 进度条调节按钮
          span {
            position: absolute;
            top: -3px;
            left: 0;
            display: block;
            content: ' ';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #3e87e8;
            cursor: pointer;
          }
        }

        .timeWatch {
          float: right;
          position: relative;
          top: -15px;
          display: flex;

          .audio-length-total {
            // float: right;
            font-size: 12px;
            margin-top: 5px;
          }

          .xiegang {
            font-size: 12px;
            margin: 4px 4px 0;
          }

          .audio-length-current {
            // float: left;
            font-size: 12px;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .left:hover {
    width: 400px;
  }
  // 左侧hover时，隐藏右侧小图标
  .left:hover ~ .right {
    .icons {
      visibility: hidden;
    }
  }
  .center {
    .container {
      width: 700px;

      .el-scrollbar {
        ::-webkit-scrollbar {
          // 只有宽度，导致原生滚动条不显示
          width: 0px;
        }
      }

      img {
        display: block;
        width: 500px;
        margin: 80px auto;
      }
      .bottom {
        display: flex;
        margin-top: 25px;
        justify-content: space-around;
        .content {
          width: 485px;
          height: 150px;
          overflow: hidden;
          background: rgba(203, 168, 168, 0.3);
          margin-right: 10px;
          border-radius: 15px;
          padding: 10px 20px;
          // ::v-deep .show-content {
          //   span {
          //     color: red;
          //   }
          // }
          h3 {
            color: rgb(252, 247, 247);
            height: 40px;
            font-size: 18px;
            padding: 5px 0;
            font-weight: normal;
          }
          p {
            // text-indent: 2em;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            text-overflow: ellipsis;
            overflow: hidden;
            ::v-deep {
              * {
                font-size: 14px !important;
                font-family: '等黑' !important;
                font-weight: 400 !important;
                color: rgb(22, 22, 22) !important;
                text-align: left !important;
              }
            }
          }
        }
        .picture {
          width: 185px;
          height: 150px;
          background: rgba(255, 255, 255, 0.7);
          margin-right: 10px;
          border-radius: 15px;
          // opacity: 0.3;
          img {
            width: 185px;
            height: 150px;
            border-radius: 15px;
            border: 2px solid #fff;
            margin: 0;
          }
        }
      }
      .bottom:nth-child(2n) {
        flex-direction: row-reverse;
        justify-content: space-around;
      }
    }
  }
  .right {
    position: relative;
    .icons {
      position: absolute;
      right: 10px;
      bottom: 40px;
      width: 100px;
      height: 100px;
      background-color: #fff;
      border-radius: 5px;
    }
  }

  // 点击时背景色
  .active {
    // 背景色
    background-color: #fff;
  }
  .displaylist {
    display: none;
  }
}
</style>
