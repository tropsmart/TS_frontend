<template>

    <v-data-table
      :headers= "headers"
      :items="favorites"
      sort-by="weight"
      @click:row="rowClick"
      class="elevation-12"
      
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Conductores Favoritos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Agregar nuevo</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="email" label="Correo"></v-text-field>
                          <v-text-field v-model="favoriteInput.driverId" label="Id"></v-text-field>
                        </v-col>
                 
                      </v-row>
                </v-container>
              </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="ml-5 error"
            small
            fab
            @click= "deleteItem(item)">
            <v-icon> mdi-delete </v-icon>
        </v-btn>
    </template>

    </v-data-table>
</template>

<script>
    import TsDataService from '@/services/TsDataService'
export default {
    data: () => ({
        dialog:false,
        valid:true,
        email: '',
        headers: [
          { text: 'Cliente', value:'user'},
          { text: 'Conductor', value:'favourited'},
          { text: 'Fecha', value:'since'},
          { text: 'Actions', value: 'actions', sorteable:false}
        ],
        favorites: [],
        currentFavorite: null,
        currentIndex: -1,
        favoriteInput :{
            customerId: 1,
            driverId: '',
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
        rowClick: function (item, row) {      
        row.select(true);
        console.log(item);
        //item  - selected item
        },
        registerFavourite () {
            if(this.$ref.form.validate())
            {
                TsDataService.setFavorite(this.favoriteInput.customerId,this.favoriteInput.driverId);
            }
        },
        retrieveFavourites() {
          TsDataService.getAllFavoritesByUserId(this.$store.state.auth.user.id)
            .then(response => {
              this.favorites = response.data.resourceList;
              console.log(this.favorites);
            })
        },
        driverProfile() {
          this.$router.push("Drivers")
        },
        deleteItem(item){
          confirm(`Estas seguro que quieres eliminar a ${item.favourited} de tu lista de favoritos?`);
          TsDataService.deleteFavoriteByUserIdAndFavoriteId(this.$store.state.auth.user.id, item.id)
          .then(response => {
            this.refreshList()
            if(response.data.success == true)
              alert("Favorito eliminado");
            
          })
        },
        refreshList() {
          this.retrieveFavourites();
          this.currentFavorite = null,
          this.currentIndex = -1
        },
        save () {
          TsDataService.setFavorite(this.favoriteInput.customerId,this.favoriteInput.driverId)
            .then(response => {
              this.refreshList()
              if(response.data.success == true)
                alert("El conductor se agrego a favoritos");
              else
                alert("Hubo un error al agregar al conductor a su favoritos");
              this.dialog = false
            })
        },
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.currentIndex = -1
          })
        },
        redirectManager(path) {
          this.$router.push(path).catch(()=>{});
        }, 
    },

    mounted() {
      if(this.$store.state.auth.user != undefined)
      {
        this.retrieveFavourites();
      }
      else
      {
        this.redirectManager("sign-in");
      }
    }
}
</script>