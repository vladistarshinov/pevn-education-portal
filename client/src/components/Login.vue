<template>
    <div>
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <v-card>
          <v-card-title>Вход</v-card-title>
          <v-card-text>
            <v-form class="ma-3" ref="loginForm" @submit.prevent="login()">
              <v-text-field 
                label="E-mail" 
                prepend-icon="mdi-email"
                :rules="emailRules"
                v-model="user.email"
              >
              </v-text-field>
              <v-text-field 
                label="Пароль" 
                prepend-icon="mdi-lock" 
                type="password"
                :rules="passwordRules"
                v-model="user.password"
              >
              </v-text-field>
              <v-radio-group row :rules="roleRules" v-model="user.role">
                <v-radio label="Студент" value="student"></v-radio>
                <v-radio label="Преподаватель" value="teacher"></v-radio>
              </v-radio-group>
              <v-btn block class="primary mt-3" type="submit">Вход</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                emailRules: [
                    v => !!v || 'Введите email',
                    v => /.+@.+\..+/.test(v) || 'Введите корректный email'
                ],
                passwordRules: [
                    v => !!v || 'Введите пароль',
                    v => (v && v.length > 5) || 'Пароль должен содержать не менее 6 символов'
                ],
                 roleRules: [
                    v => !!v || 'Выберите свой статус'
                ],
                user: {
                    email: '',
                    password: '',
                    role: ''
                },
                alert: {
                    isShow: false,
                    message: ''
                }
            }
        },
        methods: {
            async login () {
                let valid = this.$refs.loginForm.validate()
                if (valid) {
                    try {
                        const res = await this.axios.post('/login', this.user)
                        if (res.data.notFound) {
                            this.alert = {
                                isShow: true,
                                type: 'error',
                                message: res.data.msg
                            }
                        } else {
                            sessionStorage.setItem('session', JSON.stringify(res.data))
                            this.alert = {
                                isShow: true,
                                type: 'success',
                                message: 'Добро пожаловать'
                            }
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
    }
</script>

<style lang="scss" scoped>

</style>