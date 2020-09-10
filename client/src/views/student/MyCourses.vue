<template>
    <v-container>
        <StudentNavbar :s_name="student.name" />
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <h1 class="font-weight-light text-center">Мои курсы</h1>
        <v-row justify="center">
            <v-card class="ma-3" max-width="275" v-for="course in coursesList" :key="course.c_id">
                <v-img
                    class="white--text align-end"
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                >
                    <v-card-title>{{ course.c_name }}</v-card-title>
                    <v-card-subtitle class="white--text">
                        <div><b>Преподаватель: </b>{{ course.t_name }}</div>
                    </v-card-subtitle>
                </v-img>
                <v-card-text>
                    <div><b><u>E-mail:</u></b> {{ course.t_email }}</div>
                    {{ course.c_description }}
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text dark color="purple" 
                        @click.prevent="$router.push(`/student/tasks/${course.c_id}`)"
                    >Открыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import StudentNavbar from '@/components/StudentNavbar'
export default {
    name: 'MyCourses',
    data () {
        return {
            student: {},
            coursesList: [],
            alert: {
                isShow: false,
                message: ''
            }
        }
    },
    async created () {
            this.student = JSON.parse(sessionStorage.getItem('session'))
            if (this.student === null) {
                this.$router.push('/')
            } else if (this.student.role !== 'student') {
                this.$router.push('/profile')
            } else {
                try {
                    const res = await this.axios.post('/student/my-courses', this.student)
                    this.coursesList = res.data
                } catch (err) {
                    this.alert = {
                        isShow: true,
                        type: 'error',
                        message: err.response.data.msg
                    }
                }
            }
    },
    components: {
        StudentNavbar
    }
}
</script>

<style lang="scss" scoped>

</style>