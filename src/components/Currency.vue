<template>
  <div class="currency">
    <p>{{ value }} {{ asset || 'USD' }}</p>

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
    </div>

    <div class="radio-group" v-if="Object.keys(cur).length > 0">
      <div v-for="(c, i) in cur" :key="i">
        <label class="">
          <span v-text="c.ccy + ' to ' + c.base_ccy"/>
          <input 
            type="radio"
            class=""
            name="currency"
            :value="c.ccy + ' to ' + c.base_ccy"
            :checked="i === chosenOperation"
            :key="i"
            @change="setMultipliers(c, i)"
          >
        </label>
      </div>
    </div>
    <div v-else>
      <p>Please turn back to the previous page and then come here again</p>
      <p>[Sorry, but it is my bug]</p>
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
      cur: '',
      saleMultiplier: 0,
      buyMultiplier: 0,
      baseAsset: '',
      asset: '',
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
    },
    setMultipliers (c, i) {
      this.saleMultiplier = c.sale
      this.buyMultiplier = c.buy
      this.baseAsset = c.base_ccy
      this.asset = c.base
      this.tryStore('sale', c.sale)
      this.tryStore('buy', c.buy)
      this.tryStore('base', c.base_ccy)
      this.tryStore('asset', c.base)
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
      this.baseAsset = this.tryRestore('base') || ''
      this.asset = this.tryRestore('asset') || ''
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
      return result.toFixed(2) + this.baseAsset
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
.radio-group {
  margin: 15px;
}
</style>
