<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { usePostIndexStore }  from '../../store/post/usePostIndexStore.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';
import { useRouter } from 'vue-router';

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

//  -------------------store로 이관 START-------------------
// const posts = ref([]);
// const isLastPage = ref(false);
// let currentPage = 0;

// // 함수
// // (page =  1): default값 설정해줌.
// const getPostPagination = async (page = 1) => { // (page) -> 매개변수로 받기(외부에서 전달)
//   // 마지막 페이지가 아닐 경우만 실행
//   if(!isLastPage.value) {
//     try {
//       const url = '/api/posts';
//       // config에 들어가는 속성명이 정해져 있음. 무조건 params 사용
//       const params = {
//         // page: currentPage // 직접적으로 쓰는 것보다 외부에서 전달받는게 좋음.
//         page
//       };
  
//       // Axios(비동기) 처리 => stroe Actions에서 처리(, 관리) // 컴포넌트에서 같이 작성하면 코드가 너무 길어짐.
//       const res = await myAxios.get(url, { params });
//       const data = res.data.data;
//       isLastPage.value = data.lastPage;
//       posts.value.push(...data.posts);

//       currentPage++;
//     } catch(error) {
//         console.error(error);
//     }
//   }
// }
// -------------------store로 이관 END-------------------
// -----------------------------------------------------
// const getNextPage = () => {
//   // currentPage++; // 페이지 값을 먼저 올리고
//   // getPostPagination(); // 함수 실행
//   getPostPagination(currentPage + 1);
// }

// // 라이프 사이클
// onBeforeMount(getPostPagination); // (page = 1) 디폴트 값 설정해주면 매개변수 받을 필요 없음.
// // onBeforeMount(() => {
// //   getPostPagination(1);
// // });
// -----------------------------------------------------

const router = useRouter();
const postIndexStore = usePostIndexStore();
// const myErrorStore = useMyErrorStore();
// const router = useRouter();
const myErrorStore = useMyErrorStore();

const getPagination = async (page = 1) => {
  try {
    await postIndexStore.getPostPagination(page);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}

const getNextPage = async () => {
  await getPagination(postIndexStore.getNextPageNumber);
  // await postIndexStore.getPostPagination(postIndexStore.getNextPageNumber);
}

const redirectShow = (id) => {
  router.push(`/posts/${id}`);
}

// 라이프 사이클
// onBeforeMount(postIndexStore.getPostPagination);
onBeforeMount(getPagination);
onBeforeUnmount(postIndexStore.clearPostIndex);

// // 모듈화
// const paginationProcess = async (page = 1) => {
//   try {
//     await postIndexStore.getPostPagination(page);
//   } catch(error) {
//     myErrorStore.setErrorInfo(error);
//     // router.replace('/errors') // 현재 사용 불가
//   }
// }

// const getNextPage = async () => {
//   await paginationProcess(postIndexStore.getNextPageNumber);
// }

// // 라이프 사이클
// onBeforeMount(paginationProcess);

// ----------------------------------------------
// const getNextPage = async () => {
//   try {
//     await postIndexStore.getPostPagination(postIndexStore.getNextPageNumber);
//   } catch(error) {
//     myErrorStore.setErrorInfo(error);
//     router.replace('/errors')
//   }
// }

// // 라이프 사이클
// onBeforeMount(async () => {
//   try {
//     await postIndexStore.getPostPagination()
//   } catch(error) {
//     myErrorStore.setErrorInfo(error);
//     router.replace('/errors')
//   }
// });
// ----------------------------------------------
</script>

<template>
  <div class="card-container">
    <div
      class="card"
      v-for="item in postIndexStore.items"
      :key="item.id"
      :style="{backgroundImage: `url(${item.image})`}"
      @click="redirectShow(item.id)"
    ></div>
  </div>
  <MyButton
    v-if="!postIndexStore.isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'Show more posts from hippie'"
    @click="getNextPage()"
  />
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
