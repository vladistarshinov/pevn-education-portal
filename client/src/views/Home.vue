<template>
    <v-container>
        <TeacherNavbar :t_name="info.name" />
        <h2 class="font-weight-light text-center">Добро пожаловать на портал с электронными курсами</h2>
    </v-container>
</template>

<script>
import TeacherNavbar from '@/components/TeacherNavbar'
export default {
    name: 'Home',
    data () {
        return {
            info: {},
            teacherAuth: false,
            studentAuth: false
        }
    },
    created () {
        const info = JSON.parse(sessionStorage.getItem('session'))
        if (info.role === 'teacher') {
            this.teacherAuth = true
            this.info.name = info.name
        } else if (info.role === 'student') {
            this.studentAuth = true
            this.info.name = info.name
        } else {
            this.$router.push('/auth')
        }
    },
    components: {
        TeacherNavbar
    }
}
</script>

<style lang="scss" scoped>

</style>