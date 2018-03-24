<template>
  <nav class="page-nav">
    <a class="page-prev" href="">&lt; PREV</a>
    <a class="page-number is-active" href="return false">1</a>
    <a class="page-number" href="">2</a>
    <a class="page-next" href="">NEXT > </a>
  </nav>
</template>

<script>
export default {
  name: 'e-pagination'
}
</script>

<style lang="scss" scoped>
.page-nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  a {
    position: relative;
    font-family: 'Oswald-Regular';
    color: #aaa;
    font-size: torem(20px);
    margin-right: 10px;

    &:hover {
      &::before {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      content: '';
      width: 100%;
      height: 2px;
      background: #ccc;
      transition: all 0.15s ease-in;
      opacity: 0;
      transform: translate3d(0, 2px, 0);
    }
  }
}
</style>
