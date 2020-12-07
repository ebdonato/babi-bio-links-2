<template>
    <v-main class="bg-image">
        <Topbar></Topbar>
        <!-- <LetSnow></LetSnow> -->
        <v-card
            v-if="!editing.mode"
            color="transparent"
            outlined
            class="mx-auto my-6"
            max-width="344"
        >
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="mx-auto" @click="enterAddMode">
                    Adicionar Link </v-btn
                ><v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <v-card
            v-if="editing.mode"
            color="secondary"
            class="mx-auto my-6"
            max-width="344"
        >
            <v-card-title>Adicionar Link</v-card-title>

            <v-card-text>
                <v-text-field
                    label="Texto"
                    outlined
                    maxlength="35"
                    v-model="editing.link.text"
                ></v-text-field>
                <v-text-field
                    label="URL"
                    outlined
                    v-model="editing.link.url"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="editing.mode = false">
                    Cancelar
                </v-btn>
                <v-btn color="primary" @click="confirmEditing"> Ok </v-btn>
            </v-card-actions>
        </v-card>

        <template v-else>
            <v-card
                v-for="(link, index) in links"
                :key="index"
                color="secondary"
                class="mx-auto my-6"
                max-width="344"
            >
                <v-card-title>
                    {{ link.text }}
                </v-card-title>
                <v-card-text> {{ link.url }} </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-dialog v-model="dialog" persistent max-width="290">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                color="primary"
                                @click="dialog = true"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon left> mdi-delete </v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="headline">
                                Excluir link?
                            </v-card-title>
                            <v-card-text>{{ link.text }} </v-card-text>
                            <v-card-text
                                >Essa ação não poderá ser desfeita.
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="deleteLink(index)">
                                    OK
                                </v-btn>
                                <v-btn text @click="dialog = false">
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-spacer></v-spacer>
                    <v-btn icon color="primary" @click="enterEditMode(index)">
                        <v-icon left> mdi-pencil </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
        <v-divider inset></v-divider>
        <v-card class="mx-auto my-6" max-width="344" color="secondary">
            <v-card-actions>
                <v-combobox
                    v-model="floatingObjects"
                    :items="floatingObjectNames"
                    label="Objetos Flutuantes"
                    multiple
                >
                </v-combobox>
            </v-card-actions>
        </v-card>
    </v-main>
</template>

<script>
import LetSnow from "../components/LetSnow.vue"
import Topbar from "../components/Topbar.vue"
import floatingObjectsDefaults from "@/assets/floatingObjectsDefaults"
import firebase from "firebase/app"
import "firebase/auth"

export default {
    name: "Admin",
    components: {
        LetSnow,
        Topbar,
    },
    data() {
        return {
            dialog: false,
            editing: {
                mode: false,
                ID: null,
                link: {},
            },

            floatingObjectsDefaults,
        }
    },
    methods: {
        enterEditMode(ID) {
            if (ID in this.links) {
                this.editing.mode = true
                this.editing.ID = ID
                this.editing.link = { ...this.links[ID] }
            }
        },
        enterAddMode() {
            this.editing.mode = true
            this.editing.ID = Math.max(...Object.keys(this.links)) + 1
            this.editing.link = {
                text: "",
                url: "",
            }
        },
        confirmEditing() {
            this.editing.mode = false
            this.saveLinks()
        },
        deleteLink(ID) {
            this.dialog = false
            this.$store.dispatch("deleteLink", ID)
        },
        saveLinks() {
            this.$store.dispatch("setLink", {
                id: this.editing.ID,
                link: this.editing.link,
            })
        },
    },
    computed: {
        links() {
            return this.$store.getters.getLinks
        },
        floatingObjectNames() {
            return floatingObjectsDefaults.map((obj) => obj.name)
        },
        floatingObjects: {
            get() {
                return this.$store.getters.getFloatingObjects
            },
            set(value) {
                this.$store.dispatch("setFloatingObjects", value)
            },
        },
    },
    mounted() {
        this.floatingObjectsOptions = this.$store.getters.getfloatingObjectsNames
    },
}
</script>

<style>
.bg-admin {
    background: var(--v-secondary-base);
}
</style>
