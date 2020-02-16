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
          label="Date of Event"
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
        city: null,
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
