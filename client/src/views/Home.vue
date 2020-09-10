<template>
    <v-container>
        <TeacherNavbar v-if="user.role=='teacher'" :t_name="user.name" />
        <StudentNavbar v-else :s_name="user.name" />
        <h1 class="font-weight-light text-center">Добро пожаловать на портал с электронными курсами</h1>
    </v-container>
</template>

<script>
import TeacherNavbar from '@/components/TeacherNavbar'
import StudentNavbar from '@/components/StudentNavbar'
export default {
    name: 'Home',
    data () {
        return {
            user: {}
        }
    },
    created () {
        this.user = JSON.parse(sessionStorage.getItem('session'))
        if (this.user === null)  {
            this.$router.push('/auth')
            console.log(this.user);
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