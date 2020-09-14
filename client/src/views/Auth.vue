<template>
  <v-container>
    <v-main v-if="isAuth">
      <v-row justify="center">
        <v-col md="8" sm="8">
          <v-alert text v-model="alert.isShow" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
          <v-card>
            <v-card-title>Давайте вернемся на главную</v-card-title>
            <v-card-text>
                <router-link to='/'><v-btn block class="primary mt-3">Вернуться</v-btn></router-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <v-main v-else>
      <v-row justify="center">
        <v-col class="text-center" md="6" sm="6">
          <v-tabs>
            <v-tab class="my-2" @click.prevent="selectAuth = true">Регистрация</v-tab>
            <v-tab class="my-2" @click.prevent="selectAuth = false">Вход</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col md="8" sm="8">
          <Register v-if="selectAuth" />
          <Login v-else />
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Auth/Register'
import Login from '@/components/Auth/Login'
export default {
  name: 'Auth',
  metaInfo: {
    title: 'Аутентификация | Электронный портал'
  },
  components: {
    Register,
    Login
  },
  data () {
    return {
      selectAuth: true,
      isAuth: false,
      alert: {
        isShow: false,
        message: ''
      }
    }
  },
  created () {
    const authUser = JSON.parse(sessionStorage.getItem('session'))
    if (authUser) {
      this.alert = {
          isShow: true,
          type: 'info',
          message: 'Вы уже авторизированы в системе'
      }
      this.isAuth = true
    }
  },
}
</script>
<style lang="scss">
  .v-tabs {
    display: flex;
    justify-content: center;
  }
</style>

