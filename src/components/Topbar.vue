<template>
    <v-toolbar color="primary" dark>
        <v-btn icon to="/">
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-toolbar-title>Administração</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="logout" v-if="logged">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"

export default {
    name: "Topbar",
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace("/")
                })
        },
    },
    computed: {
        logged() {
            return firebase.auth().currentUser !== null
        },
    },
}
</script>

<style>
</style>
