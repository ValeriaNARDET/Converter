<template>
  <div class="currency">
    <p>{{ value }}</p>
      <div class="radio-group">
        <label>
          <input
            type="radio" 
            name="operation" 
            value="sale"
            checked
            @change="changeOperationType"
          >
          Sale
        </label>
        <label>
          <input
            type="radio" 
            name="operation" 
            value="buy"
            @change="changeOperationType"
          >
          Buy
        </label>

        <div
          v-for="(c, i) in cur"
          :key="i"
          class=""
        >
          <label class="">
            <span v-text="c.ccy + ' to ' + c.base_ccy"/>
            <input 
              type="radio"
              class=""
              name="currency"
              :value="c.ccy + ' to ' + c.base_ccy"
              @change="changeCurrency(c)"
            >
          </label>
        </div>

        <button
          class="button"
          @click="goToResultPage"
        >
          Exchange
        </button>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Currency',
  props: {
    value: { type: Number, default: 0 }
  },
  data() {
    return {
      result: '',
      isSale: false,
      saleMultiplier: 0,
      buyMultiplier: 0
    }
  },
  created() {
    this.getCurrencies()   
  },
  computed:
    mapState([
    'currencies'
  ]),
  methods: {
    changeOperationType (event) {
      const operation = event.target.value
      this.isSale = operation ? 1 : 0
    },
    changeCurrency (c) {
      this.saleMultiplier = c.sale
      this.buyMultiplier = c.buy
    },
    getCurrencies () {
      this.$store.dispatch('getCurrencies')
      this.cur = Object.assign({}, this.$store.state.currencies)
    },
    goToResultPage () {
      this.calculateResult()
      this.$router.push({name: "result", params: {result: this.result}})
    },
    calculateResult () {
      const multiplier = this.isSale ? this.saleMultiplier : this.buyMultiplier
      this.result = this.value*multiplier
    }
  }
}
</script>

<style scoped lang="scss">
</style>
