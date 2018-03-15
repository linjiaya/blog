<template>
  <header class="e-header">
    <div class="read-progress"></div>
    <div class="header-sidebar-menu"><span class="arrow-right"></span></div>
    <a href="/" class="home-link">eliaztray.cn</a>
  </header>
</template>

<script>
export default {
  name: 'e-header',
  data() {
    return {
    }
  },
  // 组件挂载阶段
  mounted() {

  }
}
</script>

<style lang="scss">
.e-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: torem(56px);
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s ease-out 0s;

  &.side-bar-active {
    transform: translate3d(400px, 0, 0);
  }

  .header-sidebar-menu {
    position: absolute;
    left: 1rem;
    top: 50%;
    border: 2px solid #fff;
    width: torem(28px);
    height: torem(28px);
    transform: translate(0, -50%);
    color: #fff;
    text-align: center;
    z-index: 21;
    cursor: pointer;

    &:hover {
      background: #fff;

      .arrow-right {
        border-color: #000;
      }
    }
  }

  .arrow-right {
    // 后期换成svg吧.写一个如此的费力.东调西调的
    position: relative;
    display: inline-block;
    width: torem(10px);
    height: torem(10px);
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    border-radius: 1px;
    transform-origin: center;
    // 发现transform是从右边执行变换效果的.
    transform: translate(-2px, 2px) rotate(-45deg);
  }

  .home-link {
    position: absolute;
    top: 50%;
    right: torem(40px);
    transform: translate(0, -50%);
    font-family: "Oswald-Regular";
    font-size: torem(22px);
    color: #fff;
    cursor: pointer;

    &:hover {
      color: var(--theme-color);
    }
  }
}
</style>
