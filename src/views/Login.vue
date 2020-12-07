<template>
    <v-main class="bg-image">
        <Topbar></Topbar>
        <v-form v-model="valid" @submit.prevent="login">
            <v-card class="mx-auto my-6" max-width="344" color="secondary">
                <v-card-text>
                    <p class="text-h3 text--primary">Entrar</p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            ref="email"
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="showPassword ? 'text' : 'password'"
                            label="Senha"
                            @click:append="showPassword = !showPassword"
                            required
                        ></v-text-field>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-btn text x-small @click="resetPassword">
                        Redefinir Senha
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text type="submit"> Entrar </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-main>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"

import Topbar from "../components/Topbar.vue"

export default {
    name: "Login",
    components: { Topbar },
    data() {
        return {
            valid: false,
            emailRules: [
                (v) => !!v || "Obrigatório",
                (v) => /.+@.+/.test(v) || "E-mail não válido",
            ],
            passwordRules: [
                (v) => !!v || "Obrigatório",
                (v) =>
                    v.length >= 6 || "A senha deve ter pelo menos 6 caracteres",
            ],
            email: "",
            password: "",
            showPassword: false,
        }
    },
    methods: {
        login() {
            if (this.valid) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        this.$router.push("/admin")
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            }
        },
        resetPassword() {
            if (!this.$refs.email.hasError) {
                firebase
                    .auth()
                    .sendPasswordResetEmail(this.email)
                    .then(() => {
                        alert("E-mail para redefinição da senha enviado.")
                    })
                    .catch((err) => {
                        alert(err.message)
                    })
            }
        },
    },
}
</script>

<style>
</style>
