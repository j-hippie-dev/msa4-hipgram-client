<script setup>
import MyError from '../pages/errors/MyError.vue';
import { useMyErrorStroe } from '../store/error/useMyErrorStore';

// const { isError } = useMyErrorStroe(); // err: (별칭 사용 방법) // 구조 분해로 가져오면 반응성을 잃어버림.
const myErrorStore = useMyErrorStroe();
</script>

<template>
  <MyError v-if="myErrorStore.isError"></MyError>
  <router-view v-else></router-view>
</template>
