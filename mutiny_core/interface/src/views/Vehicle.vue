<template>
  <div class="speed">
    <div class="text-lg text-white status-container">
      <n-progress
        type="dashboard"
        gap-position="bottom"
        :percentage="data.speed.mph / 4"
        class="text-xs ml-2"
        size="small"
        color="#00829a"
        rail-color="rgba(0,0,0,0)"
      >
        {{ data.speed.mph }} MPH
      </n-progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NProgress } from 'naive-ui'

export default defineComponent({
  name: 'Vehicle',
  components: {
    NProgress
  },
  props: {
    data: {}
  }
})
</script>

<style scoped>
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: transparent !important;
}
.speed {
  font-family: 'Black Ops One', sans-serif;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
.status-container {
  position: relative;
  top: 70%;
  overflow: hidden;
}
</style>
