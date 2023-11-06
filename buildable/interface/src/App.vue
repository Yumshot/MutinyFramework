<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Register from './views/Register.vue'
import Vehicle from './views/Vehicle.vue'
import Character from './views/Characters.vue'

let registerState = ref(false)
let vehicleState = ref(false)
let vehicleData = ref({})
let characterState = ref(true)
let characterData = ref<any>([
  {
    index: 0,
    first_name: 'Trey',
    last_name: 'Sa',
    sex: 'male',
    date_of_birth: {
      $numberLong: '1700035200000'
    },
    last_location: {
      x: -1217.6834716796875,
      y: -2800.28564453125,
      z: 13.946533203125,
      heading: 141.73228454589844
    },
    internet_handle: 'Yumshot',
    funding: {
      cash: 0,
      bank: [],
      pin: '1331'
    }
  },
  {
    index: 1,
    first_name: 'Treyz',
    last_name: 'Saz',
    sex: 'male',
    date_of_birth: {
      $numberLong: '1700035200000'
    },
    last_location: {
      x: 0,
      y: 0,
      z: 0,
      heading: 0
    },
    internet_handle: 'Yumshotz',
    funding: {
      cash: 0,
      bank: [],
      pin: '1331'
    }
  }
])

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
    }
  })
})
</script>

<template>
  <div>
    <Register v-if="registerState" />
    <Character v-if="characterState" :data="characterData" />
    <Vehicle v-if="vehicleState" :data="vehicleData" />
  </div>
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
