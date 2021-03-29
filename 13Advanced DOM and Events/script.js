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

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
// console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
// console.log(allButtons); // node형식과 또 다르게 보일 것이다.
// 이것의 특징은 만약 웹 페이지 상에서 버튼요소를 delete로 삭제해버린 뒤
// console창에 allButtons치면 요소 한개가 지워져 있을 것이다.
// 이것과 반대로 노드는 웹 상에서 어떤 요소가 지워진다고 해서 변경되지 않는다.
// 이것을 이용해서 나중에 getElemetsByTagName을 유용하게 사용할 수도 있다.

// console.log(document.getElementsByClassName("btn"));
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
// console.log(message.style.height); // 나오지 않는다.
// console.log(message.style.backgroundColor); // rgb(55, 56, 61)로 나온다.
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
  // console.log(e.target);
  // #1. target이 nav__link 클래스를 가지고 있는지 확인한다.
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// 191강 탭 구성 요소 만들기 ( 3개의 탭. 클릭한 것 active되게 )
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  if (!clicked) return; //null 이면 return 되버리게. 즉, 더이상 오류가 발생 안되게.

  // remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // active tab
  clicked.classList.add("operations__tab--active");

  // activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// 192강 : 이벤트 핸들러에 인수 전달 ( 상단 메인메뉴 흐리게 )
const nav = document.querySelector(".nav");
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo2 = link.closest(".nav").querySelector("img");
    // console.log(logo2);

    siblings.forEach((el) => {
      if (el !== e.target) {
        el.style.opacity = this;
      }
    });
    logo2.style.opacity = this;
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// 193강->194강 개선 적용 : sticky menubar
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry); // header를 지났을 때 isIntersecting이 false가 나오고 intersectingRatio가 0이 나온다.

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // 전체 뷰포트 대상이기 때문에
  threshold: 0,
  rootMargin: `-${navHeight}px`, // 상단에 지정한 여백만큼 추가로 더 남더라도 함수가 실행된다.
});
headerObserver.observe(header);

// 195강 : 스크롤하면 섹션 하나씩 나타나기
// #3 Intersection하면서 들어오는 section들에 닿을 때 section-hidden을 지우도록.
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // 교차되지 않을 때 단순 return되게 (이 부분 잘 이해 x)
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
// #1 IntersectionObserver를 변수에 선언.
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
// #2 section들을 IntersectionObserver에 할당, 일단 모든 섹션을 hidden처리
allSections.forEach(function (section) {
  // sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// 196강 : 지연 로딩 이미지
// 강의
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove("lazy-img"); // 로딩 속도가 느리다. network - slow3G로 보면 확연히 보인다. blur 제거 후에 이미지가 바뀌는 현상!

  // 이미지를 바꾸고 나서
  // entry.target.addEventListener('load', function() {
  //   entry.target.classList.remove('lazy-img')
  // })

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// 197강 : 슬라이더 구현(1)
const slider = function () {
  // 리팩토링하면서 묶음.
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  // const slider = document.querySelector('.slider')

  let curSlide = 0;
  const maxSlide = slides.length;
  // slider.style.overflow = 'visible';

  // #2 점 구현
  const dotContainer = document.querySelector(".dots");

  const createDots = function () {
    slides.forEach(function (_, i) {
      // 단지 슬라이드의 개수 4개가 필요한 것뿐이라서 slides.foreach를 하고 i만 필요한 것.
      // 항상 마지막으로 > beforeend
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // createDots(); // 리팩토링

  // #3 활성화 점 구현
  // classList.remove나 add다음에 클래스를 불러올 때 .을 붙이는거 아니다.
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  // activateDot(0); // 리팩토링

  const goToSlide = function (cur) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - cur)}%)`)
    );
  };
  // goToSlide(0); // 리팩토링

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // 198강 : 슬라이더 구현(2)

  // #1 키보드 누르면 슬라이드 움직이게
  document.addEventListener("keydown", function (e) {
    console.log(e); // 누르는 key값이 ArrowLeft인지 ArrowRight인지 알 수 있다.
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // const slide = e.target.dataset.slide; // 이렇게 해도 똑같다.
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// 199강 이벤트 살펴보기
// #1 DOMContentLoaded : 브라우저가 HTML을 읽고 DOM트리를 완성하는 즉시 발생한다.
// document.addEventListener("DOMContentLoaded", function (e) {
//   console.log("HTML parsed and DOM tree built!", e);
// });

// #2 load : HTML로 dom트리 만드는게 완성 된 후 이미지 및 스타일 시트같은 외부자원도 모두 불러온 뒤 발생.
// window.addEventListener("load", function (e) {
//   console.log("page fully loaded", e);
// });

// #3 beforeunload : 어떤 변경사항이 있을 때 사용자가 떠나려고 한다면 경고.
// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "test message"; // 원래 메세지를 수정할 수 있었지만 남용되었다. 지금은 어떤 메세지를 넣어도 반영되지 않는다.
// });
