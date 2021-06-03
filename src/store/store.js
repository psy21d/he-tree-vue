import { createStore } from 'vuex'
import { commentaries } from '@/mock/commentaries.js'

let hashFromArray = (arr) => {
  let hash = {}
  arr.forEach(item => hash[item.id] = item)
  return hash
}

let arrayFromHash = (hash) => {
  let arr = []
  Object.keys(hash).forEach(key => {
    arr.push(hash[key])
  })
  return arr
}

export const store = createStore({
  state () {
    return {
      commentaries,
      hash: hashFromArray(commentaries)
    }
  },
  mutations: {
    updateCommentariesFromHash(state) {
      state.commentaries = arrayFromHash(state.hash)
    },
    addCommentary (state, commentary) {
      state.hash[commentary.id] = commentary
      this.commit('updateCommentariesFromHash')
    },
    removeCommentary (state, commentary) {
      state.hash[commentary.id] = undefined
      delete state.hash[commentary.id]
      this.commit('updateCommentariesFromHash')
    },
    editCommentary (state, commentary) {
      state.hash[commentary] = commentary
      this.commit('updateCommentariesFromHash')
    },
  },
  actions: {
    addCommentary (state, commentary) {
      state.commit('addCommentary', commentary)
    },
    removeCommentary (state, commentary) {
      state.commit('removeCommentary', commentary)
    } 
  }
})