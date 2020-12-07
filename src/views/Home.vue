<template>
    <v-main class="pa-0 bg-image">
        <LetSnow></LetSnow>

        <v-img
            max-height="150"
            max-width="150"
            src="../assets/avatar.png"
            class="mx-auto mt-4 rounded-circle elevation-24"
        ></v-img>

        <div class="pa-6 text-center text-h3">
            <span class="white--text">@barbaraff</span>
        </div>
        <div class="pa-4 text-center text-h4 text--disabled">
            Bárbara Ferreira
        </div>
        <div class="my-3 mx-2 mx-md-12 px-md-12 d-flex flex-column">
            <v-btn
                v-for="(link, index) in links"
                :key="index"
                elevation="24"
                rounded
                block
                text
                color="white"
                class="my-3 align-self-center"
                :href="link.url"
                target="_blank"
                type="a"
                x-large
                v-ripple
            >
                {{ link.text }}
            </v-btn>
        </div>
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
