<template>
  <transition
    class="animated">
    <slot></slot>
  </transition>
</template>

<script>
export default {
	name: 'e-transition',
	props: {
		// 根绝传入的class名,来渲染不同的transition效果
		name: {
			type: String,
			validator(val) {
				return ['slide'].indexOf(val);
			}
		},
		// 是否只是初次渲染
		appear: {
			type: Boolean,
			default: false
		}
	}
};
</script>
