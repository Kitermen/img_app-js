<template>
    <div>Jak chcesz się zalogować to wpisz w url przeglądarki: http://localhost:5173/login ^^</div>
    <div class="login-container">
        <div>
            <FloatLabel>
                <InputText id="username" v-model="username" />
                <label for="username">Name</label>
            </FloatLabel>
        </div>
    
        <div>
            <FloatLabel>
                <InputText id="username2" v-model="username2" />
                <label for="username2">Lastname</label>
            </FloatLabel>
        </div>
    
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

        <button @click="register">Register</button>
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

export default {
    data() {
        return {
            username: "",
            username2: "",
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
        async register(){
            this.token = null;
            this.failure = null;

            const headers = {
                "Content-Type": "application/json"
            }

            let obj = {
                name: this.username,
                lastName: this.username2,
                email: this.email,
                password: this.pass
            }
            console.log("Username:", this.username);
            console.log("Username2:", this.username2);
            console.log("Email:", this.email);
            console.log("Password:", this.pass);

            console.log(obj);
            let response = await post("http://localhost:3000/api/user/register", obj, headers);
            console.log(response);

                this.username = null;
                this.username2 = null;
                this.email = null;
                this.pass = null;
            if(response.token){
                this.token = response.token;
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

