<template>
  <panel :title="user.name">
    <v-layout>
      <v-flex xs12>
        <textarea
          readonly
          v-model="user.description"
        ></textarea>
        <v-btn
          dark
          class="cyan"
          :to="{
            name: 'account-edit'
          }">
          Edit Account
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <img class="user-image" :src="user.profilImageUrl" />
        <br>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'

export default {
  components: {
  },
  data () {
    console.log(this.$store.state.user)
    return {
      events: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  }
}
</script>

<style scoped>
.user-image {
  width: 70%;
  margin: 0 auto;
}

textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 200px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
