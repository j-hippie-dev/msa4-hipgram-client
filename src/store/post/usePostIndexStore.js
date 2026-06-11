import { defineStore } from "pinia";
import { computed, ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStroe } from "../error/useMyErrorStore";

export const usePostIndexStore = defineStore('postIndex', () => {
  // 1. State (ref)
  const items = ref([]);
  const isLastPage = ref(false);
  const currentPage = ref(0);
  
  // 2. Getters (computed) // origin(원본) State값을 변경하지 않고 가공(연산)된 값을 가져오고 싶을 때
  const getNextPageNumber = computed(() => currentPage.value + 1);

  // 3. Actions (function)
  const clearPostIndex = () => { // PostIndex 초기화
    items.value = [];
    isLastPage.value = false;
    currentPage.value = 0;
  }

  const getPostPagination = async (page = 1) => {
    if(!isLastPage.value) {
      try {
        const url = '/api/posts';
        const params = {
          page
        };
    
        const res = await myAxios.get(url, { params });
        const data = res.data.data;
        isLastPage.value = data.lastPage;
        items.value.push(...data.posts);
  
        currentPage.value++;
      } catch (error) {
        console.error(error); // 배포할 땐 지워줘야 함

        // 단발성 (바로 사용)
        // useMyErrorStroe().setErrorInfo(error);

        // 변수에 담아서 사용
        // const myErrorStore = useMyErrorStroe();
        // myErrorStore.setErrorInfo(error);
        throw error;
      }


      // try {
      //   const url = '/api/posts';
      //   const params = {
      //     page
      //   };
    
      //   const res = await myAxios.get(url, { params });
      //   const data = res.data.data;
      //   isLastPage.value = data.lastPage;
      //   items.value.push(...data.posts);
      //   // console.log(data);

      //   currentPage.value++;
      // } catch(error) {
      //   // console.error(error);
      //   throw error;
      // } 캐치에서 다른 처리할 것 없으면 지금은 굳이 캐치부분 써 줄 필요 없음
    }
  }

  return {
    // state
    items
    , isLastPage

    // getters
    , getNextPageNumber

    // actions
    , clearPostIndex
    , getPostPagination
  }
});
