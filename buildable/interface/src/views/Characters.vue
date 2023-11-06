<template>
  <div class="carousel-wrapper">
    <n-carousel
      show-arrow
      keyboard
      :direction="direction"
      :dot-placement="direction === 'vertical' ? 'right' : 'bottom'"
      :on-update-current-index="onUpdateCurrentIndex"
    >
      <n-card
        :bordered="false"
        v-for="character in data"
        :segmented="{
          content: true,
          footer: 'soft'
        }"
        size="small"
        class="container mx-auto text-center text-white"
        style="
          background-color: rgba(0, 0, 0, 0.25);
          width: 55%;
          height: 80%;
          padding: 0;
          top: 15%;
          left: 50%;
          border-radius: 0.5rem;
          box-shadow: 0 0 0.5rem 0.25rem #00000080;
          overflow: hidden;
          font-family: 'Anton';
          text-shadow: rgba(0, 0, 0, 0.25) -1px 5px 2.5px;
          text-transform: uppercase;
          box-shadow: -5px 5px 2.5px #1486eb;
          font-size: 11pt;
          line-height: 22pt;
          vertical-align: middle;
          margin: 2pt;
          transition: 300ms;
          transform-origin: left top;
          transform: rotateX(-15deg) rotateY(30deg) scale(1);
        "
      >
        <template #header>
          <div class="text-white">
            {{ character?.first_name + ' ' + character?.last_name }}
          </div>
        </template>
        <template #header-extra>
          <div class="text-white">
            {{ character?.index }}
          </div>
        </template>
        <div class="list-container">
          <ul>
            <li>
              <span class="list-label">Last Location :</span>
              <span class="list-value">
                {{ character?.last_location }}
                <img id="mapLayer" src="../assets/map.jpg" class="w-1/2 mx-auto rounded-xl" />
              </span>
            </li>
            <li>
              <span class="list-label">@ :</span>
              <span class="list-value"> {{ character?.internet_handle }}</span>
            </li>
            <li>
              <span class="list-label">Cash :</span>
              <span class="list-value">$ {{ character?.funding?.cash }} </span>
            </li>
            <li>
              <span class="list-label">Bank :</span>
              <span class="list-value">$ {{ character?.funding?.bank }} </span>
            </li>
          </ul>
        </div>
        <template #footer>
          <n-space justify="space-between">
            <n-button text class="text-white hover:text-blue-300" color="#ff69b4">
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M9.5 9a1.5 1.5 0 0 1 1.5 1.5v.5c0 1.971-1.86 4-5 4c-3.14 0-5-2.029-5-4v-.5A1.5 1.5 0 0 1 2.5 9h7zm0 1h-7a.5.5 0 0 0-.5.5v.5c0 1.438 1.432 3 4 3s4-1.562 4-3v-.5a.5.5 0 0 0-.5-.5zM6 2.5A2.75 2.75 0 1 1 6 8a2.75 2.75 0 0 1 0-5.5zm0 1A1.75 1.75 0 1 0 6 7a1.75 1.75 0 0 0 0-3.5zm4.784-2.411l.07.057L12.5 2.793l1.646-1.647a.5.5 0 0 1 .708.708L13.207 3.5l1.647 1.646a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L12.5 4.207l-1.646 1.647a.5.5 0 0 1-.708-.708L11.793 3.5l-1.647-1.646a.5.5 0 0 1-.057-.638l.057-.07a.5.5 0 0 1 .562-.1l.076.043z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </template>
              Delete
            </n-button>
            <n-button text class="text-white" v-on:click="SelectCharacter()">
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                    <path d="M16 11l2 2l4-4"></path>
                  </g>
                </svg>
              </template>
              Select
            </n-button>
          </n-space>
        </template>
      </n-card>
    </n-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import { NCarousel, NCard, NButton, NSpace } from 'naive-ui'
import axios from 'axios'

interface Character {
  first_name: string
  last_name: string
  index: number
  last_location: {
    x: number
    y: number
    z: number
    heading: number
  }
  internet_handle: string
  funding: {
    cash: number
    bank: number
  }
}

export default defineComponent({
  name: 'CharacterList',
  props: {
    data: {
      type: Array as PropType<Character[]>,
      required: true
    }
  },
  components: {
    NCarousel,
    NCard,
    NButton,
    NSpace
  },

  setup(props) {
    const directionRef = ref<'horizontal' | 'vertical'>('vertical')
    const character = ref<any>(props.data[0])
    const onUpdateCurrentIndex = (index: number) => {
      character.value = props.data[index]
    }

    const SelectCharacter = () => {
      axios.post('http://mutiny_core/__selectedCharacter', {
        data: {
          character: character.value
        }
      })
    }

    return {
      direction: directionRef,
      directions: ['horizontal', 'vertical'],
      character,
      onUpdateCurrentIndex,
      SelectCharacter
    }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
.list-value {
  padding-left: 0.25rem;
}
.list-container {
  padding: 0.5rem;
}
.carousel-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

n-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 80vh;
  max-width: 80vw;
  margin: auto;
}

.character_holder {
  width: 100%;
  height: 100%;
  max-height: 80vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
