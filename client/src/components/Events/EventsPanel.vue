<template>
  <panel title="Events">
    <v-btn v-if="$store.state.isUserLoggedIn"
      slot="action"
      :to="{
        name: 'events-create'
      }"
      class="cyan accent-2"
      light
      medium
      absolute
      right
      middle
      fab>
      <v-icon>add</v-icon>
    </v-btn>

    <div 
      v-for="event in events"
      class="event"
      :key="event.id">

      <v-layout>
        <v-flex xs6>
          <div class="event-title">
            {{event.title}}
          </div>
          <div class="event-artist">
            {{event.owner}}
          </div>
          <div class="event-genre">
            {{event.genre}}
          </div>

          <v-btn
            dark
            class="cyan"
            :to="{
              name: 'event', 
              params: {
                eventId: event.id
              }
            }">
            View
          </v-btn>
        </v-flex>

        <v-flex xs6>
          <img class="event-image" :src="event.eventImageUrl" />
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import EventsService from '@/services/EventsService'

export default {
  data () {
    return {
      events: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.events = (await EventsService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
.event {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.event-title {
  font-size: 30px;
}

.event-artist {
  font-size: 24px;
}

.event-genre {
  font-size: 18px;
}

.event-image {
  width: 70%;
  margin: 0 auto;
}
</style>
