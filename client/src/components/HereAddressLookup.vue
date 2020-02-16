<template>
  <v-layout>
    <v-text-field
          label="Street"
          required
          :rules="[required]"
          v-model="street"
    ></v-text-field>
    <v-text-field
          label="city"
          required
          :rules="[required]"
          v-model="city"
    ></v-text-field>
    <v-text-field
          label="state"
          required
          :rules="[required]"
          v-model="state"
    ></v-text-field>
    <v-text-field
          label="postcode"
          required
          :rules="[required]"
          v-model="postcode"
    ></v-text-field>
    <v-text-field
          label="country"
          required
          :rules="[required]"
          v-model="country"
    ></v-text-field>
  </v-layout>
</template>
<script>
  export default {
    name: 'HereAddressLookup',
    data () {
      return {
        street: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        error: null,
        required: (value) => !!value || 'Required.'
      }
    },
    props: {
      query: String
    },
    watch: {
      query: function (value) {
        fetch(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=1ZRKH9KT9Pp92wxwUyT3m0iPudSL0rvlLmvaFunOtRY&query=${value}`)
          .then(result => result.json())
          .then(result => {
            if (result.suggestions && result.suggestions.length > 0) {
              if (result.suggestions[0].address.houseNumber && result.suggestions[0].address.street) {
                this.street = result.suggestions[0].address.houseNumber + ' ' + result.suggestions[0].address.street
              } else {
                this.street = ''
              }
              this.city = result.suggestions[0].address.city ? result.suggestions[0].address.city : ''
              this.state = result.suggestions[0].address.state ? result.suggestions[0].address.state : ''
              this.postcode = result.suggestions[0].address.postalCode ? result.suggestions[0].address.postalCode : ''
              this.country = result.suggestions[0].address.country ? result.suggestions[0].address.country : ''
            } else {
              this.street = ''
              this.city = ''
              this.state = ''
              this.postalCode = ''
              this.country = ''
            }
          }, error => {
            console.error(error)
          })
      }
    },
    methods: {
      validate: function (query) {
        return fetch(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=1ZRKH9KT9Pp92wxwUyT3m0iPudSL0rvlLmvaFunOtRY&searchtext=${query}`)
            .then(result => result.json())
            .then(result => {
              if (result.Response.View.length > 0 && result.Response.View[0].Result.length > 0) {
                let data = result.Response.View[0].Result[0]
                return data
              }
            }, error => {
              console.error(error)
            })
      }
    }
  }
</script>
<style scoped>
.information {
  width: 50%;
  margin: 15px 0px;
}
.information input {
  width: 100%;
  padding: 5px;
  margin: 5px 0px;
}
</style>