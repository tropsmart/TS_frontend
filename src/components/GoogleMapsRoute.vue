<template>
  <div id="app">
    <v-card-title align="center" style="test-align: center; display:block">
      <div class="text-xs-center"><v-icon>mdi-map-marker-radius</v-icon>  Destino de la carga</div>
    </v-card-title>
    <v-card-subtitle align="center" style="test-align: center; display:block">   
      <div class="text-xs-center"><v-icon>mdi-transit-connection-variant </v-icon> Distancia : {{ this.totalDist.toFixed(2) }} km </div>
      <div class="text-xs-center"><v-icon>mdi-clock-time-four-outline</v-icon>Tiempo estimado : {{ this.timeEstimate }}</div>
    </v-card-subtitle>
                     
    <div class="row" style="margin:12px">
      <GmapMap ref="mapRef"
        :center=myCoordinates
        :zoom="20"
        :options="{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          disableDefaultUi: false
        }"
        map-type-id="terrain"
        style="width: 100%; height: 400px">
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="m.draggable"
            :icon="m.icon"
            :title=m.title
            @click="center=m.position"
            @dragend="gMapFunc($event.latLng)"
          />
          </GmapMap>
    </div>
  </div>
</template>

<script>
export default {
  directionsService: null,
  directionsDisplay: null,
    computed: {
    google: ()=>window.google
  },
  name: 'HelloWorld',
  props: {
    totalDistance: String,
    totalTimeEstimate: String
  },
  data: () => ({
    myCoordinates: {
      lat: 0,
      lng: 0
    },
    destination:{lat: 0, lng: 0},
    markers: [],
    orange: 'http://maps.google.com/mapfiles/kml/paddle/orange-circle.png',
    yellow: 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png',
    blue: 'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png',
    red: 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png',
    totalDist:0,
    timeEstimate:""
  }),
  mounted() {
    // eslint-disable-next-line no-undef
    
    this.$options.directionsService = new this.google.maps.DirectionsService
    this.$options.directionsDisplay = new this.google.maps.DirectionsRenderer
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({lat:this.myCoordinates.lat, lng: this.myCoordinates.lng})
      this.$options.directionsDisplay.setMap(map)
    })
    
    
  },
  created() {
    this.$getLocation({}).
      then(coordinates =>{
          this.markers.push({
              position: coordinates,
              title: "Position",
              icon: this.blue,
              draggable: false
          })
          this.markers.push({
            position: {lat:coordinates.lat+0.00000000000120, lng:coordinates.lng+0.00000000000120},
            title: "Destino",
            icon: this.orange,
            draggable: true
          })
          this.myCoordinates = coordinates

      })
  },
  methods: {
    calculateRoute(directionsService, directionsDisplay){
      directionsService.route({
        origin: this.myCoordinates,
        destination: this.destination,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if(status === 'OK'){
          directionsDisplay.setDirections(response)
          let totalTime = 0
          this.totalDist = 0
          var myroute = response.routes[0];
          myroute.legs.forEach((leg) => {
            this.totalDist += leg.distance.value;
            totalTime += leg.duration.value;    
          })
          this.totalDist = this.totalDist / 1000.


          this.timeEstimate = new Date(totalTime * 1000).toISOString().substr(11, 8)
        } else {
          window.alert('Directions request failed due to '+ status)
        }
      })

      this.$emit('input', 109);

    },
    updateCoordinates(location) {
      console.log("location : ",location)
    },
    gMapFunc(evnt) {
        this.destination = {"lat":evnt.lat(), "lng":evnt.lng()}
        this.$emit('latitudeEmit', evnt.lat())
        this.calculateRoute(this.$options.directionsService, this.$options.directionsDisplay)
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
