<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Register from './views/Register.vue'
import Vehicle from './views/Vehicle.vue'

let registerState = ref(false)
let vehicleState = ref(false)
let vehicleData = ref({})

onMounted(() => {
  window.addEventListener('message', (e) => {
    switch (e.data.event) {
      case '__openRegister':
        registerState.value = e.data.state
        break
      case '__openVehicle':
        vehicleState.value = e.data.state
        vehicleData.value = e.data.options
        break
    }
  })
})
</script>

<template>
  <main>
    <Register v-if="registerState" />
    <Vehicle v-if="vehicleState" :data="vehicleData" />
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
