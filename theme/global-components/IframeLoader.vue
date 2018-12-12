<template>
  <div class="iframe-loader">
    <transition
        enter-active-class="animated tada"
        leave-active-class="animated fadeOut">
      <iframe
          v-if="loaded"
          width="100%"
          height="100%"
          :src="src"
          frameborder="0"
          allowfullscreen="true"
          allowtransparency="true"
          ref="iframeLoader"
          @load="onLoad"
          @error="onError"></iframe>
    </transition>
    <content-loader
      v-if="showLoading"
      :height="350"
      :speed="1"
      primaryColor="#fcfcfc"
      secondaryColor="#ecebeb"
    >
      <circle cx="30" cy="30" r="30"/>
      <rect x="75" y="13" rx="4" ry="4" width="100" height="13"/>
      <rect x="75" y="37" rx="4" ry="4" width="50" height="8"/>
      <rect x="0" y="70" rx="5" ry="5" width="400" height="400"/>
    </content-loader>

  </div>
</template>

<script>
export default {
  name: 'iframe-loader',
  data() {
    return {
      loaded: false,
      netError: false,
      showLoading: true
    }
  },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.loadIframe()
  },
  methods: {
    loadIframe(src = this.src) {
      if (!src) {
        console.error('Please provide the \'src\' for the <iframe-loader> ')
        return
      }
      const iframe = document.createElement('iframe')
      iframe.src = src
      iframe.style.display = 'none'
      iframe.onload = () => {
        this.loaded = true
        this.netError = false
        document.body.removeChild(iframe)
      }
      iframe.onerror = () => {
        this.loaded = false
        this.showLoading = false
        this.netError = true
        document.body.removeChild(iframe)
      }
      document.body.appendChild(iframe)
    },
    onLoad() {
      console.log('iframe onload')
      // 即使 iframe loaded 也想使衔接更加自然
      setTimeout(() => {
        this.showLoading = false
        this.netError = false
      }, 200)
    },
    onError() {
      this.showLoading = false
      this.netError = true
      this.loaded = false
    }
  }
}
</script>

<style>
.iframe-loader {
  overflow: hidden;
  height: 600px;
  margin: 10px auto;
  border-radius: 10px;
}
</style>
