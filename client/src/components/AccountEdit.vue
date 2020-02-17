<template>
  <v-layout>
    {{this.$store.getters.getId}}
    <v-flex xs12>
      <panel title="Account Informations">
        <v-text-field
          label="City"
          required
          :rules="[required]"
          v-model="user.city"
        ></v-text-field>

        <v-text-field
          label="Description"
          multi-line
          required
          :rules="[required]"
          v-model="user.description"
        ></v-text-field>

        <v-text-field
          label="Profil image url"
          required
          :rules="[required]"
          v-model="user.profilImageUrl"
        ></v-text-field>
      </panel>
      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        dark
        class="cyan"
        @click="save">
        Save Modifications
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      user: {
        id: this.$store.getters.getId,
        email: this.$store.getters.getUserEmail,
        name: this.$store.getters.getUserName,
        city: this.$store.state.user.city,
        description: this.$store.state.user.description,
        profilImageUrl: this.$store.state.user.profilImageUrl
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.user)
        .every(key => !!this.user[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      try {
        const response = await AuthenticationService.updateAccount(this.user)
        console.log('response user: ', response.data)
        this.$store.commit('setUser', response.data)
        this.$router.push({
          name: 'user-edit'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
