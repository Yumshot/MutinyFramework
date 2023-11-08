<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Register from './views/Register.vue'
import Vehicle from './views/Vehicle.vue'
import Character from './views/Characters.vue'
import BlackBars from './views/BlackBars.vue'
import StreamlineGame from './views/StreamlineGame.vue'

let registerState = ref(false)
let vehicleState = ref(false)
let vehicleData = ref({})
let characterState = ref(false)
let characterData = ref<any>([])
let blackBarState = ref(false)
let arcadeGameState = ref(false)
let arcadeGameName = ref('')

onMounted(() => {
  window.addEventListener('message', (e) => {
    switch (e.data.event) {
      case '__openRegister':
        registerState.value = e.data.state
        console.log(e.data.state, registerState.value)
        break
      case '__openVehicle':
        vehicleState.value = e.data.state
        vehicleData.value = e.data.options
        break
      case '__openCharacter':
        characterState.value = e.data.state
        characterData.value = e.data.options
        break
      case '__blackBars':
        blackBarState.value = e.data.state
        break
      case '__openArcadeGame':
        arcadeGameState.value = e.data.state
        arcadeGameName.value = e.data.name
        break
    }
  })
})
</script>

<template>
  <div>
    <BlackBars v-if="blackBarState" />
    <Register v-if="registerState" />
    <Character v-if="characterState" :data="characterData" />
    <Vehicle v-if="vehicleState" :data="vehicleData" />
    <StreamlineGame v-if="arcadeGameState" :data="arcadeGameName" />
  </div>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: transparent !important;
}
</style>
