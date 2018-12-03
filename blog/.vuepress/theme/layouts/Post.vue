<template>
  <div class="theme-container">
    <div class="page">
      <Content class="post-content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post'
}
</script>

<style src="prismjs/themes/prism-tomorrow.css">
/* https://github.com/PrismJS/prism/tree/master/themes */
</style>
<style lang="stylus" src="@parent-theme/styles/theme.styl">
</style>
<style lang="scss">
@import '../styles/theme.scss';
</style>

