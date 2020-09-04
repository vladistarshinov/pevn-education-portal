<template>
    <v-container>
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <h1 class="font-weight-light text-center">Мои курсы</h1>
        <v-row justify="center">
            <v-card class="ma-3" max-width="275" v-for="course in coursesList" :key="course.c_id">
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                ></v-img>
                <v-card-title>{{course.c_name}}</v-card-title>
                <v-card-subtitle>{{course.c_description}}</v-card-subtitle>
                <v-card-actions>
                    <v-btn @click.prevent="readCourse(course.c_id)" color="blue" small dark fab><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn @click.prevent="deleteCourse(course.c_id)" color="red" small dark fab><v-icon>mdi-delete</v-icon></v-btn>
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
        <v-dialog v-model="isShowEditDialog" max-width="450">
            <v-card>
                <v-card-title>Редактировать курс</v-card-title>
                <v-card-text>
                    <v-form class="ma-3" ref="editForm" @submit.prevent="editCourse()">
                        <v-text-field
                            v-model="editingCourse.c_name"
                            prepend-icon="mdi-biohazard"
                            label="Название"
                            :rules="nameRules"
                        ></v-text-field>
                        <v-textarea
                            v-model="editingCourse.c_description"
                            prepend-icon="mdi-bike"
                            label="Описание"
                            :rules="descriptionRules"
                        ></v-textarea>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click.prevent="isShowEditDialog = !isShowEditDialog">Закрыть</v-btn>
                            <v-btn color="blue darken-1" type="submit" text>Обновить</v-btn>
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
                editingCourse: {
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
                isShowEditDialog: false,
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
                    try {
                        this.addingCourse.id = this.teacher.id
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
                        this.isShowAddDialog = false
                        this.alert = {
                            isShow: true,
                            type: 'error',
                            message: err.response.data.msg
                        }
                    }
                }
            },
            async readCourse (c_id) {
                try {
                    const res = await this.axios.get(`/teacher/course/${c_id}`)
                    this.editingCourse = res.data.course
                    this.isShowEditDialog = true
                } catch (err) {
                    this.alert = {
                        isShow: true,
                        type: 'error',
                        message: err.response.data.msg
                    }
                }
            },
            async editCourse () {
                let valid = this.$refs.editForm.validate()
                if (valid) {
                    try {
                        const res = await this.axios.put(`/teacher/course/${this.editingCourse.c_id}`, this.editingCourse)
                        const index = this.coursesList.findIndex(course => course.c_id === this.editingCourse.c_id)
                        this.coursesList[index] = this.editingCourse
                        this.isShowEditDialog = false
                        this.alert = {
                            isShow: true,
                            type: 'success',
                            message: res.data.msg
                        }
                    } catch (err) {
                        this.isShowEditDialog = false
                        this.alert = {
                            isShow: true,
                            type: 'error',
                            message: err.response.data.msg
                        }
                    }
                }
            },
            async deleteCourse (c_id) {
                try {
                    const res = await this.axios.delete(`/teacher/course/${c_id}`)
                    // console.log(res.data)
                    const index = this.coursesList.findIndex(course => course.c_id === c_id)
                    this.coursesList.splice(index, 1)
                    this.alert = {
                        isShow: true,
                        type: 'info',
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
        }
    }
</script>

<style lang="scss" scoped>

</style>