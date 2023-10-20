<template>
  <div class="container">
    <div class="card" v-for="(value, key) in filteredCharacters" :key="key">
      <div>
        <div class="card-body">
          <div class="diamond"></div>
          <h1 class="card-title">
            {{ value.last_name }}, {{ value.first_name }}</h1>
          <p class="card-text">
            <Icon>
              <CelebrationRound />
            </Icon>: {{ value.birthdate }}<br>
            <Icon>
              <PersonSharp />
            </Icon>: {{ value.sex }}<br>

            <Icon>
              <LabelImportantRound />
            </Icon>: !PLACEHOLDER!<br>
            <Icon>
              <NumbersSharp />
            </Icon>: !PLACEHOLDER!<br>
            <Icon>
              <PhoneIphoneRound />
            </Icon>: !PLACEHOLDER!<br>
            <Icon>
              <AttachMoneySharp />
            </Icon>: !PLACEHOLDER!<br>
          </p>
          <div class="navigation" v-if="charactersRef.length > 1">
            <q-button type="icon" theme="secondary" icon="q-icon-arrow-left" style="color: #3f3251" size="small"
              v-on:click="changeIndex(0)">
            </q-button>
            <q-button type="icon" theme="secondary" icon="q-icon-arrow-right" style="color: #3f3251" size="small"
              v-on:click="changeIndex(1)">
            </q-button>
            <q-button type="icon" icon="q-icon-trash-bin" size="small"> </q-button>
            <q-button size="small" theme="secondary" round type="icon" icon="q-icon-account"> </q-button>

          </div>
          <div class="navigation" v-else>
            <q-button type="icon" icon="q-icon-trash-bin" size="small" fullWidth> </q-button>

            <q-button size="small" theme="secondary" round type="icon" icon="q-icon-account"
              v-on:click="selectCharacter(value)"> </q-button>
          </div>
          <div class="navigation" style="padding-top: 10%;">
            <q-button type="icon" icon="q-icon-target"
              style="background:#2c2d44;background-image:-moz-linear-gradient(45deg,#3f3251 2%,#002025 100%);background-image:-webkit-linear-gradient(45deg,#3f3251 2%,#002025 100%);background-image:linear-gradient(45deg,#3f3251 2%,#002025 100%);"
              size="regular" fullWidth v-on:click="selectCharacter(value)"> </q-button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue';
import axios from 'axios';
import { Icon } from '@vicons/utils';
import CelebrationRound from '@vicons/material/CelebrationRound'
import PersonSharp from "@vicons/material/PersonSharp"
import LabelImportantRound from "@vicons/material/LabelImportantRound"
import NumbersSharp from "@vicons/material/NumbersSharp"
import PhoneIphoneRound from "@vicons/material/PhoneIphoneRound"
import AttachMoneySharp from "@vicons/material/AttachMoneySharp"
export default {
  props: {
    characters: []
  },
  components: {
    Icon,
    CelebrationRound,
    PersonSharp,
    LabelImportantRound,
    NumbersSharp,
    PhoneIphoneRound,
    AttachMoneySharp
  },
  setup(props: any) {
    let currentIndex = ref(0);

    const changeIndex = (value: number) => {
      if (value === 1) {
        if (currentIndex.value < charactersRef.length - 1) {
          currentIndex.value = currentIndex.value + 1;
        } else {
          return
        }
      } else {
        if (currentIndex.value > 0) {
          currentIndex.value = currentIndex.value - 1;
        } else {
          return
        }
      }
    }


    let filteredCharacters = computed(() => {
      return charactersRef.filter((character, index) => index === currentIndex.value);
    });

    // let charactersRef: any[] = props.characters;
    let charactersRef: any[] = [{
      first_name: "A",
      last_name: 'B',
      birthdate: "2023",
      sex: 'Male'
    }]


    const selectCharacter = (character: any) => {
      axios.post("http://mutiny_core/selected_character", {
        data: character
      })
    }


    return { charactersRef, currentIndex, changeIndex, filteredCharacters, selectCharacter }
  }
};
</script>

<style scoped lang="scss">
@import url('../assets/character_select.scss');
</style>
