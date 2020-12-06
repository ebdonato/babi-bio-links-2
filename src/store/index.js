import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

import floatingObjectsDefaults from "@/assets/floatingObjectsDefaults"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    links: {},
    floatingObjects: []

  },
  getters: {
    getLinks: state => state.links,

    getFloatingObjects: state => state.floatingObjects,

    getFloatingFiles: state => floatingObjectsDefaults.filter(obj => state.floatingObjects.includes(obj.name)).map(obj => process.env.BASE_URL + obj.file)
  },
  mutations: {
    updateLinks: (state, payload) => {
      state.links = { ...payload }
      firebase.firestore().collection('main').doc('links').set(state.links)
    },

    updateLink: (state, payload) => {
      state.links[payload.id] = payload.link
      firebase.firestore().collection('main').doc('links').set(state.links)
    },

    deleteLink: (state, payload) => {
      firebase.firestore().collection('main').doc('links').update({ [payload]: firebase.firestore.FieldValue.delete() })

      // aqui é feita uma cópia para um novo objeto porque simplesmente usar o operador delete não ativa a reatividade do variável
      const newLinks = {}

      Object.keys(state.links).forEach(element => {
        if (element != payload) {
          newLinks[element] = state.links[element]
        }
      })

      state.links = newLinks
    },

    updateFloatingObjects: (state, payload) => {
      state.floatingObjects = payload
    }

  },
  actions: {
    deleteLink: ({ commit, state }, payload) => {
      if (payload in state.links) {
        commit('deleteLink', payload)
      }
    },

    setLink: ({ commit }, payload) => {
      commit('updateLink', payload)
    },

    setLinks: ({ commit }, payload) => {
      commit('updateLinks', payload)
    },

    loadLinksFromFirebase: ({ commit }) => {
      firebase.firestore().collection('main').doc('links').get()
        .then(doc => {
          if (doc.exists) {
            commit('updateLinks', doc.data())
          }
        })
        .catch(console.error)
    },

    loadSettingFromFirebase: ({ commit }) => {
      firebase.firestore().collection('main').doc('settings').get()
        .then(doc => {
          if (doc.exists) {
            commit('updateFloatingObjects', doc.data().floatingObjects)
          }
        })
        .catch(console.error)
    },

    setFloatingObjects: ({ commit }, payload) => {
      commit('updateFloatingObjects', payload)
      firebase.firestore().collection('main').doc('settings').set({
        floatingObjects: payload
      })
    }

  },

  modules: {
  }
})
