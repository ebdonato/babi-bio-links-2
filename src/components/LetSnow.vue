<template>
    <let-it-snow v-bind="snowConf" :show="showEffect"></let-it-snow>
</template>

<script>
export default {
    name: "LetSnow",
    data() {
        return {
            showEffect: false,
        }
    },
    computed: {
        snowConf() {
            return {
                windPower: 1,
                speed: 0,
                interaction: false,
                count: 12,
                size: 8,
                opacity: 1,
                images: this.floatingFiles,
            }
        },
        floatingFiles() {
            return this.$store.getters.getFloatingFiles
        },
    },
    mounted() {
        setTimeout(() => {
            if (this.floatingFiles.length > 0) {
                this.showEffect = true
            }
        }, 3000)
    },
}
</script>

<style>
</style>
