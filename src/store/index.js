import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    links: {

      // 0: {
      //   url:
      //     "http://wa.me/+5527981823734?text=Olá+Bárbara,+gostaria+de+fazer+um+pedido",
      //   text: "Faça seu pedido pelo WhatsApp",
      // },
      // 1: {
      //   url: "https://www.marykay.com.br/barbaraff",
      //   text: "Visite o meu site MK!",
      // },
    }

  },
  getters: {
    getLinks: state => state.links
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
    }

  },
  modules: {
  }
})
