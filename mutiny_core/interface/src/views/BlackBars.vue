<template>
  <div id="top-bar"></div>
  <div id="bottom-bar"></div>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    return {}
  }
}
</script>

<style scoped>
body {
  background-color: black;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#top-bar,
#bottom-bar {
  position: fixed;
  width: 100vw;
  height: 25vh;
  /* Adjust this value to change the height of the black bars */
  background-color: black;
  overflow: hidden;
}

#top-bar {
  top: 0;
}

#bottom-bar {
  bottom: 0;
}
</style>
