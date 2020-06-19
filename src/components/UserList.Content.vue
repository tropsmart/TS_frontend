<template>
    <v-data-table
    :headers="headers"
    :items="users"
    sort-by="calories"
    class="elevation-1"
    >

    <template v-slot:top>
        <v-toolbar flat color="white">
            <v-toolbar-title>Usuarios Registrados</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.email" label="Correo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.role" label="Rol"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.firstName" label="Nombres"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastName" label="Apellidos"></v-text-field>
                  </v-col>
                  <!--<v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.role" label="Rol"></v-text-field>
                  </v-col>-->
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
    </v-data-table>
  <!--<div>
      <table>
        <tbody>
            <tr v-for="user in users" :key="user.id"> 
              <td>{{ user.email }}</td>  
              <td>{{ user.password }}</td>  
              <td>{{ user.firstName }}</td>  
              <td>{{ user.lastName }}</td>  
            </tr>
        </tbody>
      </table>
  </div>-->
</template>

<script>
import TsDataService from '@/services/TsDataService'
export default {
    name: 'UserList',
    data: ()=>({
        dialog: false,
        headers: [
            { text: 'FirstName', value: 'firstName' },
            { text: 'LastName', value: 'lastName' },
            { text: 'Email', value: 'email' },
            { text: 'Role', value: 'role'},
            { text: 'Actions', value: 'actions', sorteable: false}
        ],
        users: [],
        responseAPI: '',
        currentUser: null,
        currentIndex: -1,
        editedItem: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        },
        defaultItem: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    methods: {
        retrieveUsers() {
            TsDataService.getAllUsers()
                .then(response => {
                    this.users = response.data.resourceList;
                    console.log(this.users);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        refreshList() {
                this.retrieveUsers();
                this.currentUser = null;
                this.currentIndex = -1;
        },
        removeAllUsers() {
                TsDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                })
        },
        setActiveTutorial(user, index) {
            this.currentUser = user;
            this.currentIndex = index;
        },
        searchId() {
            TsDataService.findById(this.userId)
            .then(response => {
                this.currentUser = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        },
        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            //const index = this.users.indexOf(item)
            confirm('Are you sure you want to delete this item?'+item)
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        save () { 
        }
    },
    mounted() {
            
            this.retrieveUsers();
        }

}

</script>