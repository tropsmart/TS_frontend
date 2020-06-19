<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height fluid">
                    
                <v-btn class="ma-5" dark large color="skyblue" :to="{name: 'Cargoes'}">Agregar cargo</v-btn>
                <v-btn class="ma-5" dark large color="success" :to="{name: 'Favorites'}">Lista de Favoritos</v-btn>
                <v-btn class="ma-5" dark large color="error" :to="{name: 'Blockeds'}">Lista de bloqueados</v-btn>
                <v-btn class="ma-5" dark large color="purple">Lista de transacciones</v-btn>
            </v-container>
        </v-content>   
    </v-app>
</template>

<script>
export default {
    data: () => ({
        valid: false
    })
}
</script>