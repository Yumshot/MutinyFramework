<template>
  <div class="carousel-wrapper">
    <n-carousel
      keyboard
      :direction="direction"
      :dot-placement="direction === 'vertical' ? 'right' : 'bottom'"
    >
      <n-card
        :bordered="false"
        v-for="(k, v) in data"
        :key="k"
        class="container mx-auto text-center self-center"
      >
        {{ k }}</n-card
      >
    </n-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NCarousel, NCard } from 'naive-ui'

export default defineComponent({
  name: 'CharacterList',
  props: {
    data: []
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
.carousel-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

n-carousel {
  width: 100%;
  height: 100%;
  max-height: 80vh;
  max-width: 80vw;
  margin: auto;
}

.character_holder {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
