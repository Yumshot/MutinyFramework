<script setup lang="ts">
import { onMounted, ref } from 'vue';
import RegisterView from './views/RegisterView.vue';
import CharacterSelect from './views/CharacterSelect.vue';
import ContextView from './views/Context.vue';
import BlackBars from './views/BlackBars.vue';
import VehicleHud from './views/VehicleHud.vue';

let IDS = ref(null);
let CURRENT_PAGE = ref("");
let VEHICLE_HUD = ref(false);
let VEHICLE_DATA = ref(undefined);
let BLACK_BARS = ref(false);
let CHARACTERS = ref(undefined);
let CONTEXT_DATA = ref(undefined);

onMounted(() => {
  window.addEventListener("message", (e) => {
    switch (e.data.event) {
      case "BLK_BAR":
        BLACK_BARS.value = e.data.state;
        if (BLACK_BARS.value) {
          VEHICLE_HUD.value = false;
        }
        break;
      case "VEHICLE_HUD":
        VEHICLE_HUD.value = e.data.state;
        VEHICLE_DATA.value = e.data.options;
        if (BLACK_BARS.value) {
          VEHICLE_HUD.value = false;
        }

        break;
      case "RESET":
        CURRENT_PAGE.value = "";
        break;
      case "OPEN_CHARACTER_CREATOR":
        IDS.value = e.data.identifiers;
        CURRENT_PAGE.value = e.data.event;
        break;
      case "OPEN_CHARACTER_SELECT":
        CHARACTERS.value = e.data.characters;
        CURRENT_PAGE.value = e.data.event;
        break;
      case "OPEN_CONTEXT_MENU":
        CURRENT_PAGE.value = e.data.event;
        CONTEXT_DATA.value = e.data.data;
        break;
    }
  })
})

const CHECK_PAGE = () => {
  return CURRENT_PAGE.value;
}
</script>

<template>
  <main>
    <black-bars v-if="BLACK_BARS" />
    <vehicle-hud v-if="VEHICLE_HUD" :data="VEHICLE_DATA" />
    <context-view :data="CONTEXT_DATA" v-if="CHECK_PAGE() == 'OPEN_CONTEXT_MENU'" />
    <register-view :identifiers="IDS" v-if="CHECK_PAGE() == 'OPEN_CHARACTER_CREATOR'" />
    <character-select :characters="CHARACTERS" v-if="CHECK_PAGE() == 'OPEN_CHARACTER_SELECT'" />
  </main>
</template>

<style scoped>
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: transparent !important;
}
</style>
