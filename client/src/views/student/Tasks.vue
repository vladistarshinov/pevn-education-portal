<template>
    <v-container class="text-center">
        <StudentNavbar :s_name="student.name" />
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <h1 class="font-weight-light">{{ course.c_name }}</h1>
        <h2 class="font-weight-thin">{{ course.c_description }}</h2>
        <v-row justify="center">
            <v-col md="12" sm="12">
                <v-simple-table fixed-headers>
                    <thead>
                        <tr>
                            <th class="text-center">Название</th>
                            <th class="text-center">Описание</th>
                            <th class="text-center">Файл задания</th>
                            <th class="text-center">Статус доставки</th>
                            <th class="text-center">Файл ответа</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task in tasksList" :key="task.h_id">
                            <td class="text-center">{{ task.h_name }}</td>
                            <td class="text-center">{{ task.h_description }}</td>
                            <td class="text-center">
                                <v-icon color="success" @click.prevent="open(task.h_file)">mdi-file-pdf</v-icon>
                            </td>
                            <td class="text-center" v-if="task.d_file===null">
                                <v-icon @click.prevent="openForm(task.h_id)">mdi-cloud-upload</v-icon>
                            </td>
                            <td class="text-center" v-else>
                                <v-icon color="success">mdi-cloud-check</v-icon>
                            </td>
                            <td class="text-center" color="info" @click.prevent="open(task.d_file)">
                                {{task.d_filename}}
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-dialog v-model="isShowAddDialog" max-width="350">
            <v-card>
                <v-card-title>Загрузка домашнего задания</v-card-title>
                <v-card-text>
                    <v-form ref="addDeliveryForm" class="ma-3" @submit.prevent="createDelivery()">
                        <v-file-input
                            label="Домашнее задание"
                            v-model="addingDelivery.d_file"
                            :rules="[(v) => !!v || 'Задание не загружено']"
                        ></v-file-input>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text 
                                @click.prevent="isShowAddDialog = !isShowAddDialog"
                            >Закрыть</v-btn>
                            <v-btn color="blue darken-1" type="submit" text>Отправить</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import StudentNavbar from '@/components/StudentNavbar'
export default {
    name: 'StudTasks',
    data () {
        return {
            student: {},
            course: {},
            tasksList: [],
            isShowAddDialog: false,
            addingDelivery: {},
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
                const res = await this.axios.get(`/student/tasks/${this.$route.params.c_id}/${this.student.id}`)
                this.course = res.data.course
                this.tasksList = res.data.tasks
                console.log(this.tasksList);
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
        open(link) {
            window.open(link)
        },
        openForm(h_id) {
            this.addingDelivery.h_id = h_id
            this.isShowAddDialog = true
        },
        async createDelivery() {
            let valid = this.$refs.addDeliveryForm.validate()
            if (valid) {
                try {
                    const delivery = new FormData()
                    delivery.append('id', this.student.id)
                    delivery.append('h_id', this.addingDelivery.h_id)
                    delivery.append('d_file', this.addingDelivery.d_file)
                    const res = await this.axios.post('/student/delivery', delivery)
                    const idx = this.tasksList.findIndex(t => t.h_id == this.addingDelivery.h_id)
                    this.tasksList[idx].d_file = res.data.d_file
                    this.tasksList[idx].d_filename = res.data.d_filename
                    this.isShowAddDialog = false
                    this.$refs.addDeliveryForm.reset()
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
        }
    },
    components: {
        StudentNavbar
    }
}
</script>

<style lang="scss" scoped>

</style>