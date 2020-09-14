<template>
    <Loader v-if="isLoading" />
    <v-container v-else>
        <StudentNavbar :s_name="student.name" />
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <h1 class="font-weight-light text-center">Мои курсы</h1>
        <v-row justify="center">
            <v-card class="ma-3" max-width="275" v-for="course in paginatedCoursesList" :key="course.c_id">
                <v-img
                    class="white--text align-end"
                    :src="course.c_poster"
                    height="200px"
                >
                    <v-card-title class="dark-bg"> {{ course.c_name }}</v-card-title>
                    <v-card-subtitle class="white--text dark-bg">
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
        <Pagination :pageSelect="pageSelect" :pages="pages" />
    </v-container>
</template>

<script>
import StudentNavbar from '@/components/Navbars/StudentNavbar'
import Loader from '@/components/Loader'
import Pagination from '@/components/Pagination'
export default {
    name: 'MyCourses',
    metaInfo: {
        title: 'Выбранные курсы | Электронный портал'
    },
    data () {
        return {
            student: {},
            coursesList: [],
            alert: {
                isShow: false,
                message: ''
            },
            isLoading: true,
            coursesPerPage: 3,
            pageNumber: 1 
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
    computed: {
        pages () {
            return Math.ceil(this.coursesList.length / this.coursesPerPage)
        },
        paginatedCoursesList () {
            let from = (this.pageNumber - 1) * this.coursesPerPage
            let to = from + this.coursesPerPage 
            return this.coursesList.slice(from, to)
        }
    },
    methods: {
        pageSelect (page) {
            this.pageNumber = page
            return this.pageNumber
        }
    },
    components: {
        StudentNavbar,
        Loader,
        Pagination
    }
}
</script>

<style lang="scss" scoped>

</style>