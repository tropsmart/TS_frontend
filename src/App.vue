<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
        <v-content fluid>
     <router-view/>
    </v-content>

    <div class="v-content" fluid data-booted="true" style="padding: 56px 0xp 36px;">
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="secondary--text" style="text-style:bold"></v-toolbar-title>
      <v-spacer></v-spacer>
     <v-btn
        text
        color="success" :to="{name: 'SignUp'}"
      >
        <span class="mr-2" >Registrar</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn
      text
      :to="{name: 'SignIn'}"
      >
      <span class="mr-2 ">Iniciar Sesion</span>
      <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    </div>


    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
    }),
    created () {
      this.$vuetify.theme.light = true
    },
  }
</script>


