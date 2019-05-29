import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    currencies: []
  },
  actions: {
    getCurrencies ({ commit }) {
      try {
        axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
          .then(response => response.data)
          .then(currencies => {
            commit('SET_CURRENCIES', currencies)
          }
        )
      } catch (error) {
        console.log('error: ' + error)
      }
    }
  },
  mutations: {
    SET_CURRENCIES (state, currencies) {
      state.currencies = currencies
    }
  }
})
