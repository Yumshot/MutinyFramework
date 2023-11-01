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
      <n-form ref="formRef" inline :label-width="80" :model="formValue" :rules="rules" size="small">
        <n-space vertical size="small" style="padding: 10px">
          <n-divider title-placement="right" class="subpixel-antialiased"> MutinyRP </n-divider>

          <n-card embedded :bordered="false">
            <n-tabs default-value="IDENTIFICATION" size="small" justify-content="space-evenly">
              <n-tab-pane name="IDENTIFICATION" tab="IDENTIFICATION">
                <div class="text-xs m-2 subpixel-antialiased">FIRST</div>
                <n-form-item
                  class="pl-2"
                  path="user.first_name"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-input
                    size="small"
                    v-model:value="formValue.user.first_name"
                    placeholder="John/Jane"
                    style="width: 100vw"
                    class="container_base_no_rotate"
                  >
                  </n-input>
                </n-form-item>
                <div class="text-xs m-2 subpixel-antialiased">LAST</div>

                <n-form-item
                  class="pl-2"
                  path="user.last_name"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-input
                    size="small"
                    v-model:value="formValue.user.last_name"
                    placeholder="Doe"
                    style="width: 100vw"
                    class="container_base_no_rotate"
                  >
                  </n-input>
                </n-form-item>
              </n-tab-pane>
              <n-tab-pane name="BIOGRAPHY" tab="BIOGRAPHY">
                <div class="text-xs m-2 subpixel-antialiased">AGE</div>
                <n-form-item
                  class="pl-2"
                  path="user.age"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-date-picker
                    v-model:value="formValue.user.age"
                    type="date"
                    style="width: 100vw; border-radius: 100px"
                    class="container_base_no_rotate"
                  />
                </n-form-item>
                <div class="text-xs m-2 subpixel-antialiased">GENDER</div>
                <n-form-item
                  class="pl-2"
                  size="small"
                  label-align="left"
                  label-placement="left"
                  label-width="auto"
                >
                  <n-select
                    v-model:value="formValue.user.sex"
                    :options="options"
                    size="small"
                    clearable
                    style="width: 100vw"
                    class="container_base_no_rotate"
                    label="Gender"
                    placement="top"
                  />
                </n-form-item>
                <div class="text-xs m-2 subpixel-antialiased">CHARACTER BACKSTORY</div>
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
                  path="user.internet_handle"
                  size="small"
                  label-width="auto"
                >
                  <n-input
                    size="small"
                    v-model:value="formValue.user.internet_handle"
                    placeholder=" (for social media in game)"
                    style="width: 100vw"
                    class="container_base_no_rotate"
                  >
                  </n-input>
                </n-form-item>
              </n-tab-pane>

              <n-tab-pane name="FINANCIAL" tab="FINANCIAL">
                <div class="text-xs m-2 subpixel-antialiased">BANK PIN</div>
                <n-card embedded :bordered="false" class="self-center text-center">
                  <n-input
                    key="1"
                    size="small"
                    style="width: 10%"
                    class="m-3"
                    placeholder="*"
                    path="user.pin"
                    v-model="formValue.user.pin[0]"
                    maxlength="1"
                  />
                  <n-input
                    key="2"
                    size="small"
                    style="width: 10%"
                    class="m-3"
                    placeholder="*"
                    v-model="formValue.user.pin[1]"
                    path="user.pin"
                    maxlength="1"
                  />
                  <n-input
                    key="3"
                    size="small"
                    style="width: 10%"
                    class="m-3"
                    placeholder="*"
                    v-model="formValue.user.pin[2]"
                    path="user.pin"
                    maxlength="1"
                  />
                  <n-input
                    key="4"
                    size="small"
                    style="width: 10%"
                    class="m-3"
                    placeholder="*"
                    v-model="formValue.user.pin[3]"
                    path="user.pin"
                    maxlength="1"
                  />
                </n-card>
                <n-button type="primary" block secondary strong> SUBMIT </n-button>
                <n-button type="error" block secondary strong> RESET </n-button>
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
    const formRef = ref(null)
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
      formValue: ref({
        user: {
          first_name: '',
          last_name: '',
          age: 0,
          sex: '',
          internet_handle: '',
          pin: [0, 0, 0, 0]
        }
      }),
      rules: {
        user: {
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
            validator: (rule, value) => {
              console.log(rule, value)
              if (typeof value != 'number') {
                return 'Pin must be a number'
              }
            }
          }
        }
      },
      handleValidateClick(e: MouseEvent) {
        e.preventDefault()
      }
    }
  }
})
</script>
