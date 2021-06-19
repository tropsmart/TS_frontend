<template>
    <div>
        <div ref="map" style="width: 100%; height: 500px"></div>
    </div>
</template>

<script>
const H = window.H

    export default {
        name: "HereMap",
        data:  ()=>({
            platform: {},
            map: {},
            routingServices: {}
            
        }),
        props:{
            apiKey: String,
            appId: String,
            appCode: String,
            latitude: String,
            longitude: String,
            zoom: String
        },
        created() {
            this.platform = new H.service.Platform({
                "apiKey": this.apiKey

            });
            this.routingServices = this.platform.getRoutingService();
        },
        mounted() {
            let defaultLayers = this.platform.createDefaultLayers();
            this.map = new H.Map(
                this.$refs.map,
                defaultLayers.vector.normal.map,
                {
                    zoom: this.zoom,
                    center: { lat: this.latitude, lng: this.longitude}
                }
            );
        },
        methods: {
            drawRoute(start, finish) {
            this.routingService.calculateRoute(
                {
                    "mode": "fastest;car;traffic:enabled",
                    "waypoint0": `${start.lat},${start.lng}`,
                    "waypoint1": `${finish.lat},${finish.lng}`,
                    "representation": "display"
                },
                data => {
                    console.log("data : ",data);
                },
                error => {
                    console.error(error)
                }
            );
        }
        }
    }
</script>

<style></style>