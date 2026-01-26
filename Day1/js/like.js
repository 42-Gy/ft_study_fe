const likeButton = document.querySelectorAll('.like');
console.log(likeButton[0]);

function onClickLike(event, index) {
  event.stopImmediatePropagation(); // div에 걸린 onclick 동작(링크이동) 막기
  event.currentTarget.classList.toggle('clickLiked'); // toggle 함수로 if~~ add, remove 대체
  const button = `button${index}`;
  const value = localStorage.getItem(button);
  //로컬 스토리지에 저장된 값이 없다면 추가, 있다면 삭제
  if (value === null) {
    localStorage.setItem(button, true);
  } else {
    localStorage.removeItem(button);
  }
}

/* 사실 index를 찾는건 jQuery에선 함수 한방으로 쓸 수 있어요
  하지만 우린 순수 js를 쓰기 때문에 고민고민 끝에 최대한 간단하게 구현하려 했습니다
  실제 기능 구현할 땐 이렇게 쓰진 않을거에요 */

likeButton.forEach((like, index) => {
  const button = `button${index + 1}`;
  const value = localStorage.getItem(button);
  // 로컬 스토리지에 저장 유무로 좋아요 판단 (저장되어있으면 좋아요o 아니면 x)
  if (value !== null) {
    like.classList.add('clickLiked');
  }
  like.addEventListener('click', (event) => onClickLike(event, index + 1)); // 좋아요 버튼 위치를 찾기 위해 인덱스값도 같이 보냄
});
