<template>
    <div>Jak chcesz się zarejestrować to wpisz w url przeglądarki: http://localhost:5173/register ^^</div>
    <div class="login-container">
        <div>
            <FloatLabel>
                <InputText id="email" v-model="email" />
                <label for="email">Email</label>
            </FloatLabel>
        </div>
    
        <div class="card flex justify-content-center">
            <FloatLabel>
                <Password id="pass" v-model="pass" toggleMask />
                <label for="pass">Password</label>
            </FloatLabel>
        </div>

        <button @click="login">Login</button>
    </div>

    <div style="margin-top: 50px;" v-if="token">
        Teraz wklej ten link do przeglądarki aby potwierdzić swoje konto:<br> http://localhost:3000/api/user/confirm/<div>{{ token }}</div>
    </div>
    <div style="margin-top: 50px;" v-if="failure">
        <div>{{ failure }}</div>
    </div>
  </template>

<script>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import { post } from '@/api';
import { useCounterStore } from '@/store/store';

export default {
    data() {
        return {
            email: "",
            pass: "",
            token: "",
            failure: ""
        }
    },

    components: {
        InputText,
        FloatLabel,
        Password,
    },

    methods: {
        async login(){
            this.token = null;
            this.failure = null;

            const headers = {
                "Content-Type": "application/json"
            }

            let obj = {
                email: this.email,
                password: this.pass
            }

            console.log("Email:", this.email);
            console.log("Password:", this.pass);

            console.log(obj);
            let response = await post("http://localhost:3000/api/user/login", obj, headers);
            console.log(response);

            this.email = null;
            this.pass = null;

            if(response.token){
                this.token = response.token;
                useCounterStore.token = this.token;
                this.$router.push('/register');
            }
            else{
                this.failure = response
            }
        },
    }
}
</script>

<style>

.login-container > div{
    margin: 60px; 
    gap: 30px;
}

</style>
