<template>
    <Loader v-if="isLoading" />
    <v-container v-else>
        <StudentNavbar :s_name="student.name" />
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <h1 class="font-weight-light text-center">Все курсы</h1>
        <v-row justify="center">
            <v-card class="v-card ma-3" max-width="275" v-for="course in coursesList" :key="course.c_id">
                <v-img
                    class="align-end"
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                >
                    <v-card-title v-if="course.cc_id == null" class="orange--text">{{ course.c_name }}</v-card-title>
                    <v-card-title v-else class="yellow--text">{{ course.c_name }}</v-card-title>
                    <v-card-subtitle class="white--text">
                        <div><b>Преподаватель: </b>{{ course.t_name }}</div>
                    </v-card-subtitle>
                </v-img>
                <v-card-text>
                    <div><b><u>E-mail:</u></b> {{ course.t_email }}</div>
                    {{ course.c_description }}
                </v-card-text>
                <v-card-actions v-show="course.cc_id == null">
                    <v-spacer></v-spacer>
                    <v-btn @click="joinInCourse(course.c_id)" dark absolute right color="indigo">Вступить</v-btn>
                </v-card-actions>
                <v-card-actions v-show="course.cc_id != null">
                    <v-btn absolute right dark color="orange darken-3">Вы участник курса</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>  
    </v-container>
</template>

<script>
import StudentNavbar from '@/components/StudentNavbar'
import Loader from '@/components/Loader'
    export default {
        name: 'StudCourses',
        data () {
            return {
                student: {},
                coursesList: [],
                alert: {
                    isShow: false,
                    message: ''
                },
                isLoading: true
            }
        },
        async created () {
            this.student = JSON.parse(sessionStorage.getItem('session'))
            if (this.student == null) {
                this.$router.push('/')
            } else if (this.student.role != 'student') {
                this.$router.push('/profile')
            } else {
                try {
                    const res = await this.axios.get(`/student/courses/${this.student.id}`)
                    this.coursesList = res.data
                    const newRes = await this.axios.post('/student/my-courses', this.student)
                    const myCoursesList = newRes.data
                    for (let i = 0; i <= myCoursesList.length - 1; i++) {
                        const idx = this.coursesList.findIndex(c => c.c_id == myCoursesList[i].c_id)
                       // this.coursesList.splice(idx, 1)
                        this.coursesList.splice(idx, 1, myCoursesList[i])
                    }
                    this.isLoading = false
                } catch (err) {
                    this.alert = {
                        isShow: true,
                        type: 'error',
                        message: err.response.data.msg
                    }
                }
            }
        },
        methods: {
            async joinInCourse (c_id) {
                try {
                    const res = await this.axios.post(`/student/course/${c_id}`, this.student)
                    // перерисовка DOM-дерева после вступления в курс
                    const index = this.coursesList.findIndex(c => c.c_id == c_id)
                    this.coursesList.splice(index, 1)
                    this.alert = {
                        isShow: true,
                        type: 'success',
                        message: res.data.msg
                    }
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
            StudentNavbar,
            Loader
        }
    }
</script>