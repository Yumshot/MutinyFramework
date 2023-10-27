<template>
    <div class="overlay_register">
        <div class="register_container" v-if="value">
            <div class="block header_text">WELCOME TO MUTINY</div>
            <q-form ref="form" :model="model" class=" block form">
                <q-form-item prop="fname" style="color: whitesmoke;">
                    <span>First Name</span>
                    <q-input v-model="model.first_name" type="text" />
                </q-form-item>
                <q-form-item prop="lname" style="color: whitesmoke;">
                    <span>Last Name</span>
                    <q-input v-model="model.last_name" type="text" />
                </q-form-item>
                <q-form-item prop="date" style="color: whitesmoke;">
                    <span>Birthday</span>
                    <q-date-picker v-model="model.birthdate" placeholder="Birthdate" type="date" format="MM/dd/yyyy" />
                </q-form-item>
                <q-form-item prop="sex" style="color: whitesmoke;">
                    <span>Gender</span>
                    <q-select v-model="model.sex">
                        <q-option v-for="item in genders" :key="item" :label="item" :value="item" />
                    </q-select>
                </q-form-item>
                <q-form-item style="margin: 10px;">
                    <q-button size="small" icon="q-icon-refresh-fill" v-on:click="resetForm" style="float: right;"> Reset
                    </q-button>
                </q-form-item>
                <q-button size="small" icon="q-icon-check" v-on:click="createCharacter" fullWidth
                    style="background:#2c2d44;background-image:-moz-linear-gradient(45deg,#3f3251 2%,#002025 100%);background-image:-webkit-linear-gradient(45deg,#3f3251 2%,#002025 100%);background-image:linear-gradient(45deg,#3f3251 2%,#002025 100%);">Create</q-button>
            </q-form>

        </div>
    </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';

export default {
    props: {
        identifiers: {}
    },
    setup(props: any) {
        const value = ref(true);
        const genders = ["Male", "Female"]
        let model = ref({
            first_name: "",
            last_name: "",
            birthdate: null,
            sex: "",
        });




        function checkValues() {
            if (model.value.first_name.length <= 1 || model.value.birthdate === null || model.value.sex === null || model.value.last_name.length <= 1) {
                return false
            } else {
                return true
            }
        }

        function resetForm() {
            model = ref({
                first_name: "",
                last_name: "",
                birthdate: null,
                sex: "",
            });
        }

        function createCharacter() {
            const identifiers = props.identifiers;
            if (!checkValues()) {
                return console.log("SOMETHING IS MISSING")
            } else {
                console.log("AXIOS : ", identifiers)
                axios.post("http://mutiny_core/create_user_credentials", {
                    data: {
                        first_name: model.value.first_name,
                        last_name: model.value.last_name,
                        birthdate: model.value.birthdate,
                        sex: model.value.sex,
                    },
                    identifiers: identifiers
                })

            }
        }

        return { value, model, genders, createCharacter, resetForm };
    }
};
</script>

<style scoped lang="scss">
@import url('../assets/register_view.scss');
</style>
