<template>
  <v-data-table
    :headers="headers"
    :items="vehicles"
    class="elevation-12"
    show-select
    :single-select=true
    item-key="table_header_index"
    >

    <template v-slot:top>
        <v-toolbar flat color="white">
            <v-toolbar-title>Vehiculos disponibles</v-toolbar-title>
            <v-divider class="max-4" inset vertical></v-divider>
            <v-dialog v-model="addNewVehicleDialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn color="skyblue" dark class="ma-2" v-on="on">Agregar +</v-btn>
            <v-btn color="warning" dark class="ma-2" @click="returnProfile">Volver</v-btn>
        </template>
        <v-card style="border-radius:10px;max-height:100%">
            <v-toolbar dark color="skyblue" flat>
                <v-toolbar-title>Registrar nuevo vehiculo</v-toolbar-title>
            </v-toolbar>
        <v-card-text>
            <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            
                            <v-alert type="success" v-model="addVehicleSuccess" dismissible close-text="Close Alert">
                                    Se agrego un nuevo método de pago satisfactoriamente
                            </v-alert>
                            <v-alert type="error" v-model="addVehicleFailed" dismissible close-text="Close Alert">
                                    No se pudo realizar el registro del método de pago
                            </v-alert>
                       
                            <v-text-field
                                v-model="newVehicleInput.license"
                                :rules="[v => !!v || 'Licencia de vehiculo es requerido']"
                                label="Licencia"
                                name="license"
                                prepend-icon="mdi-card-account-details-outline"
                                type="text"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="newVehicleInput.brand"
                                :rules="[v => !!v || 'Marca de vehiculo es requerido']"
                                label="Marca"
                                name="brand"
                                prepend-icon="mdi-watermark"
                                type="text"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="newVehicleInput.model"
                                :rules="[v => !!v || 'Modelo de vehiculo es requerido']"
                                label="Modelo"
                                name="model"
                                prepend-icon="mdi-alpha-d-circle-outline"
                                type="text"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="newVehicleInput.loadingCapacity"
                                :rules="[v => !!v || 'Capacidad de carga de vehiculo es requerido']"
                                label="Capacidad de carga"
                                name="license"
                                prepend-icon="mdi-weight-pound"
                                type="number"
                                suffix="Kg"
                                required
                            ></v-text-field>
                        </v-form>
                       
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark large color="skyblue" @click="addVehicleMethod">Registrar tarjeta</v-btn>
                        <v-btn dark large color="red" @click="close">Cancelar</v-btn>

                    </v-card-actions>
        </v-card-text>
        </v-card>
    </v-dialog>
        </v-toolbar>
    </template>

    
  </v-data-table>
</template>

<script>
import TsDataService from '../services/TsDataService'
export default {
    data: () => ({
        vehicles: [],
        addNewVehicleDialog: false,
        addVehicleSuccess: false,
        addVehicleFailed: false,
        dialog: false,
        currentVehicle:{}, 
        headers: [
            { text: 'Modelo', value: 'model'},
            { text: 'Marca', value: 'brand'},
            { text: 'Capacidad', value:'loadingCapacity'}
        ],
     
        valid: false,
        newVehicleInput : {
            driverId: 0,
            license: '',
            brand: '',
            model: '',
            loadingCapacity: 0,
            ownershipCard: ''
        }
    }),
    methods: {
        retrieveVehicleList () {
            TsDataService.getVehicleByDriverId(this.$store.state.auth.user.roleId)
                .then(response => {
                    if(response.data.success == true)
                    {
                        this.vehicles = response.data.resourceList;
                    }
                })
        },
        returnProfile() {
            this.$router.push("/profile");
        },
        addVehicleMethod() {
            if(this.$refs.form.validate()){
                this.newVehicleInput.id = this.$store.state.auth.user.roleId
                TsDataService.registerVehicleByDriverId(this.$store.state.auth.user.roleId,this.newVehicleInput)
                .then(response => {
                    if(response.data.success == true)
                    {
                        this.addVehicleSuccess = true
                        this.retrieveVehicleList()
                    } else {
                        this.addVehicleSuccess = false
                    }
                })
            }

        },
        close() {
            this.addNewVehicleDialog = false
            this.$nextTick(() => {
                this.editedIndex = -1
            })
        },
        rowClick: function (item, row) {  
            row.select(true);
            this.currentDriver = row.item;
            //this.dialog = true
            console.log("currentDriver",this.currentDriver);
        },
    },
    watch: {
        dialog (val) {
            console.log(val)
            val || this.close()
        },
    },
    mounted () {
        if(this.$store.state.auth.user != undefined)
            {
                this.retrieveVehicleList();
            }
            else
            {
                this.redirectManager("sign-in");
            }
    }
}
</script>

<style>
  tr.v-data-table__selected {
    background: #dbe1ff !important;
  }
</style>