import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCarouselStore = defineStore('carousel', () => {
  const initialIndex = ref(0)
  const setInitialIndex = (number) => {
    initialIndex.value = number
  }
  return { initialIndex, setInitialIndex }
})
