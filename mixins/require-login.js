export default {
  async mounted() {
    const isLoggedIn = await this.$store.dispatch('currentUser/refresh')
    if (!isLoggedIn) {
      this.$router.replace('/login')
    }
  }
}
