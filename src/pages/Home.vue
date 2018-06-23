<template>
  <div class="main">
    <mapbox id="map" :access-token="mapboxToken" :map-options="mapOptions" @map-load="mapLoaded"></mapbox>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import mapboxgl from 'mapbox-gl'
export default {
  name: '/',
  components: {
    'mapbox': Mapbox
  },
  created () {
    let vue = this
    if (this.logged === true) {
      this.$router.push('/')
    } else {
      this.$router.push('/login')
    }
    navigator.geolocation.getCurrentPosition(vue.locationSuccess, vue.locationFail)
  },
  data: function () {
    return {
      logged: true,
      latitude: '',
      longitude: '',
      accuracy: '',
      coordinates: [0, 0],
      mapboxToken: 'pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag',
      mapOptions: {
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [0, 0],
        zoom: 1
      }
    }
  },
  methods: {
    mapLoaded (map) {
      let vue = this
      vue.map = map
      vue.map.jumpTo({
        center: [vue.longitude, (vue.latitude - 0.002)],
        zoom: 15
      })
      vue.startMarker()
    },
    mapJump () {
      let vue = this
      vue.map.jumpTo({
        center: [vue.longitude, (vue.latitude - 0.002)],
        zoom: 15
      })
    },
    startMarker () {
      let vue = this
      new mapboxgl.Marker(vue.marker)
        .setLngLat(vue.coordinates)
        .addTo(vue.map)
    },
    locationSuccess (position) {
      let vue = this
      vue.latitude = position.coords.latitude
      vue.longitude = position.coords.longitude
      vue.accuracy = position.coords.accuracy
      vue.coordinates = [vue.longitude, vue.latitude]
    },
    locationFail () {
      alert('It seems we cant find you, please reload the page and try again.')
      this.locationError = true
    }
  }
}
</script>

<style scoped lang="less">
  .main {
    height: 100%;
      width: 100%;
      position:fixed;
      background-image: url('../assets/noise.png');
  }
h1 {
  color: white;
}

.recenter {
  position: fixed;
  font-weight: 300;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 2em;
  height: 50px;
  background-image: url('../assets/noise.png');
  color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
}

#map {
  width: 100%;
  height: 100%;
  padding-top: 0px;
  z-index: 0;
  position: fixed;
  top: 190px;
  bottom: 50px;
}
</style>
