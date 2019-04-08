<template>
  <form>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <input>
    <input>
  </form>
</template>

<script>
import requireLogin from '@/mixins/require-login'

export default {
  components: {},
  mixins: [requireLogin],
  transition: 'bottom',
  data() {
    return {
      isSubmitting: false
    }
  }
}
</script>
