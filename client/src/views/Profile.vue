<template>
    <v-container>
        <TeacherNavbar v-if="user.role=='teacher'" :t_name="user.name" />
        <v-row justify="center">
            <v-col md="6" sm="6">
                <v-card>
                    <v-card-title class="text-uppercase">
                        {{user.role == 'student' ? 'Студент' : 'Преподаватель'}}
                    </v-card-title>
                    <v-card-text>
                        <h2>{{user.name}}</h2>
                        <h4>{{user.email}}</h4>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TeacherNavbar from '@/components/TeacherNavbar'
export default {
    name: 'Profile',
    data () {
        return {
            user: {
                name: '',
                email: '',
                role: ''
            }
        }
    },
    created () {
        this.user = JSON.parse(sessionStorage.getItem('session'))
        if (!this.user) {
            this.$router.push('/')
        }
    },
    components: {
        TeacherNavbar
    }
}
</script>

<style lang="scss" scoped>

</style>