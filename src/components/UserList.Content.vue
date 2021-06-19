<template>
    <div>
        <div class="row">
            <v-text-field label="Buscar transportista" outlined clearable
            name="login" type="text" class="pa-5" v-model="paramName"></v-text-field>
            <v-btn color="blue darken-1" style="padding-top: 15px" text @click="searchDriverByName"><v-icon style="margin-right: 5px">mdi-account-search</v-icon>Solicitar servicio</v-btn>
        </div>
    
    <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
     @click:row="rowClick">
                <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
                </v-overlay>
    
    <template v-slot:top>
        <v-toolbar flat color="white">
            <v-toolbar-title>Transportistas disponibles</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
    <div ref="map">
        <input type="text" id="userName" ref="userName"/>
    </div>


    <!-- DIALOG FOR INFORMATION FOR DRIVERS IN ANOTHER COMPONENT ===========================================================================================-->
            
            <v-dialog v-model="dialog" max-width="500px">
             
                <v-card style="border-radius:10px;">
                    <v-card style="border-radius:10px;">
                        <v-img height="250" src="https://besthqwallpapers.com/Uploads/10-11-2019/110694/thumb2-blue-stone-background-stone-texture-grunge-blue-background-creative-blue-texture.jpg">
                            <v-row justify="space-around">
                                <v-avatar size="150" class="ma-10">
                                    <v-img height="150" src="https://thispersondoesnotexist.com/image"></v-img>
                                </v-avatar>
                            </v-row>
                        </v-img>
                    </v-card>
             
                    <v-card-title align="center" style="text-align: center; display:block">
                        <div class="text-xs-center"> {{ formTitle }}</div>
                    </v-card-title>
                    <v-container align="center" style="padding: 5px; text-align: center;">
                        <v-card-text style="padding: 7px;"><div>Correo : {{ currentDriver.email }}</div></v-card-text>
                        <v-card-text style="padding: 7px;"><div>Nombres : {{ currentDriver.firstName }}</div></v-card-text>
                        <v-card-text style="padding: 7px;"><div>Apellidos : {{ currentDriver.lastName }}</div></v-card-text>
                        <v-card-text style="padding: 7px;">
                            <div v-if = "currentDriver.role==1" >Rol : Cliente</div>
                            <div v-else>Rol : Conductor</div>
                        </v-card-text>
                    </v-container>
                    <v-divider class="mx-4"></v-divider>

                    <v-card-actions style="text-align: center;">
                        <v-container>
                            <v-btn color="blue darken-1" text @click="AddFavorites">Agregar a Favoritos</v-btn>
                            <v-btn color="blue darken-1" text @click="close">Volver</v-btn>
                        </v-container>
                        <v-container>
                            <v-btn color="blue darken-1" text @click="AddBlockeds">Bloquear</v-btn>
                            <v-btn color="blue darken-1" text @click="addNewCargo">Solcitar cargo</v-btn>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-dialog>
<!-- -->
    <!--DIALOG 2 FOR ADD CARGO =================================================================================================== -->

            <v-dialog id="dialog2" v-model="dialogCargo" ref="dialog2" max-width="500px">
    
                <v-card id="carddialog2" ref="carddialog2" style="border-radius:10px;">
                        <v-alert type="success" v-model="rechargeSuccess" dismissible close-text="Close Alert">
                            Solicitud de cargo enviada exitosamente
                        </v-alert>
                        <v-alert type="warning" v-model="noMoney" dismissible close-text="Close Alert">
                            No tienes saldo suficiente para solicitar el servicio
                        </v-alert>
                    <v-card style="border-radius:10px">
                    </v-card>
                    <v-card-title align="center" style="test-align: center; display:block">
                        <div class="text-xs-center">Nuevo cargo</div>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation style="width:100%;">
                            <v-text-field
                                v-model="cargoInput.description"
                                :rules="[v => !!v || 'Ingrese la descripcion del cargo']"
                                label="Descripción"
                                name="cargo"
                                prepend-icon="mdi-account-details"
                                type="text"
                            ></v-text-field>
                            <v-text-field
                                v-model="cargoInput.servicePrice"
                                :rules="[v => !!v || 'Ingrese el precio a solicitar']"
                                label="Precio"
                                name="cargo"
                                prepend-icon="mdi-currency-usd"
                                type="number"
                                suffix="$"
                            ></v-text-field>
                            <v-text-field
                                v-model="cargoInput.weight"
                                :rules="[v => !!v || 'Ingrese el peso estimado del cargamento']"
                                label="Peso estimado"
                                name="cargo"
                                prepend-icon="mdi-car-door-lock"
                                type="number"
                                suffix="Kg"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                   
                    
                    <v-divider id="divider2" class="mx-4"></v-divider>

                    <GoogleMapsRoute ref="googleRoute"/>
                    <v-divider class="mx-4"></v-divider>

                    <v-card-actions style="text-align: center;">
                        <v-container>
                            <v-btn color="green darken-1" text @click="requestCargoService"><v-icon style="margin-right: 5px">mdi-book-check-outline</v-icon>Solicitar servicio</v-btn>
                            <v-btn color="red darken-1" text @click="close2"><v-icon style="margin-right: 5px">mdi-backspace-outline</v-icon>Volver</v-btn>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-dialog>

    <!--=================================================================================================================================== -->       
        </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn small class="warning" fab left="left" @click="editItem(item)">
            <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn class="ml-5 error" small fab @click="deleteItem(item)">
            <v-icon> mdi-delete </v-icon>
        </v-btn>
    </template>
    </v-data-table>
    </div>
