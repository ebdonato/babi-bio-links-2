<template>
    <v-main class="pa-3 bg-admin">
        <div class="text-h3 text-center">Admin</div>
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
                    color="var(--color-primary)"
                    class="mx-auto"
                    text
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
                maxlength="40"
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
    </v-main>
</template>

<script>
export default {
    name: "Admin",
    data() {
        return {
            dialog: false,
            editing: {
                mode: false,
                ID: null,
                link: {},
            },
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
    },
}
</script>

<style>
.bg-admin {
    background: var(--color-secondary);
}
</style>
