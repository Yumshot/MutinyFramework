<template>
  <n-drawer
    v-model:show="active"
    :width="502"
    class="container_base"
    :close-on-esc="false"
    :show-mask="false"
    :mask-closable="false"
  >
    <n-drawer-content>
      <n-form ref="formRef" inline :label-width="80" :model="formRef" :rules="rules" size="small">
        <n-space vertical size="small" style="padding: 10px">
          <n-divider title-placement="right" class="subpixel-antialiased text-white">
            MutinyRP
          </n-divider>

          <n-card :bordered="false" style="background: transparent !important">
            <n-tabs
              default-value="IDENTIFICATION"
              size="small"
              type="segment"
              :tabs-padding="10"
              justify-content="space-evenly"
              style="background: transparent !important"
              class="text-white"
            >
              <n-tab-pane name="IDENTIFICATION" tab="IDENTIFICATION" class="text-white mt-8">
                <div class="text-xs m-2 subpixel-antialiased text-white">FIRST</div>
                <n-form-item
                  class="pl-2"
                  path="first_name"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-input
                    size="small"
                    v-model:value="formRef.first_name"
                    placeholder="John/Jane"
                    style="width: 100vw"
                    class="container_base_no_rotate"
                  >
                  </n-input>
                </n-form-item>
                <div class="text-xs m-2 subpixel-antialiased text-white">LAST</div>

                <n-form-item
                  class="pl-2"
                  path="last_name"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-input
                    size="small"
                    v-model:value="formRef.last_name"
                    placeholder="Doe"
                    style="width: 100vw"
                    class="container_base_no_rotate"
                  >
                  </n-input>
                </n-form-item>
              </n-tab-pane>
              <n-tab-pane name="BIOGRAPHY" tab="BIOGRAPHY" class="text-white mt-8">
                <div class="text-xs m-2 subpixel-antialiased text-white">AGE</div>
                <n-form-item
                  class="pl-2"
                  path="age"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-date-picker
                    v-model:value="formRef.age"
                    type="date"
                    style="width: 100vw; border-radius: 100px"
                    class="container_base_no_rotate"
                  />
                </n-form-item>
                <div class="text-xs m-2 subpixel-antialiased text-white">GENDER</div>
                <n-form-item
                  class="pl-2"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-select
                    v-model:value="formRef.sex"
                    :options="options"
                    size="small"
                    clearable
                    style="width: 100vw"
                    class="container_base_no_rotate"
                    label="Gender"
                    placement="top"
                  />
                </n-form-item>
                <div class="text-xs m-2 subpixel-antialiased text-white">CHARACTER BACKSTORY</div>
                <n-form-item
                  class="pl-2"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-input
                    v-model:value="value"
                    type="textarea"
                    size="small"
                    style="width: 100vw"
                    class="container_base_no_rotate"
                  />
                </n-form-item>
                <n-form-item
                  class="pl-2"
                  label="USERNAME"
                  path="internet_handle"
                  size="small"
                  label-width="auto"
                >
                  <n-input
                    size="small"
                    v-model:value="formRef.internet_handle"
                    placeholder=" (for social media in game) ** WILL BE PUBLIC **"
                    style="width: 100vw"
                    class="container_base_no_rotate"
                  >
                  </n-input>
                </n-form-item>
              </n-tab-pane>

              <n-tab-pane name="FINANCIAL" tab="FINANCIAL" class="text-white mt-8">
                <div class="text-xs m-2 subpixel-antialiased text-white">BANK PIN</div>
                <n-card
                  :bordered="false"
                  class="self-center text-center"
                  style="background: transparent !important"
                >
                  <n-input
                    key="1"
                    size="small"
                    style="width: 10%"
                    class="m-3"
                    placeholder="*"
                    path="pin"
                    v-model:value="formRef.pin1"
                    maxlength="1"
                  />
                  <n-input
                    key="2"
                    size="small"
                    style="width: 10%"
                    class="m-3"
                    placeholder="*"
                    v-model:value="formRef.pin2"
                    path="pin"
                    maxlength="1"
                  />
                  <n-input
                    key="3"
                    size="small"
                    style="width: 10%"
                    class="m-3"
                    placeholder="*"
                    v-model:value="formRef.pin3"
                    path="pin"
                    maxlength="1"
                  />
                  <n-input
                    key="4"
                    size="small"
                    style="width: 10%"
                    class="m-3"
                    placeholder="*"
                    v-model:value="formRef.pin4"
                    path="pin"
                    maxlength="1"
                  />
                </n-card>

                <n-button type="primary" block secondary strong v-on:click="checkIfRegisterReady">
                  SUBMIT
                </n-button>
                <n-button type="error" block secondary strong v-on:click="resetForm">
                  RESET
                </n-button>
              </n-tab-pane>
            </n-tabs>
          </n-card>
        </n-space>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  NButton,
  NButtonGroup,
  NDrawer,
  NDrawerContent,
  NSpace,
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NDatePicker,
  NSelect,
  NCollapse,
  NCollapseItem,
  NCard,
  NInputNumber,
  NFormItemRow,
  NTabs,
  NTabPane
} from 'naive-ui'
import axios from 'axios'
export default defineComponent({
  name: 'RegisterForm',
  components: {
    NButton,
    NButtonGroup,
    NDrawer,
    NDrawerContent,
    NSpace,
    NForm,
    NInput,
    NFormItem,
    NDivider,
    NDatePicker,
    NSelect,
    NCollapse,
    NCollapseItem,
    NCard,
    NInputNumber,
    NFormItemRow,
    NTabs,
    NTabPane
  },
  setup() {
    const formRef = ref({
      first_name: '',
      last_name: '',
      age: 0,
      sex: '',
      internet_handle: '',
      pin1: 0,
      pin2: 0,
      pin3: 0,
      pin4: 0
    })
    const active = ref(true)
    const value = ref('')
    const options = ref([
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ])
    return {
      value,
      options,
      formRef,
      active,
      rules: {
        first_name: {
          required: true,
          message: 'Please input your first name',
          trigger: 'blur'
        },
        last_name: {
          required: true,
          message: 'Please input your last name',
          trigger: 'blur'
        },
        age: {
          required: true,
          message: 'Please input your age',
          trigger: ['input', 'blur']
        },
        sex: {
          required: true
        },
        pin: {
          required: true,
          message: 'Please input your pin',
          trigger: ['input', 'blur'],
          validator: (rule: any, value: any) => {
            console.log(rule, value)
            if (typeof value != 'number') {
              return 'Pin must be a number'
            }
          }
        }
      },
      checkIfRegisterReady() {
        const f = formRef.value
        const composed = {
          first_name: f.first_name,
          last_name: f.last_name,
          age: f.age,
          sex: f.sex,
          internet_handle: f.internet_handle,
          pin: `${f.pin1}${f.pin2}${f.pin3}${f.pin4}`
        }
        axios
          .post('http://mutiny_core/++CreateCharacter', composed)
          .then((res) => {
            if (res.data === 'ok') {
              active.value = false
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      resetForm() {
        formRef.value.first_name = ''
        formRef.value.last_name = ''
        formRef.value.age = 0
        formRef.value.sex = ''
        formRef.value.internet_handle = ''
        formRef.value.pin1 = 0
        formRef.value.pin2 = 0
        formRef.value.pin3 = 0
        formRef.value.pin4 = 0
      }
    }
  }
})
</script>
