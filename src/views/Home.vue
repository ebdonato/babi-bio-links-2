<template>
    <v-main class="pa-0 bg-image">
        <let-it-snow v-bind="snowConf" :show="show"></let-it-snow>
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
    </v-main>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            snowConf: {
                windPower: 1,
                speed: 0,
                interaction: false,
                count: 12,
                size: 10,
                opacity: 1,
                images: [
                    "https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png",
                    //"https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png",
                    //"https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png",
                ],
            },
            show: false,
        }
    },
    computed: {
        links() {
            return this.$store.getters.getLinks
        },
    },
    mounted() {
        this.show = true
    },
}
</script>

<style>
.bg-image {
    background: var(--color-primary);
    background-image: linear-gradient(
        135deg,
        var(--color-primary) 0%,
        var(--color-secondary) 100%
    );
    background-image: -webkit-linear-gradient(
        to right,
        var(--color-primary),
        var(--color-secondary)
    );
    background-image: linear-gradient(
        to bottom,
        var(--color-primary),
        var(--color-secondary)
    );
}
</style>
