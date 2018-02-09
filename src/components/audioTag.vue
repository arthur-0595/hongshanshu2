<template>
  <div>
    <audio src="" id="audio" autoplay="autoplay"></audio>
  </div>
</template>

<script>
  export default {
    name: 'audio-tag',
    components: {},
    data() {
      return {
        audioSrc: ''
      }
    },
    methods: {
      fnAudioPalyer(url_) {
        let audio = document.querySelector('#audio');
        audio.src = this.$url.url2 + url_;
      }
    },
    mounted() {
    },
    created() {
      this.$bus.on('audioPlayer', (url_) => {
        this.fnAudioPalyer(url_);
      });
    },
    beforeDestroy() {
      this.$bus.off('audioPlayer');
    }
  }
</script>

<style scoped>

</style>
