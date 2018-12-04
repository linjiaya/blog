<template>
  <article class="abstract-item">
    <router-link :to="`/post/${id}`">
      <a href="" class="abstract-title">
        <e-svg name="stick" v-if="stick"></e-svg>
        <span>{{title}}</span>
      </a>
    </router-link>
    <p class="abstract-content">{{meta}}</p>
    <div class="abstract-post-meta">
      <div class="abstract-date">
        <e-svg name="date" :size="20"></e-svg>
        <span class="abstract-time">{{date}}</span>
      </div>
      <div class="abstract-tags">
        <e-tag v-for="tag in tags" :key="tag">
          <router-link :to="`/?tag=${tag}`">
            {{'#' + tag}}
          </router-link>
        </e-tag>
      </div>
    </div>
  </article>
</template>

<script>
import eSvg from './e-svg';
import eTag from './e-tag';
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
		},
		id: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		meta: {
			type: String
		},
		date: {
			type: Number,
			default: Number(new Date())
		},
		tags: {
			type: Array,
			default() {
				return [];
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.abstract-item {
  padding: torem(16px) 0 torem(8px) 0;
  border-bottom: 1px dashed rgba(#000, 0.2);

  .abstract-title {
    padding-bottom: torem(8px);
    color: #787878;
    line-height: torem(40px);

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
    font-weight: lighter;
    line-height: torem(26px);
    word-break: break-word;
  }

  .abstract-time {
    padding: 0 0 0 torem(4px);
  }

  .abstract-post-meta {
    display: flex;
    height: 32px;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: torem(8px) 0 0 0;
    color: #aaa;
    font-family: 'Oswald-Regular';
  }
}
</style>
