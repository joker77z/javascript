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

// 189강 : 이벤트 위임 : 메인메뉴 전부 부드러운 스크롤링 -------------------------------
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  // #1. target이 nav__link 클래스를 가지고 있는지 확인한다.
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// 191강 탭 구성 요소 만들기 ( 3개의 탭. 클릭한 것 active되게 )
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if(!clicked) return; //null 이면 return 되버리게. 즉, 더이상 오류가 발생 안되게.

  // remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // active tab
  clicked.classList.add('operations__tab--active');

  // activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

// 192강 : 이벤트 핸들러에 인수 전달 ( 상단 메인메뉴 흐리게 )
const nav = document.querySelector('.nav');
// mouseenter는 버블이 되지 않아서 유사한 mouseover 이벤트를 사용한다.
// mouseenter <-> mouseleave
// mouseover <-> mouseout

// #2 리팩토링
const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    // 클릭한 링크 말고 다른 링크들을 선택해야 한다.
    // 그러기 위해서 부모로 갔다가 다른 자식들을 선택한다.
    // nav_link의 부모인 nav__item 클래스들을 선택해야 한다.
    // const item = link.closest('.nav__item'); 내가 해봤는데 이게 아닌 것 같다.
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // const logo = link.closest('.nav__logo') // 내가 해봤는데 아니다.
    // console.log(logo);
    const logo2 = link.closest('.nav').querySelector('img');
    console.log(logo2);

    siblings.forEach(el => {
      if(el !== e.target) {
        el.style.opacity = this;
      }})
    logo2.style.opacity = this;
  }
}
// #3 콜백함수 대신 함수를 안으로 넣었다.
// nav.addEventListener('mouseover', e =>
//   handleHover(e, 0.5) // ✅ 함수가 여기 들어간다! 콜백함수 식으로 안쓰고 여기 들어온다는 점 기억하자.
  // if(e.target.classList.contains('nav__link')) {
  //   const link = e.target;
  //   // 클릭한 링크 말고 다른 링크들을 선택해야 한다.
  //   // 그러기 위해서 부모로 갔다가 다른 자식들을 선택한다.
  //   // nav_link의 부모인 nav__item 클래스들을 선택해야 한다.
  //   // const item = link.closest('.nav__item'); 내가 해봤는데 이게 아닌 것 같다.
  //   const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  //   // const logo = link.closest('.nav__logo') // 내가 해봤는데 아니다.
  //   // console.log(logo);
  //   const logo2 = link.closest('.nav').querySelector('img');
  //   console.log(logo2);

  //   siblings.forEach(el => {
  //     if(el !== e.target) {
  //       el.style.opacity = 0.5;
  //     }})
  //   logo2.style.opacity = 0.5;
  // }
// )


// nav.addEventListener('mouseout', e =>
//   handleHover(e, 1)
  // if(e.target.classList.contains('nav__link')) {
  //   const link = e.target;
  //   const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  //   const logo2 = link.closest('.nav').querySelector('img');
  //   console.log(logo2);

  //   siblings.forEach(el => {
  //     if(el !== e.target) {
  //       el.style.opacity = 1;
  //     }})
  //   logo2.style.opacity = 1;
  // }
// ) 


// #4 bind를 이용한다. 함수 자체를 다른데서 정의하면서 e를 넣고 0.5와 1은 인자로 넣는다.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));