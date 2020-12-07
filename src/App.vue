<template>
    <v-app>
        <router-view />

        <v-footer color="var(--color-secondary)" padless>
            <v-card-text class="pb-0 pt-12 text-caption text-center skyline">
                <br />
                {{ new Date().getFullYear() }}
            </v-card-text>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: "App",
    mounted() {
        this.$store.dispatch("loadLinksFromFirebase")
        this.$store.dispatch("loadSettingFromFirebase")
    },
}
</script>

<style>
:root {
    --color-primary: #673ab7;
    --color-secondary: #f8bbd0;
    --color-accent: #681270;
}

.skyline {
    color: var(--color-secondary);
    background: url(./assets/skyline.png);
    background-size: contain;
    background-position: center bottom;
}
</style>
