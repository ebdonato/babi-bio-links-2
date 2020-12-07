<template>
    <v-main class="bg-admin">
        <v-toolbar dense>
            <v-toolbar-title>Administração</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon to="/">
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn icon @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card
            v-if="!editing.mode"
            color="transparent"
            outlined
            class="mx-auto my-6"
            max-width="344"
        >
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="var(--color-secondary)"
                    class="mx-auto"
                    @click="enterAddMode"
                >
                    Adicionar Link </v-btn
                ><v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <v-card
            v-if="editing.mode"
            color="transparent"
            outlined
            class="mx-auto my-6"
            max-width="344"
        >
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

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="editing.mode = false"> Cancelar </v-btn>
                <v-btn @click="confirmEditing"> Ok </v-btn>
            </v-card-actions>
        </v-card>

        <template v-else>
            <v-card
                v-for="(link, index) in links"
                :key="index"
                elevation="2"
                shaped
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
                    <v-btn icon @click="enterEditMode(index)">
                        <v-icon left> mdi-pencil </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
        <v-divider inset></v-divider>
        <v-card
            class="mx-auto my-6"
            max-width="344"
            color="transparent"
            elevation="0"
        >
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
import floatingObjectsDefaults from "@/assets/floatingObjectsDefaults"
import firebase from "firebase/app"
import "firebase/auth"

export default {
    name: "Admin",
    components: {
        LetSnow,
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
    background: var(--color-secondary);
}
</style>
