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
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
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
                    <v-text-field v-model="editedItem.password" label="Contraseña"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.firstName" label="Nombres"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastName" label="Apellidos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.role" label="Rol"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
        @click="editItem(item)"
      >
        <v-icon> mdi-pencil</v-icon>
      </v-btn>
      <v-btn class="ml-5 error"
        small
        fab
        @click="deleteItem(item)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        headers: [
            { text: 'Email', value: 'email'},
            { text: 'Password', value: 'password'},
            { text: 'First Name', value: 'firstName'},
            { text: 'Last Name', value: 'lastName'},
            { text: 'Role', value: 'role'},
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        users: [],
        editedIndex: -1,
        editedItem: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            role: ''
        },
        defaultItem: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            role: ''
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

    created () {
        this.initialize()
    },

    methods: {
        initialize () {
            this.users = [
                {
                    email: 'carlos18@gmail.com',
                    password: '123456',
                    firstName: 'Carlos Alberto',
                    lastName: 'Mamani Zuñiga',
                    role: 'Customer'
                },
                                {
                    email: 'marco19@gmail.com',
                    password: '123456',
                    firstName: 'Marco Antonio',
                    lastName: 'Mamani Zuñiga',
                    role: 'Customer'
                },
                {
                    email: 'hugo@gmail.com',
                    password: '123456',
                    firstName: 'Oscar Hugo',
                    lastName: 'Mamani Alcazar',
                    role: 'Driver'
                },
                                {
                    email: 'juan@gmail.com',
                    password: '123456',
                    firstName: 'Juan',
                    lastName: 'Rivera Huamaní',
                    role: 'Driver'
                },
            ]
        },
        
        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true            
        },

        deleteItem (item) {
            const index = this.users.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.users.splice(index,1)
        },

        close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.users[this.editedIndex], this.editedItem)
            } else {
                this.users.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>