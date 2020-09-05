<template>
    <v-container>
        <v-app-bar app dark color="primary" v-if="isAuth">
            <v-toolbar-title>ЭОИС</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/teacher/my-courses"><v-btn class="primary">Все курсы</v-btn></router-link>
            <v-btn class="primary" @click.prevent="logout()">
                <span class="mr-3">Выйти</span>
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-app-bar>
        <h3 v-else>Вы не авторизированы</h3>
    </v-container>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                isAuth: false
            }
        },
        created () {
            if (sessionStorage.getItem('session')) {
                this.isAuth = true
            } else {
                this.isAuth = false
                this.$router.push('/auth')
            }
        },
        methods: {
            logout () {
                sessionStorage.removeItem('session')
                this.$router.push('/auth')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>