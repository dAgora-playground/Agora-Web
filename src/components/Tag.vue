<template>
  <div class="tag">
    <slot />
  </div>
</template>
<script>
  export default {
    name: "Tag",
  };
</script>
<style scoped lang="scss">
  .tag {
    display: inline-block;
    background: #51461a;
    border-radius: 4px;
    padding: 4px 8px;
    // margin: 0 4px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    color: #f3e2a7;
  }
</style>
