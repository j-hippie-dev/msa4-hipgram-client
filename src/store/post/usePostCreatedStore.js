import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

export const usePostCreatedStore = defineStore('postCreatedStore', () => {
  const postCreated = async (data) => {
    try {
      const url = '/api/posts';

      await myAxios.post(url, data);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return {
    postCreated
  }
});
