/* eslint-disable no-unused-vars */
<template>
  <v-app id="inspire" style="background-color:#1565C0">
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
                <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="signInInput.email"
                    :rules="[v => !!v || 'Ingrese un email']"
                    label="Correo"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    v-model="signInInput.password"
                    :rules="[v => !!v || 'Ingrese una contraseña']"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
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
  </v-app>
</template>

<script>

export default {
    data: () => ({
      valid:false,
      signInInput : { 
        email: '',
        password: ''
      }
    }),
    props: {
      source: String,
    },
    mounted() {
      
    },
    methods: {
      validate () {              
        if(this.$refs.form.validate())
        {
          console.log("signInInput : ",this.signInInput);
          this.$store.dispatch('auth/login', this.signInInput)
                .then( () =>{
                  this.$router.push("/profile").catch(()=>{}),
                error => {
                  this.loading = false;
                  this.message = (error.response && error.response.data)
                            || error.message || error.toString();
                }
              });
              
          /*TsDataService.login(this.signInInput)
          .then(response => {
            if(response.data.success==true)
            {
              console.log("auth.user :",response.data.resource)
              
            }
            else
              alert("Credenciales no validas")
          })*/
        }
      },
      reload()
        {
            var location = this.$route.fullPath

            this.$router.replace('')

            this.$nextTick(() => this.$router.replace(location))
        }
    }
   
    }
</script>
