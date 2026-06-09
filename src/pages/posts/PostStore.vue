<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { useFileStore } from '../../store/file/useFileStore';
import createdValidator from '../../util/validator/domain/post/createdValidator.js';
import { usePostCreatedStore } from '../../store/post/usePostCreatedStore.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';
import { useRouter } from 'vue-router';


const fileStore = useFileStore();
const preview = ref(null);
const selectedFile = ref(null);
const createdData = reactive({
  content: ''
  , image: ''
});

const router = useRouter();
const postStore = usePostCreatedStore();
const myErrorStore = useMyErrorStore();

const handleChangeImage = async (e) => {
  const file = e.target.files[0];

  if(file) {
    if(preview.value) {
      URL.revokeObjectURL(preview);
    }

    // API 서버에 파일 저장 요청
    const fileUri = await fileStore.uploadPosts(file);

    if(fileUri) {
      createdData.image = fileUri;
      
      selectedFile.value = file;
      
      // 파일 객체를 브라우저에서 접근 가능한 임시 URL로 변환
      preview.value = URL.createObjectURL(file);
    }
  }
}

const handleSubmit = async () => {
  const validationList = [
    createdValidator.content(createdData.content)
    , createdValidator.image(createdData.image)
  ];

  const errorList = validationList.filter(val => val);

  if(errorList.length > 0) {
    alert(errorList.join('\n'));
    return;
  }

  try {
    await postStore.postCreated(createdData)
    alert("게시글을 등록했습니다.");
    router.replace('/posts');
  } catch (error) {
    const data = error.response.data;
    if(data.code === 'E11') {
      alert(data.data);
    } else if(data.code === 'E21') {
      alert('잘못된 양식입니다.')
    } else {
      myErrorStore.setErrorInfo(error);
      router.replace('/error');
    }
  }
}

</script>

<template>
  <div class="container">
    <textarea
      v-model="createdData.content"
      placeholder="내용 작성"
    ></textarea>

    <input
    type="file"
    accept="image/*"
    @change="handleChangeImage"
    >
    <div
      class="preview"
      v-if="preview"
      :style="{backgroundImage: `url(${preview})`}"
    ></div>
    
    <MyButton
      :color="'gray'"
      :size="'middle'"
      :content="'Write'"
      @click="handleSubmit"
    ></MyButton>
  </div>
</template>

<style scoped>
.container {
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

textarea {
  width: 100%;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
}

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>
