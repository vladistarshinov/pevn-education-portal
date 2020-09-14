<template>
    <Loader v-if="isLoading" />
    <v-container v-else>
        <TeacherNavbar v-if="user.role=='teacher'" :t_name="user.name" />
        <StudentNavbar v-else :s_name="user.name" />
        <h1 class="font-weight-light text-center">Добро пожаловать на портал с электронными курсами</h1>
    </v-container>
</template>

<script>
import TeacherNavbar from '@/components/Navbars/TeacherNavbar'
import StudentNavbar from '@/components/Navbars/StudentNavbar'
import Loader from '@/components/Loader'
export default {
    name: 'Home',
    metaInfo: {
        title: 'Главная | Электронный портал'
    },
    data () {
        return {
            user: {},
            isLoading: true
        }
    },
    created () {
        this.user = JSON.parse(sessionStorage.getItem('session'))
        if (this.user === null)  {
            this.$router.push('/auth')
        }
        this.isLoading = false
    },
    components: {
        Loader,
        TeacherNavbar,
        StudentNavbar
    }
}
</script>

<style lang="scss" scoped>
</style>