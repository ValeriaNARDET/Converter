<template>
    <div class="converter">
      <p>Enter the amount to exchange:</p>
      <div class="converter-value">
        <input class="converter-input" type="number" min="0" v-model="amount">
        <span class="converter-refresh" @click="refreshInput">
          
        </span>
      </div>
      <button class="button" @click="goNextPage" amount="amount">
        next
      </button><br/>
    </div>
</template>

<script>
export default {
  name: "Converter",
  data() {
    return {
      amount: ''
    }
  },
  methods: {
    goNextPage () {
      this.$router.push({name: "currency", params: {value: +this.amount}})
    },
    refreshInput () {
      this.amount = null
    }
  }
};
</script>

<style scoped lang="scss">
.converter-input {
  font-size: 20px;
  padding: 10px 15px;
}
.converter-value {
  position: relative;
  display: inline-block;
  vertical-align: top;
}
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}
.converter-refresh {
  position: absolute;
  top: 4px;
  right: 4px;
  display: inline-block;
  height: 40px;
  width: 40px;
  background: url("../assets/refresh.png") no-repeat center center;
  background-size: cover;
}
</style>
