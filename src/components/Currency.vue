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
        <button
          class="button"
          @click="goBack"
        >
          Back
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
      this.baseCurrency = c.base_ccy
    },
    getCurrencies () {
      this.$store.dispatch('getCurrencies')
      this.cur = Object.assign({}, this.$store.state.currencies)
      },
    goToResultPage () {
      const moneyAmount = this.calculateResult()
      const procedure = this.isSale ? 'sale' : 'buy'
      const props = {moneyAmount, procedure}
      this.$router.push({name: "result", params: {converterResult: props}})
    },
    calculateResult () {
      const multiplier = this.isSale ? this.saleMultiplier : this.buyMultiplier
      const result = this.value*multiplier
      return result.toFixed(2) + this.baseCurrency
    },
    goBack () {
      this.$router.push({name: "converter", params: {value: this.value}})
    }
  }
}
</script>

<style scoped lang="scss">
</style>
