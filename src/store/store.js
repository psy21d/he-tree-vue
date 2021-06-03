import { createStore } from 'vuex'
import { commentaries } from '@/mock/commentaries.js'

export const store = createStore({
  state () {
    return {
      commentaries
    }
  }
})