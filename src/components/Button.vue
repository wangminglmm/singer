<template>
  <div class="button" :class="type" @click="handleClick">
    <span class="icon"></span><slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: String
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/css/variable';
.button{
  width: torem(400);
  height: torem(120);
  line-height: torem(120);
  border-radius: torem(120);
  text-align: center;
  font-size: torem(50);
  &.lead-singer{
    width: torem(400);
    height: torem(120);
    line-height: torem(120);
    background-color: rgb(255, 113, 74);
    box-shadow: 0px torem(14) 10px 0px rgba(85, 65, 162, 0.4),inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  &.publish{
    color: #84560d;
    background-color: rgb(255, 235, 68);
    box-shadow: 0px torem(14) 10px 0px rgba(85, 65, 162, 0.4),inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.2);
  }
}
</style>
