<template>
    <div>
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <v-card>
          <v-card-title>Вход</v-card-title>
          <v-card-text>
            <v-form class="ma-3" ref="loginForm" lazy-validation @submit.prevent="login()">
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
                user: {
                    email: '',
                    password: ''
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
                            this.$router.push('/')
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