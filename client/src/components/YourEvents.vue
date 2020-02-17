<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
      <template slot="items" scope="props">
        <td class="text-xs-right">
          {{props.item.title}}
        </td>
        <td class="text-xs-right">
          {{props.item.owner}}
        </td>
        <td class="text-xs-right">
          <v-btn
            dark
            class="cyan"
            @click="paymentLink(props.item.payLink)">
            Booking
          </v-btn>
        </td>
        <td  style="width:90%; padding:0%;">
          <img class="event-image" :src="props.item.eventImageUrl"/>
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Owner',
          value: 'owner'
        },
        {
          text: 'Visit',
          value: 'visit'
        },
        {
          text: '',
          value: 'eventImageUrl'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
    }
  },
  methods: {
    async paymentLink (payLink) {
      window.open(payLink)
    }
  }
}
</script>

<style scoped>
.event-image {
  width: 40%;
  margin: 0 auto;
}
</style>>
