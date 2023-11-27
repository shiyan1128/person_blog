import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useShiyanStore = defineStore(
  'shiyan',
  () => {
    // const contentList = ref([])
    const contentList = ref(JSON.parse(localStorage.getItem('shiyan'))) || ref([])
    const setContent = (array) => {
      contentList.value = array
    }
    // 根据文章id查询文章相关内容
    const getContentById = (id) => {
      const item = contentList.value.find((item) => {
        return item.id === id
      })
      return item
    }
    return { contentList, getContentById, setContent }
  },
  {
    persist: true
  }
)
