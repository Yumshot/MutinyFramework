<template>
  <body>
    <iframe :src="gameURL" frameborder="0" width="100%" height="100%"></iframe>
    <n-button text type="info" v-on:click="endGame"> End Game </n-button>
  </body>
</template>
<script lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import axios from 'axios'

export default {
  props: {
    data: {
      type: String,
      required: true
    }
  },
  components: {
    NButton
  },

  setup(props) {
    return {
      gameURL: ref(props.data),
      endGame: () => {
        axios
          .post(`http://mutiny_core/__closeArcadeGame`)
          .then(() => {
            window.close()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style scoped>
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.n-button {
  color: white;
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 20px;
}
</style>
