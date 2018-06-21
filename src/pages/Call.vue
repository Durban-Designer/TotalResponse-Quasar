<template>
  <div class="main">
    <h2>Note! Once you specify your emergency type, TR will start a call to the authorities and immediately send your location.</h2>
    <audio id="audio" autoplay></audio>
    <div v-bind:class="connecting">
      <h3>Sending Location...</h3>
    </div>
    <div v-bind:class="callIcons">
      <h1>How Can We Help?</h1>
      <!-- Fire Tokens -->
      <div v-bind:class="fireTokenLogic" v-on:click="fireToken"><div class="fireIcon"></div></div>
      <div v-bind:class="buildingFireTokenLogic" v-on:click="buildingFire">Building Fire</div>
      <div v-bind:class="explosionTokenLogic" v-on:click="explosion">Explosion</div>
      <div v-bind:class="forestFireTokenLogic" v-on:click="forestFire">Forest Fire</div>
      <div v-bind:class="otherFireTokenLogic" v-on:click="otherFire">Other</div>
      <!-- Police Tokens -->
      <div v-bind:class="policeTokenLogic" v-on:click="policeToken"><div class="policeIcon"></div></div>
      <div v-bind:class="kidnappingTokenLogic" v-on:click="kidnapping">Abduction</div>
      <div v-bind:class="assaultTokenLogic" v-on:click="assault">Assault</div>
      <div v-bind:class="massShootingTokenLogic" v-on:click="massShooting">Shooting</div>
      <div v-bind:class="robberyTokenLogic" v-on:click="robbery">Robbery</div>
      <div v-bind:class="rapeTokenLogic" v-on:click="rape">Rape</div>
      <div v-bind:class="otherPoliceTokenLogic" v-on:click="otherPolice">Other</div>
      <!-- Medical Tokens -->
      <div v-bind:class="medicalTokenLogic" v-on:click="medicalToken"><div class="medicalIcon"></div></div>
      <div v-bind:class="heartAttackTokenLogic" v-on:click="heartAttack">Heart Attack</div>
      <div v-bind:class="gunshotTokenLogic" v-on:click="gunshot">Gunshot</div>
      <div v-bind:class="massCasualtyTokenLogic" v-on:click="massCasualty">Mass Casualty</div>
      <div v-bind:class="otherMedicalTokenLogic" v-on:click="otherMedical">Other</div>
      <!-- Utility Tokens -->
      <div v-bind:class="utilityTokenLogic" v-on:click="utilityToken"><div class="utilityIcon"></div></div>
      <div v-bind:class="gasLeakTokenLogic" v-on:click="gasLeak">Gas</div>
      <div v-bind:class="electricalTokenLogic" v-on:click="electrical">Electrical</div>
      <div v-bind:class="waterTokenLogic" v-on:click="water">Water</div>
      <div v-bind:class="otherUtilityTokenLogic" v-on:click="otherUtility">Other</div>
    </div>
    <div v-bind:class="callingIcons">
      <div v-bind:class="muteIconOff" v-on:click="muteToggle"></div>
      <div v-bind:class="muteIconOn" v-on:click="muteToggle"></div>
      <div class="hangUpIcon" v-on:click="hangUp"></div>
      <div v-bind:class="speakerIconOff" v-on:click="speakerToggle"></div>
      <div v-bind:class="speakerIconOn" v-on:click="speakerToggle"></div>
    </div>
    <div v-bind:class="mapContainer">
      <h1>Current Location:</h1>
      <mapbox :access-token="this.mapboxToken" :map-options="this.mapOptions" @map-load="mapLoaded"></mapbox>
    </div>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import axios from 'axios'
