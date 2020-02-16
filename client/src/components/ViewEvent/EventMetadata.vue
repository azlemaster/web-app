<template>
  <panel title="Event">
    <v-layout>
      <v-flex xs6>
        <div class="event-title">
          {{event.title}}
        </div>
        <div class="event-owner">
          {{event.owner}}
        </div>
        <div class="event-genre">
          {{event.genre}}
        </div>
        <div class="event-date">
          {{event.date}}
        </div>
        <div class="event-city">
          {{event.city}}
        </div>
        
        <v-btn
          dark
          class="cyan"
          @click="paymentLink">
          Booking
        </v-btn>
        <v-btn
          v-if="this.$store.getters.getUserName == event.owner"
          dark
          class="cyan"
          :to="{
            name: 'event-edit', 
            params () {
              return {
                eventId: event.id
              }
            }
          }">
          Edit
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && !bookmark"
          dark
          class="cyan"
          @click="setAsBookmark">
          Follow
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && bookmark"
          dark
          class="cyan"
          @click="unsetAsBookmark">
          Unfollow
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <img class="event-image" :src="event.eventImageUrl" />
        <br>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  props: [
    'event'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async event () {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        const bookmarks = (await BookmarksService.index({
          eventId: this.event.id
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          eventId: this.event.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    },
    async paymentLink () {
      window.open(this.event.payLink)
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

.event-owner {
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
