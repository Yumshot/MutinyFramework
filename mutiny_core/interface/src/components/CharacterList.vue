<template>
  <n-carousel
    keyboard
    :direction="direction"
    :dot-placement="direction === 'vertical' ? 'right' : 'bottom'"
    style="height: 240px"
  >
    <n-card :bordered="false"> </n-card>
  </n-carousel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NCarousel, NCard } from 'naive-ui'

export default defineComponent({
  name: 'CharacterList',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    NCarousel,
    NCard
  },
  setup() {
    const directionRef = ref<'horizontal' | 'vertical'>('horizontal')
    return {
      direction: directionRef,
      directions: ['horizontal', 'vertical']
    }
  }
})
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