var sinchSms = require('sinch-sms')({
  key: '8623407a-c954-4b57-980f-ff3a3088b279',
  secret: 'W9hLHeFezUWzbjffgMfJ3A==',
  ssl: true
})
export default {
  name: 'Call',
  components: {
    'mapbox': Mapbox
  },
  data: function () {
    return {
      map: {},
      tokenTouched: false,
      fireTokenTouched: false,
      policeTokenTouched: false,
      medicalTokenTouched: false,
      utilityTokenTouched: false,
      emergencyType: 'Unknown',
      name: 'Unknown',
      address: 'Unknown',
      bloodType: 'Unknown',
      allergies: 'Unknown',
      medicalInfo: 'Unknown',
      call: false,
      mute: false,
      speaker: false,
      latitude: 10,
      longitude: 10,
      altitude: 1,
      accuracy: 0,
      altitudeAccuracy: 0,
      locationError: false,
      sinchToken: '',
      mapboxToken: 'pk.eyJ1IjoiZ3JhcGV0b2FzdCIsImEiOiJjajhkeHR5YzEwdXp4MnpwbWhqYzI4ejh0In0.JzUlf5asD6yOa5XvjUF5Ag',
      mapOptions: {
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [0, 0],
        zoom: 1
      }
    }
  },
  props: ['logged', 'token', 'userId'],
  created () {
    let vue = this
    if (this.logged === false) {
      this.$router.push('/login')
    }
    navigator.geolocation.getCurrentPosition(locationSuccess, locationFail)
    function locationSuccess (position) {
      vue.latitude = position.coords.latitude
      vue.longitude = position.coords.longitude
      vue.altitude = position.coords.altitude
      vue.accuracy = position.coords.accuracy
      vue.altitudeAccuracy = position.coords.altitudeAccuracy
    }
    function locationFail () {
      alert('It seems we cant find you, please reload the page and try again.')
      this.locationError = true
    }
    axios.get('http://54.191.145.227:81/users/' + vue.userId, {headers: { 'Authorization': 'JWT ' + vue.token }})
      .then(function (response) {
        vue.name = response.data.firstName + ' ' + response.data.middleName + ' ' + response.data.lastName
        vue.address = response.data.addressOne + ' ' + response.data.addressTwo
        vue.bloodType = response.data.bloodType
        vue.allergies = response.data.allergies
        vue.medicalInfo = response.data.additionalInfo
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  computed: {
    callIcons: function () {
      return {
        callBox: this.call === false,
        hidden: this.call !== false
      }
    },
    fireTokenLogic: function () {
      return {
        hidden: this.tokenTouched === true,
        fireToken: this.tokenTouched === false
      }
    },
    buildingFireTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.fireTokenTouched === false,
        buildingFireToken: this.tokenTouched === true && this.fireTokenTouched === true
      }
    },
    explosionTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.fireTokenTouched === false,
        explosionToken: this.tokenTouched === true && this.fireTokenTouched === true
      }
    },
    forestFireTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.fireTokenTouched === false,
        forestFireToken: this.tokenTouched === true && this.fireTokenTouched === true
      }
    },
    otherFireTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.fireTokenTouched === false,
        otherFireToken: this.tokenTouched === true && this.fireTokenTouched === true
      }
    },
    policeTokenLogic: function () {
      return {
        hidden: this.tokenTouched === true,
        policeToken: this.tokenTouched === false
      }
    },
    kidnappingTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.policeTokenTouched === false,
        kidnappingToken: this.tokenTouched === true && this.policeTokenTouched === true
      }
    },
    assaultTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.policeTokenTouched === false,
        assaultToken: this.tokenTouched === true && this.policeTokenTouched === true
      }
    },
    massShootingTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.policeTokenTouched === false,
        massShootingToken: this.tokenTouched === true && this.policeTokenTouched === true
      }
    },
    robberyTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.policeTokenTouched === false,
        robberyToken: this.tokenTouched === true && this.policeTokenTouched === true
      }
    },
    rapeTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.policeTokenTouched === false,
        rapeToken: this.tokenTouched === true && this.policeTokenTouched === true
      }
    },
    otherPoliceTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.policeTokenTouched === false,
        otherPoliceToken: this.tokenTouched === true && this.policeTokenTouched === true
      }
    },
    medicalTokenLogic: function () {
      return {
        hidden: this.tokenTouched === true,
        medicalToken: this.tokenTouched === false
      }
    },
    heartAttackTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.medicalTokenTouched === false,
        heartAttackToken: this.tokenTouched === true && this.medicalTokenTouched === true
      }
    },
    gunshotTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.medicalTokenTouched === false,
        gunshotToken: this.tokenTouched === true && this.medicalTokenTouched === true
      }
    },
    massCasualtyTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.medicalTokenTouched === false,
        massCasualtyToken: this.tokenTouched === true && this.medicalTokenTouched === true
      }
    },
    otherMedicalTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.medicalTokenTouched === false,
        otherMedicalToken: this.tokenTouched === true && this.medicalTokenTouched === true
      }
    },
    utilityTokenLogic: function () {
      return {
        hidden: this.tokenTouched === true,
        utilityToken: this.tokenTouched === false
      }
    },
    gasLeakTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.utilityTokenTouched === false,
        gasLeakToken: this.tokenTouched === true && this.utilityTokenTouched === true
      }
    },
    electricalTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.utilityTokenTouched === false,
        electricalToken: this.tokenTouched === true && this.utilityTokenTouched === true
      }
    },
    waterTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.utilityTokenTouched === false,
        waterToken: this.tokenTouched === true && this.utilityTokenTouched === true
      }
    },
    otherUtilityTokenLogic: function () {
      return {
        hidden: this.tokenTouched === false || this.utilityTokenTouched === false,
        otherUtilityToken: this.tokenTouched === true && this.utilityTokenTouched === true
      }
    },
    callingIcons: function () {
      return {
        callBox: this.call === true,
        hidden: this.call !== true
      }
    },
    connecting: function () {
      return {
        connect: this.call === true,
        hidden: this.call !== true
      }
    },
    muteIconOff: function () {
      return {
        muteIconOff: this.mute === true,
        hidden: this.mute !== true
      }
    },
    muteIconOn: function () {
      return {
        muteIconOn: this.mute === false,
        hidden: this.mute !== false
      }
    },
    speakerIconOff: function () {
      return {
        speakerIconOff: this.speaker === true,
        hidden: this.speaker !== true
      }
    },
    speakerIconOn: function () {
      return {
        speakerIconOn: this.speaker === false,
        hidden: this.speaker !== false
      }
    },
    mapContainer: function () {
      return {
        currentLocation: this.call === true,
        hidden: this.call !== true
      }
    }
  },
  methods: {
    mapLoaded (map) {
      let vue = this
      vue.map = map
    },
    fireToken () {
      this.tokenTouched = true
      this.fireTokenTouched = true
    },
    buildingFire () {
      this.emergencyType = 'Building Fire'
      this.callHelp()
    },
    explosion () {
      this.emergencyType = 'Explosion'
      this.callHelp()
    },
    forestFire () {
      this.emergencyType = 'Forest Fire'
      this.callHelp()
    },
    otherFire () {
      this.emergencyType = 'Other Fire'
      this.callHelp()
    },
    policeToken () {
      this.tokenTouched = true
      this.policeTokenTouched = true
    },
    kidnapping () {
      this.emergencyType = 'Kidnapping'
      this.callHelp()
    },
    assault () {
      this.emergencyType = 'Assault'
      this.callHelp()
    },
    massShooting () {
      this.emergencyType = 'Mass Shooting'
      this.callHelp()
    },
    robbery () {
      this.emergencyType = 'Robbery'
      this.callHelp()
    },
    rape () {
      this.emergencyType = 'Rape'
      this.callHelp()
    },
    otherPolice () {
      this.emergencyType = 'Other Police'
      this.callHelp()
    },
    medicalToken () {
      this.tokenTouched = true
      this.medicalTokenTouched = true
    },
    heartAttack () {
      this.emergencyType = 'Heart Attack'
      this.callHelp()
    },
    gunshot () {
      this.emergencyType = 'Gunshot Wound'
      this.callHelp()
    },
    massCasualty () {
      this.emergencyType = 'Mass Casualty'
      this.callHelp()
    },
    otherMedical () {
      this.emergencyType = 'Other Medical'
      this.callHelp()
    },
    utilityToken () {
      this.tokenTouched = true
      this.utilityTokenTouched = true
    },
    gasLeak () {
      this.emergencyType = 'Gas Leak'
      this.callHelp()
    },
    electrical () {
      this.emergencyType = 'Electrical'
      this.callHelp()
    },
    water () {
      this.emergencyType = 'Water'
      this.callHelp()
    },
    otherUtility () {
      this.emergencyType = 'Other Utility'
      this.callHelp()
    },
    callHelp () {
      let vue = this
      this.call = true
      if (this.locationError === false) {
        sinchSms.send(
          '+16025581817',
          'Emergency Type: ' + vue.emergencyType +
          ' Name: ' + vue.name +
          ' Home Address: ' + vue.address +
          ' Blood Type: ' + vue.bloodType +
          ' Allergies: ' + vue.allergies +
          ' Medical Info: ' + vue.medicalInfo +
          ' latitude: ' + vue.latitude +
          ' Longitude: ' + vue.longitude +
          ' Accuracy: ' + vue.accuracy +
          ' Altitude: ' + vue.altitude +
          ' Altitude Accuracy: ' + vue.altitudeAccuracy
        ).then(function (response) {
          console.log(response)
        }).fail(function (error) {
          console.log(error)
        })
      }
      vue.map.jumpTo({
        center: [vue.longitude, vue.latitude],
        zoom: 15
      })
    },
    hangUp () {
      this.call = false
      this.tokenTouched = false
      this.fireTokenTouched = false
      this.policeTokenTouched = false
      this.medicalTokenTouched = false
      this.utilityTokenTouched = false
    },
    muteToggle () {
      if (this.mute === false) {
        this.mute = true
      } else {
        this.mute = false
      }
    },
    speakerToggle () {
      if (this.speaker === false) {
        this.speaker = true
      } else {
        this.speaker = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  @tokenBackground: #999;

  .main {
    position:fixed;
    background-image: url('../assets/noise.png');
    margin-bottom: 100px;
    text-align: center;
    width: 100%;
    height: 100%;
    grid-gap: 0;
  }

  body {
    margin:0;
    padding:0;
  }
  h1 {
    font-size: 1.2em;
    font-weight: 500;
    color: white;
    text-align: center;
    grid-column: 2;
    grid-row: 2;
    margin-top: 25%;
    margin-left: -5%;
    line-height: 30px;
  }
  h2 {
    margin-top: 10px;
    color: white;
    font-size: 1em;
    font-weight: 500;
    width: 90%;
    margin-left: 5%;
  }
  .connect {
    font-size: 2.4em;
    margin: 0;
    color: white;
    grid-column-start: 2;
    grid-column-end: 8;
    grid-row: 1;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 10;
  }

  .hidden {
    display: none;
  }

  .callIcons{
    grid-row: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80px 80px 80px;
    grid-gap: 0;
  }

  .fireToken {
    grid-column: 1;
    grid-row: 2;
    padding: 5px;
    width: 100px;
    height: 100px;
    border: 4px solid #e96025;
    border-radius: 50%;
  }
  .fireIcon {
    background-image: url('../assets/fireIcon.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
  }

  .buildingFireToken {
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    height: 100%;
    padding-top: 30px;
    font-weight: bold;
    color: #e96025;
    font-size: 1em;
    background-color: transparent;
    border: 4px solid #e96025;
    border-radius: 50%;
  }

  .explosionToken {
    grid-column: 3;
    grid-row: 2;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #e96025;
    font-size: 1em;
    background-color: transparent;
    border: 4px solid #e96025;
    border-radius: 50%;
  }

  .forestFireToken {
    grid-column: 1;
    grid-row: 2;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #e96025;
    font-size: 1em;
    background-color: transparent;
    border: 4px solid #e96025;
    border-radius: 50%;
  }

  .otherFireToken {
    grid-column: 2;
    grid-row: 3;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #e96025;
    font-size: 1.3em;
    background-color: transparent;
    border: 4px solid #e96025;
    border-radius: 50%;
  }

  .policeToken {
    grid-column: 3;
    grid-row: 2;
    padding: 2%;
    width: 100px;
    height: 100px;
    border: 4px solid #0072ff;
    border-radius: 50%;
  }

  .policeIcon {
    background: url('../assets/policeIcon.svg');
    background-position: center;
    background-size: contain;
    margin-top: 2px;
    width: 89px;
    height: 89px;
  }

  .kidnappingToken {
    grid-column: 3;
    grid-row: 2;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #0072ff;
    font-size: 1em;
    background-color: transparent;
    border: 4px solid #0072ff;
    border-radius: 50%;
  }

  .assaultToken {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #0072ff;
    font-size: 1.2em;
    background-color: transparent;
    border: 4px solid #0072ff;
    border-radius: 50%;
  }

  .massShootingToken {
    grid-column: 1;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #0072ff;
    font-size: 1.2em;
    background-color: transparent;
    border: 4px solid #0072ff;
    border-radius: 50%;

  }

  .robberyToken {
    grid-column: 3;
    grid-row: 1;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #0072ff;
    font-size: 1.2em;
    background-color: transparent;
    border: 4px solid #0072ff;
    border-radius: 50%;
  }

  .rapeToken {
    grid-column: 1;
    grid-row: 3;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #0072ff;
    font-size: 1.2em;
    background-color: transparent;
    border: 4px solid #0072ff;
    border-radius: 50%;
  }

  .otherPoliceToken {
    grid-column: 3;
    grid-row: 3;
    width: 100%;
    height: 100%;
    padding-top: 35px;
    font-weight: bold;
    color: #0072ff;
    font-size: 1.2em;
    background-color: transparent;
    border: 4px solid #0072ff;
    border-radius: 50%;
  }

  .medicalToken {
    grid-column: 2;
    grid-row: 1;
    padding: 5px;
    width: 100px;
    height: 100px;
    border: 4px solid #67ba52;
    border-radius: 50%;
  }
  .medicalIcon {
    background: url('../assets/medicalIcon.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
  }

  .heartAttackToken {
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    height: 100%;
    color: #67ba52;
    font-size: 1.2em;
    font-weight: bold;
    background-color: transparent;
    border: 4px solid #67ba52;
    border-radius: 50%;
    padding-top: 20px;
  }

  .gunshotToken {
    grid-column: 3;
    grid-row: 2;
    width: 100%;
    height: 100%;
    color: #67ba52;
    font-size: 1.2em;
    font-weight: bold;
    border: 4px solid #67ba52;
    border-radius: 50%;
    padding-top: 30px;
  }

  .massCasualtyToken {
    grid-column: 1;
    grid-row: 2;
    width: 100%;
    height: 100%;
    color: #67ba52;
    font-size: 1.1em;
    font-weight: bold;
    padding-top: 25px;
    border: 4px solid #67ba52;
    border-radius: 50%;
  }

  .otherMedicalToken {
    grid-column: 2;
    grid-row: 3;
    width: 100%;
    height: 100%;
    color: #67ba52;
    font-size: 1.3em;
    font-weight: bold;
    border: 4px solid #67ba52;
    border-radius: 50%;
    line-height: 90px;
  }

  .utilityToken {
    grid-column: 2;
    grid-row: 3;
    padding: 5px;
    width: 100px;
    height: 100px;
    border: 4px solid #eaef29;
    border-radius: 50%;
  }
  .utilityIcon {
    background: url('../assets/utilityIcon.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 100%;
    height: 100%;
  }

  .gasLeakToken {
    grid-column: 3;
    grid-row: 2;
    width: 100%;
    height: 100%;
    color: #eaef29;
    font-size: 1.3em;
    font-weight: bold;
    padding-top: 35px;
    border: 4px solid #eaef29;
    border-radius: 50%;
  }

  .electricalToken {
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    height: 100%;
    color: #eaef29;
    font-size: 1.1em;
    font-weight: bold;
    padding-top: 35px;
    border: 4px solid #eaef29;
    border-radius: 50%;
  }

  .waterToken {
    grid-column: 1;
    grid-row: 2;
    width: 100%;
    height: 100%;
    color: #eaef29;
    font-size: 1.3em;
    font-weight: bold;
    padding-top: 35px;
    border: 4px solid #eaef29;
    border-radius: 50%;
  }

  .otherUtilityToken {
    grid-column: 2;
    grid-row: 3;
    width: 100%;
    height: 100%;
    color: #eaef29;
    font-size: 1.3em;
    font-weight: bold;
    padding-top: 35px;
    border: 4px solid #eaef29;
    border-radius: 50%;
  }

  .callingIcons {
    display: grid;
    grid-template-columns: 10px repeat(3, 1fr) 10px;
    grid-gap: 0;
  }

  .muteIconOff {
    grid-column: 1;
    width: 100%;
    height: 100%;
    background-image: url('../assets/muteOff.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .muteIconOn {
    grid-column: 1;
    width: 100%;
    height: 100%;
    background-image: url('../assets/muteOn.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .hangUpIcon {
    grid-column: 2;
    width: 100%;
    height: 100%;
    background-image: url('../assets/hangUpIcon.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .speakerIconOff {
    grid-column: 3;
    width: 100%;
    height: 100%;
    background-image: url('../assets/speakerOff.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .speakerIconOn {
    grid-column: 3;
    width: 100%;
    height: 100%;
    background-image: url('../assets/speakerOn.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .callBox {
    margin-left: .5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(3, 100px);
    grid-row-gap: 5%;
    grid-column-gap: 10%;
    width: 90%;
    height: 100%;
    margin-top: 30px;
  }

  .currentLocation {
    width: 100%;
    text-shadow: 4px 4px 5px grey;
    font-family: Helvetica, "Trebuchet MS", Verdana, sans-serif;
    grid-column-start: 1;
    grid-column-end: 10;
    grid-row: 4;
    color: #3f62ad;
    text-align: left;
  }

  .currentLocation h1 {
    text-align: center;
  }

  #map {
    width: 100%;
    height: 300px;
    margin: 1.2%;
  }
  @media screen and (min-width: 414px) {
    .callBox {
      grid-column-start: 1;
      grid-column-end: 10;
      margin-left: 5%;
    }
}

</style>
