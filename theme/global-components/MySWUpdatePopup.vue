<template>
  <SWUpdatePopup>
    <div
      slot-scope="{ enabled, reload, message, buttonText }"
      class="my-sw-update-popup">
      {{ message }}<br>
      <button @click="reload">{{ buttonText }}</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue';

export default {
	name: 'MySWUpdatePopup',
	components: {SWUpdatePopup}
};
</script>

<style>
.my-sw-update-popup {
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 10px;
  border: 5px solid #3eaf7c;
  background-color: #fff;
  font-size: 20px;
  text-align: right;
}

.my-sw-update-popup button {
  border: 1px solid #fefefe;
}
</style>
