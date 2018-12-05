<template>
  <SWUpdatePopup>
    <div slot-scope="{ reload }" class="myPopup">
      <!-- TODO: 做一个自定义的 Notification -->
      <div class="msgSpan">{{ message }}</div>
      <div class="msgBtnDiv">
        <span class="msgBtn" @click="reload">{{ buttonText }}</span>
      </div>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue';

export default {
	name: 'MySWUpdatePopup',
	components: {SWUpdatePopup},
	data() {
		return {
			message: '有新内容',
			buttonText: '更新'
		};
	}
};
</script>

<style lang="scss">
@keyframes breathe {
  0% {
    opacity: 0.2;
  }

  100% {
    opacity: 1;
  }
}

@keyframes bounce {
  40% {
    transform: scale(1.4);
  }

  60% {
    transform: scale(0.8);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.myPopup {
  position: fixed;
  z-index: 2;
  right: 20px;
  bottom: 20px;
  width: 200px;
  height: 80px;
  padding: 10px;
  animation: breathe 2s ease-in-out infinite alternate;
  background-image: linear-gradient(to top, #434343 0%, black 100%);
  border-radius: 5px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  font-size: 20px;
  text-align: center;

  &:hover {
    animation: none;
  }

  .msgSpan {
    color: ghostwhite;

    &:hover {
      animation: bounce 0.4s linear;
    }
  }

  .msgBtnDiv {
    margin-top: 10px;

    &:hover {
      animation: bounce 0.4s linear;
    }

    .msgBtn {
      padding: 5px 10px;
      background-color: ghostwhite;
      border-radius: 20px;
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>
