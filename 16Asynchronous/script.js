'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// 243. 비동기 자바스크립트
/*
    동기는 코드가 한 줄씩 실행된다.
    동기코드의 문제점은 alert같은 알람창을 만났을 때 코드 실행이 멈춘다는 것이다.  
*/

// 하지만 비동기 코드는 아래와 같이 color가 먼저 변경되고 5초 뒤에 문구가 바뀌는 것이다.
// 5초가 지나면 콜백함수가 실행된다.
const p = document.querySelector('.p')
setTimeout(function() {
    p.textContent = 'my name is taejoon!' 
}, 5000);
p.style.color = "red";
p.style.fontSize = "30px";

// 하지만 모든 콜백함수가 비동기로 작동하는 것은 아니다.
// 예를 들어서 map 방법을 들었을 때 비동기가 아니다.
// 시간 제한 설정과 같은 기능을 가진 것들만 비동기가 가능하다.
const img = document.querySelector('.dog');
img.src = 'img/img-1.jpg';
img.addEventListener('load', function() {
    img.classList.add('fadeIn');
})
img.style.width = '300px';
p.style.width = '300px';

