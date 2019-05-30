<template>
    <div class="result">
      <p class="result-text">
        {{ procedureText }}
      </p>

      <button
        class="button"
        @click="goToFirstPage"
      >
        Try again
      </button>
    </div>
</template>

<script>
export default {
  name: "Converter",
  props: {
    converterResult: {}
  },
  data() {
    return {
    result: 0,
    procedure: 'sale',
      procedureText: ''
    }
  },
  created() {
    this.getResult()
    this.writeText()
  },
  methods: {
    getResult () {
      this.procedure = this.converterResult.procedure
      this.result = this.converterResult.moneyAmount
    },
    goToFirstPage () {
      this.$router.push({name: "converter"})
    },
    writeText () {
      if (this.procedure === 'sale') {
        this.procedureText = `You will receive ${this.result}`  
      } else if (this.procedure === 'buy') {
        this.procedureText = `You need for convertation ${this.result}`  
      } else {
        this.procedureText = `Something went wrong. Try again later`
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
