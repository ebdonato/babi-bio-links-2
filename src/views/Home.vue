<template>
    <v-main class="pa-0 bg-image">
        <LetSnow></LetSnow>

        <v-card
            class="mx-auto my-2"
            max-width="344"
            outlined
            color="transparent"
        >
            <v-img
                max-height="150"
                max-width="150"
                src="../assets/avatar.png"
                class="mx-auto mt-4 rounded-circle elevation-24"
            ></v-img>

            <v-card-title class="text-h4 justify-center font-weight-black">
                @barbaraff
            </v-card-title>

            <v-card-subtitle class="text-h5 text-center">
                Bárbara Ferreira
            </v-card-subtitle>
        </v-card>

        <v-card class="mx-0 mx-sm-16 my-2" outlined color="transparent">
            <v-card-actions v-for="(link, index) in links" :key="index">
                <v-btn
                    rounded
                    block
                    color="transparent"
                    dark
                    :href="link.url"
                    target="_blank"
                    type="a"
                    v-ripple
                    class="text-caption text-lg-h5"
                >
                    {{ link.text }}
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-btn
            color="primary"
            fab
            absolute
            bottom
            right
            v-if="logged"
            to="/admin"
        >
            <v-icon> mdi-cog </v-icon>
        </v-btn>
    </v-main>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth"
import LetSnow from "../components/LetSnow.vue"

export default {
    name: "Home",
    components: {
        LetSnow,
    },
    computed: {
        links() {
            return this.$store.getters.getLinks
        },
        logged() {
            if (firebase.auth().currentUser) {
                return true
            } else {
                return false
            }
        },
    },
}
</script>

<style>
.bg-image {
    background: var(--v-primary-base);
    background-image: linear-gradient(
        135deg,
        var(--v-primary-base) 0%,
        var(--v-secondary-base) 100%
    );
    background-image: -webkit-linear-gradient(
        to right,
        var(--v-primary-base),
        var(--v-secondary-base)
    );
    background-image: linear-gradient(
        to bottom,
        var(--v-primary-base),
        var(--v-secondary-base)
    );
}
</style>
