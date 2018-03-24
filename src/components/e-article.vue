<template>
  <article class="abstract-item">
    <a href="" class="abstract-title">
      <e-svg name="stick" v-if="stick"></e-svg>
      <span>Images</span>
    </a>
    <p class="abstract-content">This post doesn’t have a title. Make sure it’s accessible.</p>
    <div class="abstract-post-meta">
      <div class="abstract-date">
        <e-svg name="date" :size="20"></e-svg>
        <span class="abstract-time">2013/12/26</span>
      </div>
      <div class="abstract-tags">
        <e-tag>#hexo</e-tag>
        <e-tag>#hexo-theme-archer</e-tag>
      </div>
    </div>
  </article>
</template>

<script>
import eSvg from './e-svg'
import eTag from './e-tag'
export default {
  name: 'e-article',
  components: {
    eSvg,
    eTag
  },
  props: {
    stick: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.abstract-item {
  position: relative;
  padding: torem(16px) 0 torem(8px) 0;
  border-bottom: 1px dashed rgba(#000, 0.2);

  .abstract-title {
    line-height: torem(40px);
    color: #787878;
    padding-bottom: torem(8px);

    span {
      font-size: torem(28px);
      transition: color 0.1s ease-out 0s;

      &:hover {
        color: var(--theme-color);
      }
    }
  }

  .abstract-content {
    color: #9c9c9c;
    font-size: torem(16px);
    line-height: torem(26px);
    word-break: break-word;
    font-weight: lighter;
  }

  .abstract-time {
    padding: 0 0 0 torem(4px);
  }
  .abstract-post-meta {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: torem(8px) 0 0 0;
    font-family: 'Oswald-Regular';
    color: #aaa;
    height: 32px;
  }
}
</style>
