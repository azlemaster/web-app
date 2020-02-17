<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Event">
        <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="event.title"
        ></v-text-field>

        <v-text-field
          label="Genre"
          required
          :rules="[required]"
          v-model="event.genre"
        ></v-text-field>

        <v-text-field
          label="Event Image Url"
          required
          :rules="[required]"
          v-model="event.eventImageUrl"
        ></v-text-field>

        <v-text-field
          label="Date of Event"
          type="date"
          required
          :rules="[required]"
          v-model="event.date"
        ></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Address" class="ml-2">
        <v-text-field
        label="Search for an address her "
        required
        v-on:input="query"
      ></v-text-field>
      <br/>
      <v-text-field
        label="Street"
        required
        :rules="[required]"
        v-model="event.street"
      ></v-text-field>
      <v-text-field
        label="city"
        required
        :rules="[required]"
        v-model="event.city"
      ></v-text-field>
     <v-text-field
        label="state"
        required
        :rules="[required]"
        v-model="event.state"
      ></v-text-field>
      <v-text-field
        label="postcode"
        required
        :rules="[required]"
        v-model="event.postcode"
      ></v-text-field>
      <v-text-field
        label="country"
        required
        :rules="[required]"
        v-model="event.country"
      ></v-text-field>     
      </panel>
      <panel title="Informations" class="ml-2">
        <v-text-field
          label="Payment Link"
          multi-line
          required
          :rules="[required]"
          v-model="event.payLink"
        ></v-text-field>

        <v-text-field
          label="Description"
          multi-line
          required
          :rules="[required]"
          v-model="event.description"
        ></v-text-field>
      </panel>

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        dark
        class="cyan"
        @click="save">
        Save Event
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import EventsService from '@/services/EventsService'

export default {
  data () {
    return {
      event: {
        title: null,
        owner: this.$store.getters.getUserName,
        genre: null,
        street: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        eventImageUrl: null,
        date: null,
        description: null,
        payLink: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.event)
        .every(key => !!this.event[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      const eventId = this.$store.state.route.params.eventId
      try {
        await EventsService.put(this.event)
        this.$router.push({
          name: 'event',
          params: {
            eventId: eventId
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
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
    },
    query: function (value) {
      fetch(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=1ZRKH9KT9Pp92wxwUyT3m0iPudSL0rvlLmvaFunOtRY&query=${value}`)
        .then(result => result.json())
        .then(result => {
          if (result.suggestions && result.suggestions.length > 0) {
            if (result.suggestions[0].address.houseNumber && result.suggestions[0].address.street) {
              this.event.street = result.suggestions[0].address.houseNumber + ' ' + result.suggestions[0].address.street
            } else if (result.suggestions[0].address.street) {
              this.event.street = result.suggestions[0].address.street
            } else {
              this.event.street = ''
            }
            this.event.city = result.suggestions[0].address.city ? result.suggestions[0].address.city : ''
            this.event.state = result.suggestions[0].address.state ? result.suggestions[0].address.state : ''
            this.event.postcode = result.suggestions[0].address.postalCode ? result.suggestions[0].address.postalCode : ''
            this.event.country = result.suggestions[0].address.country ? result.suggestions[0].address.country : ''
          } else {
            this.event.street = ''
            this.event.city = ''
            this.event.state = ''
            this.event.postcode = ''
            this.event.country = ''
          }
        }, error => {
          console.error(error)
        })
    }
  },
  async mounted () {
    try {
      const eventId = this.$store.state.route.params.eventId
      this.event = (await EventsService.show(eventId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
</style>
