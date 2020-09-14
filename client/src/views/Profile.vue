<template>
    <v-container>
        <TeacherNavbar v-if="user.role=='teacher'" :t_name="user.name" />
        <StudentNavbar v-if="user.role=='student'" :s_name="user.name" />
        <v-row justify="center">
            <v-col md="12" sm="12">
                <v-card>
                    <v-card-title class="text-uppercase">
                        Профиль пользователя
                    </v-card-title>
                    <v-card-text>
                        <v-form class="ma-3">
                            <v-text-field
                                readonly
                                prepend-icon="mdi-account"
                                label="Имя"
                                v-model="user.name"
                            ></v-text-field>
                            <v-text-field
                                readonly
                                prepend-icon="mdi-email"
                                label="Email"
                                v-model="user.email"
                            ></v-text-field>
                            <v-text-field
                                readonly
                                prepend-icon="mdi-clipboard"
                                label="Статус"
                                v-model="role"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TeacherNavbar from '@/components/Navbars/TeacherNavbar'
import StudentNavbar from '@/components/Navbars/StudentNavbar'
export default {
    name: 'Profile',
    metaInfo: {
        title: 'Профиль | Электронный портал'
    },
    data () {
        return {
            user: {
                name: '',
                email: '',
                role: ''
            },
            role: ''
        }
    },
    created () {
        this.user = JSON.parse(sessionStorage.getItem('session'))
        if (this.user.role === 'student') {
            this.role = 'Студент'
        } else if (this.user.role === 'teacher') {
            this.role = 'Преподаватель'
        } else {
            this.$router.push('/auth')
        }
    },
    components: {
        TeacherNavbar,
        StudentNavbar
    }
}
</script>

<style lang="scss" scoped>

</style>