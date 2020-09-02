<template>
    <div>
        <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
        <v-card>
          <v-card-title>Регистрация</v-card-title>
          <v-card-text>
            <v-form class="ma-3" ref="registerForm" lazy-validation @submit.prevent="register()">
              <v-text-field 
                label="Имя" 
                prepend-icon="mdi-account"
                :rules="nameRules"
                v-model="user.name"
              >
              </v-text-field>
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
              <v-btn block class="primary mt-3" type="submit">Регистрация</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                nameRules: [
                    v => !!v || 'Введите имя',
                    v => (v && v.length >= 3) || 'Имя должно содержать не менее 3 букв или цифр'
                ],
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
                    name: '',
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
            async register () {
                let valid = this.$refs.registerForm.validate()
                console.log(this.user)
                if (valid) {
                    try {
                        const res = await this.axios.post('/register', this.user)
                        this.$refs.registerForm.reset()
                        sessionStorage.setItem('session', JSON.stringify(res.data))
                        this.alert = {
                            isShow: true,
                            type: 'success',
                            message: 'Вы успешно зарегистрированы в системе'
                        }
                        this.$router.push('/')
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