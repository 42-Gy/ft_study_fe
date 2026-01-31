# Day 1 학습 기록

## 1. HTML 시맨틱 태그
- `header`: 사이트의 로고나 네비게이션을 담는 상단 영역
- `section`: 주제별 콘텐츠를 묶어주는 영역
- `footer`: 저작권 정보나 연락처를 담는 하단 영역
- **사용 이유**: 코드의 가독성을 높이고 웹 접근성을 향상시킴

## 2. Flexbox (CSS Layout)
- `display: flex`: 부모 요소에 선언하여 자식들을 유연하게 배치
- `justify-content`: 가로축 정렬 (center, space-between 등)
- `align-items`: 세로축 정렬 (center 등)

## 3. img - alt 속성
- 사용자가 이미지를 이해하고 페이지의 콘텐츠를 완전히 접근할 수 있도록 적절하고 명확한
대체 텍스트를 작성하는 것이 필요

## 4. hover
- `.button:hover`를 통해 마우스를 올렸을 때 변화가 일어남

## 5. transition
- `transition: all 0.3s ease`은 마우스를 올렸을 때 색이 부드럽게 바뀜
- `all` : 변하는 모든 속성에 대해 에니메이션을 적용
- `0.3s` : 0.3초 걸리게 할 것
- `ease` : 속도 변화를 자연스럽게 할 것

## 6. clock.js
- `querySelector` : js가 HTML 파일 제어하기 위해 특정 요소 선택하는 기능
    - `document.querySelector("#clock")` 사용하여 HTML의 `<h2 id="clock">` 태그를 변수에 담아 제어함
- `new Date` : 브라우저에서 현재 날짜와 시간 정보 가져오는 내장 객체
    - `new Date()` 호출 뒤 `.getHours()`, `.getMinutes()`, `.getSeconds()` 메서드로 현재 시/분/초를 각각 가져옴
- `padStart` : 문자열의 길이가 지정한 길이보다 짧을 경우, 앞쪽에 특정 문자 채워주는 함수
    - 시간이 '1'초일 때 '01'초로 표시하기 위해 `padStart(2, "0")` 사용
- `setInterval` : 일정 시간 간격으로 함수를 반복해서 실행하는 기능
    - `setInterval(getClock, 1000)` 사용하여 1000ms(1초)마다 시계 함수를 다시 실행해 시간이 흐르는 것처럼 만듦