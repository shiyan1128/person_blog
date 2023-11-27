<script setup>
import { ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import request from '@/api/index'
import { useRoute, useRouter } from 'vue-router'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { updateArticle } from '@/api/shiyan'
import { useShiyanStore } from '@/stores/shiyanStore'
const route = useRoute()
const router = useRouter()
const editorRef = shallowRef()
const toolbarConfig = ref({})
const mode = ref('default')
const editorConfig = {
  placeholder: '请输入内容....'
}
const title = ref('')
const valueHtml = ref('')
// 当实例被创建的时候记录一下
const onCreated = (editor) => {
  editorRef.value = editor
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 获取文章id
const artId = parseInt(route.params.id)
// 当页面打开时将所选文章id进行回显
const shiyanStore = useShiyanStore()
const articel = shiyanStore.getContentById(artId)
const setArticle = () => {
  // console.log(articel.content)
  setTimeout(() => {
    valueHtml.value = articel.content
  }, 0)
  title.value = articel.title
  imageUrl.value = articel.picture
}
onMounted(() => {
  setArticle()
})

const toSaveEditContent = async () => {
  // 调用增加文章接口
  const result = await updateArticle(artId, title.value, valueHtml.value)
  // await addArticle(valueHtml.value, title.value)
  if (result.data.statu === 200) {
    ElMessage({ showClose: true, type: 'success', message: result.data.msg })
  } else {
    ElMessage({ showClose: true, type: 'warning', message: result.data.msg })
  }
  console.log(result)
  // 提交成功之后将页面设置为空
  title.value = ''
  valueHtml.value = ''
}
// 是否显示
const isShow = ref(true)
const hidden = () => {
  isShow.value = false
}
const show = () => {
  isShow.value = true
}

const imageUrl = ref() // 页面回显的图片路径
const uploadRef = ref()

// 不能用params的方式传递，只能使用FormData的格式传递数据
// {
//     bgcImage: bgcImg,
//     art_id: route.params.id
//   }
// 创建一个formdata对象
let bgcImg = new FormData()
const onSelectFile = (file) => {
  console.log(file)
  imageUrl.value = URL.createObjectURL(file.raw)
  bgcImg.append('bgcImage', file.raw)
  bgcImg.append('art_id', artId)
}
// 更新背景图片
const selectBgcPic = async () => {
  const res = await request.post('/upload', bgcImg)

  if (res.data.statu === 200) {
    console.log(res.data.statu)
    ElMessage({ showClose: true, type: 'success', message: res.data.msg })
  } else {
    ElMessage({ showClose: true, type: 'warning', message: res.data.msg })
  }
  console.log(res)
  imageUrl.value = ''
}
// 返回出去给父亲用
defineExpose({
  hidden,
  show
})
</script>
<template>
  <div class="container">
    <span class="iconfont icon-fanhui" @click="router.back()"></span>
    <div class="main">
      <!-- 图片上传 -->
      <div class="picture-upload">
        <!-- type="primary" 配置按钮样式 -->
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :on-change="onSelectFile"
          :show-file-list="false"
          :auto-upload="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <div class="button">
          <el-button
            @click="uploadRef.$el.querySelector('input').click()"
            type="primary"
            :icon="Plus"
            size="large"
            >选择图片</el-button
          >
          <el-button @click="selectBgcPic" type="success" :icon="Upload" size="large"
            >上传图片</el-button
          >
        </div>
      </div>
      <div class="characters">
        <!-- 标题 + 文本 -->
        <input
          type="text"
          placeholder="请输入标题..."
          class="title"
          v-model="title"
          v-show="isShow"
        />

        <div class="fuEdit" style="border: 1px solid #ccc" v-show="isShow">
          <div class="main-contianer">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 378px; overflow-y: hidden"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
          <div @click="toSaveEditContent" class="submit-btn">提交文本</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
.icon-fanhui {
  position: absolute;
  top: 20px;
  left: 70px;
  font-size: 24px;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #568c7e;
  .characters {
    width: 600px;
    height: 100%;
    // display: flex;
    .title {
      margin: 20px auto;
      padding: 2px 10px;
      height: 30px;
      width: 300px;
      border-radius: 5px;
    }
    .fuEdit {
      width: 600px;
      height: 550px;
      background-color: #ccc;
      border-radius: 5px;
      overflow: hidden;
      .submit-btn {
        text-align: center;
        height: 50px;
        background-color: #c8aaaa;
        padding: 15px 0;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
  }

  .picture-upload {
    width: 450px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avatar-uploader {
      width: 350px;
      :deep() {
        // .avatar {
        //   width: 278px;
        //   height: 278px;
        //   display: block;
        // }
        .el-upload {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }
        .el-upload:hover {
          border-color: var(--el-color-primary);
        }
        .el-icon.avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 350px;
          height: 350px;
          text-align: center;
        }
      }
    }
    .button {
      display: flex;
      justify-content: space-around;
      width: 350px;
      margin-top: 20px;
    }
  }
}
</style>
