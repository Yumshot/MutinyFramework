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
        <n-space vertical size="small" style="padding: 30px">
          <n-divider title-placement="right"> Name </n-divider>
          <n-form-item
            label="First"
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
          <n-form-item
            label="Last"
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
          <n-divider title-placement="left"> Bio </n-divider>
          <n-form-item
            label="Age"
            path="user.age"
            size="small"
            label-align="left"
            label-placement="left"
            label-width="auto"
          >
            <n-date-picker
              v-model:value="formValue.user.age"
              type="date"
              style="width: 100vw"
              class="container_base_no_rotate"
            />
          </n-form-item>
          Gender
          <n-form-item size="small" label-align="left" label-placement="left" label-width="auto">
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
          <n-form-item size="small" label-align="left" label-placement="left" label-width="auto">
            <n-input
              v-model:value="value"
              type="textarea"
              placeholder="Character Backstory"
              size="small"
              style="width: 100vw"
              class="container_base_no_rotate"
            />
          </n-form-item>
          <n-form-item label="Username" path="user.internet_handle" size="small" label-width="auto">
            <n-input
              size="small"
              v-model:value="formValue.user.internet_handle"
              placeholder=" (for social media in game)"
              style="width: 100vw"
              class="container_base_no_rotate"
            >
            </n-input>
          </n-form-item>
        </n-space>
      </n-form>
      <template #footer>
        <n-space justify="center">
          <n-button type="primary">Register</n-button>
          <n-button type="error">Reset</n-button>
        </n-space>
      </template>
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
  NSelect
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
    NSelect
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
          internet_handle: ''
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
