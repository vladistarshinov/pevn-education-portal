<template>
    <Loader v-if="isLoading" />
    <v-container v-else class="text-center">
        <TeacherNavbar :t_name="teacher.name" />
        <v-alert class="text-start" text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <h1 class="font-weight-light">{{course.c_name}}</h1>
        <h2 class="font-weight-thin">{{course.c_description}}</h2>
        <v-row justify="center">
            <v-col md="12" sm="12">
                <v-simple-table fixed-headers>
                    <thead>
                        <tr>
                            <th class="text-center">Название</th>
                            <th class="text-center">Описание</th>
                            <th class="text-center">Файл</th>
                            <th class="text-center">Статус доставки</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task in tasksList" :key="task.h_id">
                            <td class="text-center">{{ task.h_name }}</td>
                            <td class="text-center">{{ task.h_description }}</td>
                            <td class="text-center">
                                <v-icon color="green darken-1" @click="open(task.h_file)"
                                >mdi-file-pdf</v-icon>
                            </td>
                            <td class="text-center">
                                <v-icon color="cyan darken-1" @click="readDeliveries(task.h_id)"
                                >mdi-book-open-page-variant</v-icon>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>

        <v-dialog v-model="isShowAddDialog" max-width="450">
            <v-card>
                <v-card-title>Создать новое задание</v-card-title>
                <v-card-text>
                    <v-form ref="addtaskForm" class="ma-3" @submit.prevent="createTask()">
                        <v-text-field 
                            v-model="addingTask.h_name"
                            prepend-icon="mdi-biohazard" 
                            label="Название задания"
                            :rules="nameRules"
                        ></v-text-field>
                        <v-textarea
                            v-model="addingTask.h_description"
                            prepend-icon="mdi-bike"
                            label="Описание задания"
                            :rules="descriptionRules"
                        ></v-textarea>
                        <v-file-input 
                            v-model="addingTask.h_file" 
                            label="Файл" 
                            :rules="fileRules"
                        ></v-file-input>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text 
                                @click.prevent="isShowAddDialog = !isShowAddDialog"
                            >Закрыть</v-btn>
                            <v-btn color="blue darken-1" type="submit" text>Сохранить</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="isShowDeliveriesDialog" max-width="450">
            <v-simple-table fixed-headers>
                <thead>
                    <tr>
                        <th class="text-center">Имя студента</th>
                        <th class="text-center">Файл</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="delivery in deliveriesList" :key="delivery.d_id" class="text-center">
                        <td>{{ delivery.s_name }}</td>
                        <td>
                            <a @click="open(delivery.d_file)">{{delivery.d_filename}}</a>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-dialog>

        <v-btn @click.prevent="isShowAddDialog = true" color="deep-orange" large right fixed bottom fab dark>
            <v-icon>mdi-plus</v-icon>
        </v-btn>  
    </v-container>
</template>

<script>
import TeacherNavbar from '@/components/TeacherNavbar'
import Loader from '@/components/Loader'
export default {
    name: 'Tasks',
    metaInfo: {
        title: 'Мои задания | Электронный портал'
    },
    data () {
        return {
            teacher: {},
            course: {},
            tasksList: [],
            deliveriesList: [],
            isShowAddDialog: false,
            isShowDeliveriesDialog: false,
            addingTask: {},
            fileRules: [
                v => !!v || 'Загрузите файл'
            ],
            nameRules: [
                v => !!v || 'Введите название задания'
            ],
            descriptionRules: [
                v => !!v || 'Введите краткое описание задания'
            ],
            alert: {
                isShow: false,
                message: ''
            },
            isLoading: true
        }
    },
    created () {
        this.teacher = JSON.parse(sessionStorage.getItem('session'))
        if (this.teacher == null) {
            this.$router.push('/auth')
        } else if (this.teacher.role !== 'teacher') {
            this.$router.push('/profile')
        } else {
            this.axios.get(`/teacher/course/${this.$route.params.c_id}`)
            .then(res => {
                this.course = res.data.course
            })
            .catch (err => {
                console.log(err)
            })

            this.axios.get(`/teacher/course-tasks/${this.$route.params.c_id}`)
            .then(res => {
                this.tasksList = res.data
            })
            .catch (err => {
                console.log(err)
            })
            this.isLoading = false
        }
    },
    methods: {
        open(link) {
            window.open(link)
        },
        async createTask() {
            let valid = this.$refs.addtaskForm.validate()
            if (valid) {
                try {
                    const newTask = new FormData()
                    newTask.append('h_name', this.addingTask.h_name)
                    newTask.append('h_description', this.addingTask.h_description)
                    newTask.append('h_file', this.addingTask.h_file)
                    const res = await this.axios.post(`/teacher/task/${this.$route.params.c_id}`, newTask)
                    this.tasksList.push(res.data.task)
                    this.$refs.addtaskForm.reset
                    this.isShowAddDialog = false
                    this.alert = {
                        isShow: true,
                        type: 'success',
                        message: res.data.msg
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async readDeliveries(h_id) {
            try {
                const res = await this.axios.get(`/teacher/deliveries/${h_id}`)
                this.deliveriesList = res.data
                this.isShowDeliveriesDialog = true
            } catch (err) {
                console.log(err)
            }
        }
    },
    components: {
        TeacherNavbar,
        Loader
    }
}
</script>

<style lang="scss" scoped>

</style>