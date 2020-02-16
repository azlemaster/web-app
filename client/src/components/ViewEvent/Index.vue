<template>
  <div class="event-panel">
    <v-layout>
      <v-flex xs6>
        <event-metadata :event="event" />
      </v-flex>

      <v-flex xs6 class="ml-2">
        <description :event="event" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Description from './Description'
import EventMetadata from './EventMetadata'
import EventsService from '@/services/EventsService'
import EventHistoryService from '@/services/EventHistoryService'

export default {
  data () {
    return {
      event: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    const eventId = this.route.params.eventId
    this.event = (await EventsService.show(eventId)).data

    if (this.isUserLoggedIn) {
      EventHistoryService.post({
        eventId: eventId
      })
    }
  },
  components: {
    EventMetadata,
    Description
  }
}
</script>

<style scoped>
</style>
