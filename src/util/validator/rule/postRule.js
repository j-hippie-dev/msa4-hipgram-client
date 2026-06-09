export const content = (val) => {

  if(!val) {
    return '내용은 필수입니다.';
  }

  return '';
}

export const image = (val) => {
  if(!val) {
    return '이미지 업로드는 필수입니다.';
  }

  return '';
}
