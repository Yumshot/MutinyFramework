<template>
    <div>
        <div class="block register_container" v-if="value">
            <div class="block">WELCOME TO MUTINY ROLEPLAY</div>
        <span class="block">Please create your character</span>
        <q-form ref="form" :model="model" class="form">
            <q-form-item label="First Name" prop="fname">
                <q-input v-model="model.first_name" type="text" />
            </q-form-item>
            <q-form-item label="Last Name" prop="lname">
                <q-input v-model="model.last_name" type="text" />
            </q-form-item>
            <q-form-item label="Birthday" prop="date">
                <q-date-picker v-model="model.birthdate" placeholder="Birthdate" type="date" format="MM/dd/yyyy" />
            </q-form-item>
            <q-form-item label="Sex" prop="sex">
                <q-select v-model="model.sex">
                    <q-option v-for="item in genders" :key="item" :label="item" :value="item" />
                </q-select>
            </q-form-item>
            <q-button size="small" theme="secondary" icon="q-icon-refresh-fill" v-on:click="resetForm"> Reset </q-button>
            <q-button size="small" icon="q-icon-check" v-on:click="createCharacter">Create</q-button>
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
body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: transparent !important;
}

.register_container {
    color: white;
    padding: 75px;
    width: 50%;
    height: 100%;
    margin-right: 15vw;
    transform: rotateX(-15deg) rotateY(30deg) scale(1.25, 1.05);
    overflow: hidden;
}

.register_container:before,
.register_container:after {
    content: "";
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    border: solid 1px #002025;
    transform: rotateX(-15deg) rotateY(30deg) scale(1.25, 1.05);
    pointer-events: none; 
}

.register_container:before {
    border-width: 2px;
    top: -2.5px;
    bottom: -2.5px;
    left: -2.5px;
    right: -2.5px;
}


.form {
  border-radius: 40px;
  padding-left :20px;
  padding-right :20px;
  padding-top :20px;
  padding-bottom :20px;
    
}
</style>
