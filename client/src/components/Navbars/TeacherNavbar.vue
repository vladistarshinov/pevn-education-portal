<template>
    <div>
        <v-app-bar app dark class="indigo" v-if="isAuth">
            <router-link to="/" class="mr-3"><v-icon>mdi-image-filter-drama</v-icon></router-link>
            <v-toolbar-title>ЭОИС</v-toolbar-title>
            <v-spacer></v-spacer>   
            <v-btn class="d-none d-sm-flex" text to="/teacher/my-courses">Мои курсы</v-btn>
            <span class="d-none d-sm-flex">|</span>   
            <v-menu offset-y="">
                <template v-slot:activator="{ attrs, on }">
                    <v-btn class="d-none d-sm-flex" text v-bind="attrs" v-on="on">{{t_name}}</v-btn>
                    <v-btn class="d-flex d-sm-none" fab small text v-bind="attrs" v-on="on"><v-icon>mdi-menu</v-icon></v-btn>
                </template>
                <v-list>
                    <v-list-item class="d-flex d-sm-none">
                        <span>{{t_name}}</span>
                    </v-list-item>
                    <v-list-item class="d-flex d-sm-none" to="/teacher/my-courses">
                        <v-icon class="mr-3" color="success darken-2">mdi-school</v-icon>
                        <span>Moи курсы</span>
                    </v-list-item>
                    <v-list-item to="/profile">
                        <v-icon class="mr-3">mdi-account-outline</v-icon>
                        <span>Профиль</span>
                    </v-list-item>
                    <v-list-item @click.prevent="logout()">
                        <v-icon class="mr-3">mdi-export</v-icon>
                        <span>Выйти</span>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isAuth: false
            }
        },
        created () {
            if (sessionStorage.getItem('session') && JSON.parse(sessionStorage.getItem('session')).role === 'teacher') {
                this.isAuth = true
            } else {
                this.isAuth = false
                this.$router.push('/auth')
            }
        },
        methods: {
            logout () {
                sessionStorage.clear()
                this.$router.push('/auth')
            }
        },
        props: ['t_name']
    }
</script>

<style lang="scss" scoped>

</style>