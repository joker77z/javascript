"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons); // node형식과 또 다르게 보일 것이다.
// 이것의 특징은 만약 웹 페이지 상에서 버튼요소를 delete로 삭제해버린 뒤
// console창에 allButtons치면 요소 한개가 지워져 있을 것이다.
// 이것과 반대로 노드는 웹 상에서 어떤 요소가 지워진다고 해서 변경되지 않는다.
// 이것을 이용해서 나중에 getElemetsByTagName을 유용하게 사용할 수도 있다.

console.log(document.getElementsByClassName("btn"));
// console창에 HTMLCollection 형식으로 모아지는데 유용하게 사용할 떄가 있다.
// 그러나 보통 그냥 querySelector이 유용하다.

// Cookie 물어보는 창 만들기
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);

// 만약 message를 header안에서 첫번째 혹은 맨 마지막. 두 개 다 넣고 싶으면 복사를 해야 한다.
//header.append(message.cloneNode(true));

// header.before(mesasge) // 이전에 넣을 수도 있고 후에 넣을 수도 있다.
// header.after(message);

// Cookie 허락해서 닫기
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    // 예전에는 이런방식으로 했다.
    // mesasge.parentElement.removeChild(message);
  });

// 184강 : 스타일 속성 및 클래스
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
console.log(message.style.height); // 나오지 않는다.
console.log(message.style.backgroundColor); // rgb(55, 56, 61)로 나온다.
// height값을 얻고 싶다면?
// console.log(getComputedStyle(message).height);
// height값을 변경하고 싶다면?
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// style.css에서 :root에 있는 것에 대해 설명중이다.
// 색상을 일괄변경할 수 있어서 편리해보인다.
// 그 색상을 바꿔보자.
// 이 방법을 외우지 말자. 보통 위에 message.style.backgroundColor = ~~ 이런식으로 하는게 더 쉽다.
document.documentElement.style.setProperty("--color-primary", "orangered");

// 185강 : 부드러운 스크롤 ----------------------------------------
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// 186강 : 마우스 오버된 이벤트 1번만 실행 ----------------------------
const h1 = document.querySelector("h1");
const alertH1 = function (e) {
  alert("hi!");
  // h1.removeEventListener("mouseenter", alertH1);
};
h1.addEventListener("mouseenter", alertH1);

// 3초 뒤부터 안눌리게 하고 싶다면?
setTimeout(() => {
  h1.removeEventListener("mouseenter", alertH1);
}, 3000);

// 187~188강 : 이벤트 전파 : 버블링 및 캡처 ----------------------------
