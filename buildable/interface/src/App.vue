<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Register from './views/Register.vue'

let registerState = ref(false)

onMounted(() => {
  window.addEventListener('message', (e) => {
    switch (e.data.event) {
      case '__openRegister':
        registerState.value = e.data.state
        break
    }
  })
})
</script>

<template>
  <main>
    <Register v-if="registerState" />
  </main>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: transparent !important;
}
</style>
