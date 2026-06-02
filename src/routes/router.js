import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/errors/MyError.vue";
import Login from "../pages/auth/Login.vue";
import { useAuthStore } from "../store/auth/useAuthStore.js";
import PostShow from "../pages/posts/PostShow.vue";
import Registration from "../pages/auth/Registration.vue";

const setMeta = (isAuthrenticated, isGuestOnly) => {
  return {
    isAuthrenticated
    , isGuestOnly
  }
}

const routes = [
  {
    path: '/'
    // , component: PostIndex
    , redirect: '/posts' // 메인 페이지와 통일
    , meta: setMeta(false, false)
  }
  // 인증 관련
  , {
    path: '/login'
    , component: Login
    , meta: setMeta(false, true)
  }
  , {
    path: '/registration'
    , component: Registration
    , meta: setMeta(false, true)
  }
  // 게시글 관련
  , {
    path: '/posts'
    , component: PostIndex
    , meta: setMeta(false, false)
  }
  , {
    path: '/posts/:id'
    , component: PostShow
    , meta: setMeta(true, false)
  }
  // 에러 관련
  // , {
  //   path: '/errors'
  //   , component: MyError
  // }
];

const router = createRouter({
  history: createWebHistory()
  , routes
});

// 네비게이션 가드 (인터셉트, 라이프 사이클 훅)
// 특정 시점에 로직을 실행시키고 싶을 때 사용하는 기술
router.beforeEach(async (to, from, next) => {
  // authStore
  const authStore = useAuthStore();

  // accessToken(인증)이 없을 때, 토큰 재발급 시도
  if(!authStore.isLoggedIn) {
    try {
      await authStore.reissue();
    } catch(error) {
      // alert('로그인 기간이 만료되었습니다. \n다시 로그인 해주십시오.');
      // return next('/login');
    }
  }

  // 인증이 필요한 페이지인데, 로그인이 안된 경우 로그인 페이지로 이동
  if(to.meta.isAuthrenticated && !authStore.isLoggedIn) {
    return next('/login');
  }

  // 게스트만 접근 가능한 페이지인데, 로그인 중인 경우 메인페이지로 이동
  if(to.meta.isGuestOnly && authStore.isLoggedIn) {
    return next('/');
  }

  // 나머지는 통과
  next();
});

export default router;
