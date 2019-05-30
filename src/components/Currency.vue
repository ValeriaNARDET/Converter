<template>
  <div class="currency">
    <p>{{ value }}</p>
      <div class="radio-group">
        <label>
          <input
            type="radio" 
            name="operation" 
            value="sale"
            :checked="operationType === 'sale' || true"
            @change="changeOperationType"
          >
          Sale
        </label>
        <label>
          <input
            type="radio" 
            name="operation" 
            value="buy"
            :checked="operationType === 'buy' || false"
            @change="changeOperationType"
          >
          Buy
        </label>

        <div v-for="(c, i) in cur" :key="i" class="" >
          <label class="">
            <span v-text="c.ccy + ' to ' + c.base_ccy"/>
            <input 
              type="radio"
              class=""
              name="currency"
              :value="c.ccy + ' to ' + c.base_ccy"
              :checked="i === chosenOperation"
              :key="i"
              @change="changeCurrency(c, i)"
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
      // isSale: false,
      saleMultiplier: 0,
      buyMultiplier: 0,
      baseCurrency: '',
      chosenOperation: null,
      operationType: 'sale'
    }
  },
  created() {
    this.getCurrencies()
    this.checkOperations()
    this.getMultipliers()
  },
  computed:
    mapState([
    'currencies'
  ]),
  methods: {
    changeOperationType (event, value) {
      this.operationType = event.target.value
      this.tryStore('opType', this.operationType)
      // this.isSale = operation ? 1 : 0
    },
    changeCurrency (c, i) {
      this.saleMultiplier = c.sale
      this.buyMultiplier = c.buy
      this.baseCurrency = c.base_ccy
      this.tryStore('sale', c.sale)
      this.tryStore('buy', c.buy)
      this.tryStore('base', c.base_ccy)
      this.tryStore('usersChoise', i)
    },
    checkOperations () {
      this.chosenOperation = this.tryRestore('usersChoise') || null
      this.operationType = this.tryRestore('opType') || 'sale'
    },
    getCurrencies () {
      this.$store.dispatch('getCurrencies')
      this.cur = Object.assign({}, this.$store.state.currencies)
      },
    getMultipliers () {
      this.saleMultiplier = this.tryRestore('sale') || 0
      this.buyMultiplier = this.tryRestore('buy') || 0
      this.baseCurrency = this.tryRestore('base') || ''
    },
    goToResultPage () {
      const moneyAmount = this.calculateResult()
      const procedure = this.operationType
      const props = {moneyAmount, procedure}
      this.$router.push({name: "result", params: {converterResult: props}})
    },
    calculateResult () {
      const multiplier = this.operationType === 'sale' ? this.saleMultiplier : this.buyMultiplier
      const result = this.value*multiplier
      return result.toFixed(2) + this.baseCurrency
    },
    goBack () {
      this.$router.push({name: "converter", params: {value: this.value}})
    },
    tryStore (key, value) {
      try {
        localStorage.setItem(key, value)
      } catch (error) {
        console.log('Local storage unavailable')
      }
    },
    tryRestore (key) {
      try {
        return localStorage.getItem(key)
      } catch (error) {
        console.log('Local storage unavailable')
        return null
      }
    },
  }
}
</script>

<style scoped lang="scss">
</style>