</template>

<script>
import TsDataService from '@/services/TsDataService'
import GoogleMapsRoute from './GoogleMapsRoute.vue'
export default {
    components: { GoogleMapsRoute },
    directionsService: null,
    directionsDisplay: null,
    name: 'UsersList',
    data: ()=>({
        valid:false,
        paramName: '',
        dialog: false,
        totalDistance: 0,
        totalTime: 0,
        dialogCargo: false,
        rechargeSuccess: false,
        noMoney: false,
        overlay: false,
        headers: [
            { text: 'FirstName', value: 'firstName' },
            { text: 'LastName', value: 'lastName' },
            { text: 'Email', value: 'email' },
            { text: 'Role', value: 'role'},
            { text: 'Actions', value: 'actions', sorteable: false}
        ],
        users: [],
        currentDriver: {
            email: '',
            firstName: '',
            lastName: '',
            role: '',
            id: ''
        },
        cargoInput : {
            weight: '',
            description: '',
            servicePrice: '',
            serviceId: '',
            arrivalAltitude: 0.0,
            arrivalLatitude: 0.0,
            arrivalLongitude: 0.0,
            departureAltitude: 0.0,
            departureLatitude: 0.0,
            departureLongitude: 0.0
        },
        currentIndex: -1,
        myCoordinates: {
            lat: 0,
            lng: 0
        },
        markers: []
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Informacion de conductor'
        },
        google: ()=>window.google
    },
    watch: {
        dialog (val) {
            console.log(val)
            val || this.close()
        },
        dialogCargo (val) {
              val || this.close()
        }
    },
    methods: {
        retrieveDrivers() {
            TsDataService.getAllDrivers()
                .then(response => {
                    this.users = response.data.resourceList;
                    console.log(this.users);
                })
                .catch(e => {
                    console.log(e);
                });
        },
 
        refreshList() {
                this.retrieveDrivers();
                this.currentDriver = null;
                this.currentIndex = -1;
        },
        requestCargoService() {
            if(this.$refs.form.validate())
                {
                    this.cargoInput.departureLatitude = this.$refs.googleRoute.$data.markers[0].position.lat
                    this.cargoInput.departureLongitude = this.$refs.googleRoute.$data.markers[0].position.lng
                    this.cargoInput.arrivalLatitude = this.$refs.googleRoute.$data.markers[1].position.lat
                    this.cargoInput.arrivalLongitude = this.$refs.googleRoute.$data.markers[1].position.lng
                    
                    TsDataService.getSomeService(this.currentDriver.roleId)
                        .then(response => {
                            this.cargoInput.serviceId = response.data.resource.id;
                            console.log("cargoInput : ", this.cargoInput);
                            TsDataService.setRequestCargo(this.$store.state.auth.user.roleId ,this.cargoInput)
                                    .then(response => {
                                    if(response.data.success == true)
                                    {
                                        console.log("set Request Cargo", response);
                                        this.rechargeSuccess = true; 
                                        console.log("cargo delivered");
                                    }
                                    else
                                    {
                                        this.noMoney = true;
                                    }
                                })
                        
                        })
            
                }
            
        },
        rowClick: function (item, row) {  
            row.select(true);
            this.currentDriver = row.item;
            this.dialog = true
            console.log("currentDriver",this.currentDriver);
        },
        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            confirm('Are you sure you want to delete this item?'+item)
        },
        addNewCargo () {
            this.dialog = false;
            this.dialogCargo = true;
        },
        AddFavorites () {
            TsDataService.setFavorite(this.$store.state.auth.user.id,this.currentDriver.id)
                .then( response => {
                    console.log("response", response);
                    console.log("Add favorites success");
                })
        },
        AddBlockeds () {
            TsDataService.setBlocked(this.$store.state.auth.user.id,this.currentDriver.id)
                .then(() => {
                    console.log("Add BlockList success");
                })
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedIndex = -1
            })
        },
        close2 () {
            console.log("cargo2")
            this.dialogCargo = false
            this.$nextTick(() => {
                this.editedIndex = -1
            })
        },
        save () { 
        },
        redirectManager(path) {
          this.$router.push(path).catch(()=>{});
        },
        searchDriverByName() {
            if(this.paramName.length > 0)
            {
                TsDataService.searchDriverByName(this.paramName)
                        .then(response => {
                                    this.users = response.data.resourceList;
                                    console.log(this.users);
                                })
                                .catch(e => {
                                    console.log(e);
                                });
            } else {
                this.retrieveDrivers();
            }
           
        }
    },
    mounted() {
        if(this.$store.state.auth.user != undefined)
        {
            this.retrieveDrivers();
        }
        else
        {
            this.redirectManager("sign-in");
        }
    },
    created() {}
}
</script>


<style scoped>
  tr.v-data-table__selected {
    background: #3450dd !important;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
  }
</style>