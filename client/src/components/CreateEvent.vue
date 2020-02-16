<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Event Metadata">
        <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="event.title"
        ></v-text-field>

        <v-text-field
          label="Owner"
          required
          :rules="[required]"
          v-model="event.owner"
        ></v-text-field>

        <v-text-field
          label="Genre"
          required
          :rules="[required]"
          v-model="event.genre"
        ></v-text-field>

        <v-text-field
          label="City"
          required
          :rules="[required]"
          v-model="event.city"
        ></v-text-field>

        <v-text-field
          label="Event Image Url"
          required
          :rules="[required]"
          v-model="event.eventImageUrl"
        ></v-text-field>

        <v-text-field
          label="Date"
          type="date"
          required
          :rules="[required]"
          v-model="event.date"
        ></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Informations" class="ml-2">
        <v-text-field
          label="link of payment"
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

      <!--<panel title="Informations" class="ml-2">
        <HereAddressLookup :query="query"/>     
      </panel>-->

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        dark
        class="cyan"
        @click="create">
        Create Event
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import EventsService from '@/services/EventsService'
import HereAddressLookup from './HereAddressLookup'

export default {
  components: {
    HereAddressLookup
  },
  data () {
    return {
      event: {
        title: null,
        owner: null,
        genre: null,
        city: null,
        eventImageUrl: null,
        payLink: null,
        description: null,
        date: null
      },
      query: '',
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.event)
        .every(key => !!this.event[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      try {
        await EventsService.post(this.event)
        this.$router.push({
          name: 'events'
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
