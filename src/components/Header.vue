<template>
  <div class="header">
    <span class="icon-back" @click="goBack"></span>
    <h2>
      {{title}}
    </h2>
    <span class="icon-right"></span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    right
  },
  data () {
    return {
      goBack() {
        this.$emit('goBack')
      }
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
