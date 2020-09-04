<template>
    <v-container>
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <h1 class="font-weight-light">My courses</h1>
        <v-row justify="center">
            <v-card class="ma-3" max-width="275" v-for="course in coursesList" :key="course.c_id">
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                ></v-img>
                <v-card-title>{{course.c_name}}</v-card-title>
                <v-card-subtitle>{{course.c_description}}</v-card-subtitle>
                <v-card-actions>
                    <v-btn color="blue" small dark fab><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn color="red" small dark fab><v-icon>mdi-delete</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
        <v-dialog v-model="isShowAddDialog" max-width="450">
            <v-card>
                <v-card-title>Создать курс</v-card-title>
                <v-card-text>
                    <v-form class="ma-3" ref="addForm" @submit.prevent="addCourse()">
                        <v-text-field
                            v-model="addingCourse.c_name"
                            prepend-icon="mdi-biohazard"
                            label="Название"
                            :rules="nameRules"
                        ></v-text-field>
                        <v-textarea
                            v-model="addingCourse.c_description"
                            prepend-icon="mdi-bike"
                            label="Описание"
                            :rules="descriptionRules"
                        ></v-textarea>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click.prevent="isShowAddDialog = !isShowAddDialog">Закрыть</v-btn>
                            <v-btn color="blue darken-1" type="submit" text>Сохранить</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-btn @click.prevent="isShowAddDialog = true" color="red" large right fixed bottom fab dark>
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        name: 'Courses',
        data () {
            return {
                teacher: {},
                coursesList: [],
                addingCourse: {
                    c_name: '',
                    c_description: ''
                },
                nameRules: [
                    v => !!v || 'Введите название курса'
                ],
                descriptionRules: [
                    v => !!v || 'Введите описание курса'
                ],
                isShowAddDialog: false,
                alert: {
                    isShow: false,
                    message: ''
                }
            }
        },
        async created () {
            this.teacher = JSON.parse(sessionStorage.getItem('session'))
            if (this.teacher == 'null') {
                this.$router.push('/auth')
            } else if (this.teacher.role !== 'teacher') {
                this.$router.push('/profile')
            } else {
                try {
                    const res = await this.axios.post('/teacher/my-courses', this.teacher)
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
        methods: {
            async addCourse () {
                let valid = this.$refs.addForm.validate()
                if (valid) {
                    this.addingCourse.id = this.teacher.id
                    try {
                        const res = await this.axios.post('/teacher/course', this.addingCourse)
                        this.coursesList.push(res.data.course)
                        this.$refs.addForm.reset()
                        this.isShowAddDialog = false
                        this.alert = {
                            isShow: true,
                            type: 'success',
                            message: res.data.msg
                        }
                    } catch (err) {

                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>