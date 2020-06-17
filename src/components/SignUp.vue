<template>
  <v-container display: inline-block align="center">

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >

      <v-text-field
        v-model="FirstName"
        :counter="10"
        :rules="nameRulesFN"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="LastName"
        :counter="10"
        :rules="nameRulesLN"
        label="Apellidos"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Correo"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Contraseña"
        required
        type="password"
        >
      </v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Tipo de usuario"
        required
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"  
        @click="validate"
      >
        Validate
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>

      <v-btn
        color="warning"
        @click="resetValidation"
      >
        Reset Validation
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      validFirstName: true,
      nameFirstName: 'FirstName',
      nameRulesFN: [
        v => !!v || 'Nombre es requerido',
        v => (v && v.length <= 10) || 'Nombre debe contener no mas de 10 caracteres',
      ],
      validLastName: true,
      nameLastName: 'LastName',
      nameRulesLN: [
        v => !!v || 'Apellido es requerido',
        v => (v && v.length <= 10) || 'Apellidos debe contener no mas de 10 caracteres',
      ]
      ,
      email: '',
      emailRules: [
        v => !!v || 'Correo',
        v => /.+@.+\..+/.test(v) || 'Correo must be valid',
      ],
      password: '',
      passwordRules: [
         v => (v && v.length <= 16 && v.length >= 6) || 'La contraseña debe tener entre 6 y 16',
      ],
      select: null,
      items: [
        'Cliente',
        'Driver',
      ],

    }),
    methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
  }
</script>