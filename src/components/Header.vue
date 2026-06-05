<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore.js';

// // TODO: 로그인 추가시 변경 필요 START
// // 보통 플러그인 만들때 is 붙임
// const isLoggedIn = ref(false);
// // TODO: 로그인 추가시 변경 필요 END
const router = useRouter();
const authStore = useAuthStore();

const redirectMain = () => {
  router.push('/');
}

const redirectLogin = () => {
  router.push('/login');
}

const redirectRegistration = () => {
  router.push('/registration');
}

const logout = async () => {
  await authStore.logout();
  router.replace('/');
}
</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain">Hipgram</h1>
    </div>
    <div class="btn-box">
      <MyButton
        v-if="!authStore.isLoggedIn"
        @click="redirectLogin"
        :content="'Sign In'"
        :color="'gray'"
        :size="'small'"
      />
      <MyButton
        v-if="!authStore.isLoggedIn"
        @click="redirectRegistration"
        :content="'Sign Up'"
        :color="'white'"
        :size="'small'"
      />
      <MyButton
        v-if="authStore.isLoggedIn"
        :content="'Logout'"
        :color="'black'"
        :size="'small'"
        @click="logout"
      />
    </div>
  </div>
  <hr>
</template>

<style scoped>
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.title-box {
  display: flex;
  align-items: center;
}
.title {
  font-size: 20px;
}
.btn-box {
  display: flex;
  gap: 10px;
}
</style>
