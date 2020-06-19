<template>

    <v-data-table
      :headers= "headers"
      :items="cargoes"
      sort-by="weight"
      class="elevation-12"
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Sus cargos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
           ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Usuario</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="cargoInput.customerFirstName" label="Correo"></v-text-field>
                  </v-col>
                 
                  </v-row>
                </v-container>
              </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text>Cancel</v-btn>
                        <v-btn color="blue darken-1" text>Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-btn
            small
            class="warning"
            fab
            left="left"
            @click="editItem(item)">
            <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn class="ml-5 error"
            small
            fab
            @click="deleteItem(item)">
            <v-icon> mdi-delete </v-icon>
        </v-btn>
    </template>


    <!--<v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
              dark
                color="skyblue"
                flat
              >
                <v-toolbar-title>Agregar Cargo</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="cargoInput.price"
                    :rules="[v => !!v || 'Ingrese un precio']"
                    label="Precio"
                    name="price"
                    prepend-icon="mdi-account"
                    type="number"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="cargoInput.description"
                    label="Descripcion"
                    name="description"
                    prepend-icon="mdi-lock"
                    type="text"
                  ></v-text-field> 
                  <v-text-field
                    id="password"
                    v-model="cargoInput.price"
                    label="Precio"
                    name="price"
                    prepend-icon="mdi-lock"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark large color="skyblue" @click="validate">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>-->
    </v-data-table>
</template>

<script>
    import TsDataService from '@/services/TsDataService'
export default {
    data: () => ({
        dialog:false,
        valid:true,
        headers: [
          { text: 'Cliente', value:'customerFirstName'},
          { text: 'Conductor', value:'driverLastName'},
          { text: 'Peso', value:'weight'},
          { text: 'Descrpcion', value:'description'},
          { text: 'Precio', value:'servicePrice'}
        ],
        cargoes: [],
        currentCargo: null,
        currentIndex: -1,
        cargoInput :{
            serviceId: '',
            customerId: '',
            weight: '',
            description: '',
            servicePrice: '',
        },
        defaultCargo: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        },
        selectDriver: {
            driverFirstName: '',
            driverLastName: ''
        }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch:{
      dialog (val) {
            val || this.close()
      }
    },
    methods: {
        validate () {
            if(this.$ref.form.validate())
            {
                TsDataService.registerCargo(this.cargoInput);
            }
        },
        retrieveCargoes() {
          TsDataService.getAllCargoes()
            .then(response => {
              this.cargoes = response.data.resourceList;
              console.log(this.cargoes);
            })
        },
        UserInfo(item) {
          this.selectDriver.driverFirstName = this.cargoes.indexOf(item).driverFirstName 
          this.selectDriver.driverLastName = this.cargoes.indexOf(item).driverLastName
          this.dialog = true
        },
        close () {
          this.dialog = false
        },
        driverProfile() {
          this.$router.push("Drivers")
        }
    },
    mounted() {
      this.retrieveCargoes();
    }
}
</script>