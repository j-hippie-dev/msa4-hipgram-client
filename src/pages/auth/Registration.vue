<script setup>
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';

const handleSubmit = async () => {
  
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <MyInput
      :type="'email'"
      :placeholder="'Email'"
      :readonly="false"
      :required="true"
    ></MyInput>

    <MyInput
      :type="'password'"
      :placeholder="'Password'"
      :readonly="false"
      :required="true"
    ></MyInput>

    <MyInput
      :type="'password'"
      :placeholder="'PasswordChk'"
      :readonly="false"
      :required="true"
    ></MyInput>

    <MyInput
      :type="'text'"
      :placeholder="'Nick'"
      :readonly="false"
      :required="true"
    ></MyInput>
    <label for="file">파일</label>
    <input type="file" accept="image/*" id="file">
    
    <MyButton
      :btn-type="'submit'"
      :color="'black'"
      :size="'middle'"
      :content="'Sign Up'"
    ></MyButton>
  </form>
</template>

<style scoped>
#file {
  display: none;
}

form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
