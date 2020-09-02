<template>
  <v-container>
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
  </v-container>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register'
import Login from '@/components/Login'
export default {
  name: 'Auth',
  components: {
    Register,
    Login
  },
  data () {
    return {
      selectAuth: true
    }
  }
}
</script>
<style lang="scss">
  .v-tabs {
    display: flex;
    justify-content: center;
  }
</style>

