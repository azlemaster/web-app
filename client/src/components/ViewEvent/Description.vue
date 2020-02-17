<template>
  <panel title="Description">
    <img :src="'https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=1ZRKH9KT9Pp92wxwUyT3m0iPudSL0rvlLmvaFunOtRY&co=' + event.country + '&ci=' + event.city + '&zi=' + event.postcode + '&s=' + event.street + '&z=170&h=240&f=1'">
    <textarea
      readonly
      v-model="event.description"
    ></textarea>
  </panel>
</template>

<script>
export default {
  props: [
    'event'
  ]
}
</script>

<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
