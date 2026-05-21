<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import myAxios from '../../api/myAxios.js';

// TODO: 테스트용 나중에 삭제 START
// const testList = [
//   "/test/소전콘_95식.png"
//   , "/test/소전콘_m16.png"
//   , "/test/소전콘_mp40.png"
//   , "/test/소전콘_초코.png"
//   , "/test/소전콘_웰로드.png"
//   , "/test/소전콘_빼액.png"
// ];
// TODO: 테스트용 나중에 삭제 END

const posts = ref([]);
const isLastPage = ref(false);
let currentPage = 1;

// 함수
const getPostPagination = async () => {
  // 마지막 페이지가 아닐 경우만 실행
  if(!isLastPage.value) {
    try {
      const url = '/api/posts';
      // config에 들어가는 속성명이 정해져 있음. 무조건 params 사용
      const params = {
        page: currentPage
      };
  
      const res = await myAxios.get(url, { params });
      const data = res.data.data;
      isLastPage.value = data.lastPage;
      posts.value.push(...data.posts);
    } catch(error) {
        console.error(error);
    }
  }
}

// 라이프 사이클
onBeforeMount(getPostPagination);


</script>

<template>
  <div class="card-container">
    <div
      v-for="item in posts"
      :key="item.id"
      class="card"
      :style="{backgroundImage: `url(${item.image})`}"
    ></div>
  </div>
  <MyButton
    v-if="!isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'Show more posts from hippie'" />
</template>

<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
.card {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>
