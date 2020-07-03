<template>
     <v-parallax src="https://www.xtrafondos.com/wallpapers/lienzo-azul-3424.jpg" height="100%" class="parallax">

        <v-content fill-height>
            <template>
              <v-card-text >
                <v-row align="center" justify="center">
                    <v-col cols="12">
                    <p class="text-center">Menu principal</p>
                    </v-col>
                    <v-card-actions>
                        <v-container>
                             <!-- 
                            1.- Cargos -> Customer
                            2.- Buscar Transportista -> Customer
                            3.- Favoritos -> Customer
                            4.- Reseñas -> Driver
                            5.- Bloqueados -> Both
                            -->
                            <v-row tile text dense dark v-if="rowVisible" color="white" group>
                                <v-col><v-btn tile text dense dark color="white" group @click="select(1)">Cargos</v-btn></v-col>
                                <v-col><v-btn v-if="this.$store.state.auth.user.role==1" tile text dense dark color="white" group @click="select(2)">Buscar</v-btn></v-col>
                                <v-col><v-btn v-if="this.$store.state.auth.user.role==1" tile text dense dark color="white" group @click="select(5)">Favoritos</v-btn></v-col>
                                <v-col><v-btn v-if="this.$store.state.auth.user.role==2" tile text dense dark color="white" group @click="select(6)">Reseñas</v-btn></v-col>
                                <v-col><v-btn tile text dense dark color="white" group @click="select(7)">Bloqueados</v-btn></v-col>
                                <v-col><v-btn tile text dense dark color="white" group value="justify">Noticias</v-btn></v-col>

                            </v-row>
                        </v-container>
                    </v-card-actions>
                   
                        
                </v-row>
   
               </v-card-text>
            </template>

        </v-content>


        <!-- CARD PRESENTER =============================================================================-->
        <v-content>
             <v-card
            color="white"
            light
            rounded
            class="rounded-corner pa-5"
          >
                <!-- 
                    1.- Cargos -> Customer
                    2.- Buscar Transportista -> Customer
                    3.- Cargos Solicitados -> Driver 
                    4.- Hisotial de cargos -> Driver
                    5.- Favoritos -> Customer
                    6.- Reseñas -> Driver
                    7.- Bloqueados -> Both
                -->
            <div v-if=" this.state==1"><Cargoes></Cargoes></div>
            <div v-if=" this.state==2">
                <v-text-field label="Buscar transportista" outlined clearable
                name="login" type="text" class="pa-5"></v-text-field>
                <UserList></UserList>
            </div>
            <div v-if=" this.state==3"><Favorites></Favorites></div>


            <v-card-title class="headline">Empieza a manejar tus envios de manera remota</v-card-title>

            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>

        </v-content>
        </v-parallax>

</template>

<script>
export default {
    name: 'MainMenu',
    props: ['UpdateParentView'],
    data: () => ({
        dialog: false,
        valid: false,
        rowVisible:false,
        state: 0
    }),
    methods: {
        select(value) {
            this.state = value
        },

    },
    mounted() {
        console.log("store user : ",this.$store.state.auth.user)
        this.rowVisible = true;
    }
}
</script>

<style scoped>
    .rounded-corner{
    border-radius:20px;
}
</style>