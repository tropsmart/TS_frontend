<template>
    <div id="app">
        <HereMap
            ref="map"
            apiKey="Ly4Q7jyji0WaZ-gmJ_tPD2Q31XEqSS5YgTaPlQ-UYe0"
            appId="I9UlRMotjKaU1776SaVV"
            appCode=""
            latitude="37"
            longitude="-121"
            zoom="10"
        />
    </div>

  
</template>

<script>
import HereMap from './HereMap.vue';
export default {
    name: "app",
    components: {
        HereMap
    
    },
    mounted() {
        let map = this.$refs.map;
        map.drawRoute(
            {
                lat: "37",
                lng: "-121"
            },
            {
                lat: "38",
                lng: "-122"
            }
        )
    },
    methods: {
        
    },
}
</script>

<style>

</style>