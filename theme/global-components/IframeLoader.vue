<template>
  <div class="iframe-loader">
    <iframe
      v-show="loaded"
      width="100%"
      height="100%"
      :src="src"
      frameborder="0"
      allowfullscreen="true"
      allowtransparency="true"
      ref="iframeLoader"
      @load="onLoad"
    ></iframe>
    <content-loader
      v-if="!loaded"
      :height="350"
      primaryColor="#fcfcfc"
      secondaryColor="#ecebeb"
      preserveAspectRatio="none"
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
      loaded: false
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log(this.$attrs)
  },
  methods: {
    onLoad() {
      this.loaded = true
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
