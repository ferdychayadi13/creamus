/*                               HEADER                                        */
const headerButton = document.querySelector("header button "),
  dropdown = document.querySelector("header button .dropdown"),
  exit = document.querySelector("header button svg .exit"),
  nav = document.querySelector("header nav");

headerButton.addEventListener("click", () => {
  if (headerButton.className === "hamburger") {
    headerButton.classList.add("on");
    nav.style.webkitAnimation = "1s forwards jump";
    nav.style.animation = "1s forwards jump";
  }
  if (exit.className.baseVal === "exit stroke on") {
    exit.classList.remove("on");
    nav.style.webkitTransition = "1s";
    nav.style.webkitTransform = "translateY(-10rem)";
    nav.style.transition = "1s";
    nav.style.transform = "translateY(-10rem)";
  }
});

dropdown.addEventListener("transitionend", () => {
  if (headerButton.className === "hamburger on") {
    exit.classList.add("on");
  }
});

exit.addEventListener("transitionend", () => {
  if (exit.className.baseVal === "exit stroke") {
    headerButton.classList.remove("on");
  } else if (exit.className.baseVal === "exit stroke on") {
    nav.style.webkitAnimation = "";
    nav.style.webkitTransform = "translateY(0)";
    nav.style.animation = "";
    nav.style.transform = "translateY(0)";
  }
});

/*                               HERO                                        */

const controller = document.querySelector(".hero .controller"),
  button = document.querySelector(".hero .controller button"),
  bg = document.querySelector(".hero .bg.on"),
  array = document.querySelectorAll(".hero .content"),
  deepContainer = document.querySelector(".hero .controller .deep-container"),
  slide = document.querySelector(".hero .slide");

let timerID;
function animation() {
  if (typeof timerID === "number") {
    clearTimeout(timerID);
  }
  timerID = setTimeout(() => {
    if (controller.className === "controller off") {
      return;
    }
    bg.style.webkitAnimation = "0.8s ease 0s slideIn";
    bg.style.animation = "0.8s ease 0s slideIn";
    timerID = undefined;
  }, 5000);
}

button.addEventListener("click", () => {
  animation();
  if (controller.className === "controller off") {
    controller.className = "controller on";
  } else if (controller.className === "controller on") {
    controller.className = "controller off";
  }
});

window.addEventListener("load", () => {
  animation();
});

let i = 0;
bg.addEventListener("animationstart", () => {
  deepContainer.style.webkitTransition = "transform 0.8s";
  deepContainer.style.transition = "transform 0.8s";
  deepContainer.classList.toggle("two");
});

bg.addEventListener("animationend", () => {
  bg.style.webkitAnimation = "";
  bg.style.animation = "";
  animation();
  if (i === array.length) i = 0;
  if (i === 1) {
    slide.className = "play slide pause1";
  } else {
    slide.className = "play slide two pause2";
  }
  bg.appendChild(array[i]);
  i++;
});

/*                               ICE CAKE                                        */

const wrapper = document.querySelector(".ice-cake .wrapper"),
  card = document.querySelectorAll(".ice-cake .wrapper > .card"),
  leftArrow = document.querySelector(
    ".ice-cake .controller button:first-child"
  ),
  rightArrow = document.querySelector(
    ".ice-cake .controller button:last-child"
  ),
  gap = Number(getComputedStyle(wrapper).gap.replace("%", "")) / 100;

wrapper.addEventListener("touchstart", () => {
  wrapper.classList.remove("on");
});

let j = 0;
function leftScroll() {
  if (wrapper.scrollLeft + wrapper.offsetWidth < wrapper.scrollWidth) {
    wrapper.scrollLeft += card[j].clientWidth + gap * wrapper.clientWidth + 2;
  }
  if (j < 2) {
    card[j + 1].classList.remove("middleCard");
    card[j + 2].classList.add("middleCard");
    j++;
  }
}

function rightScroll() {
  if (j > 0) {
    j--;
    card[j + 2].classList.remove("middleCard");
    card[j + 1].classList.add("middleCard");
  }
  if (wrapper.offsetWidth > 0) {
    wrapper.scrollLeft -=
      card[j + 3].clientWidth + gap * wrapper.clientWidth + 2;
  }
}

rightArrow.addEventListener("click", leftScroll);
leftArrow.addEventListener("click", rightScroll);

/*                               OTHER TYPE                                        */

const otherButton = document.querySelector(".other-type .wrapper button"),
  otherCarousel = document.querySelector(".other-type .wrapper .carousel"),
  otherCard = document.querySelectorAll(".other-type .wrapper .carousel > div"),
  indicator = document.querySelectorAll(
    ".other-type .wrapper .indicator > div"
  ),
  otherController = document.querySelector(
    ".other-type .wrapper .other-controller"
  );

let k = 0;
let otherScrollLength = 0;

function moreType() {
  indicator[k].classList.remove("bg-color");
  indicator[(k + 1) % 3].classList.add("bg-color");
  if (k < 2) {
    otherScrollLength += otherCard[k].clientWidth + 16 + 2;
    otherCarousel.scroll(otherScrollLength, 0);
    otherCard[k + 2].classList.replace("large", "medium");
    otherCard[k + 1].classList.replace("medium", "small");
    k++;
  } else {
    otherController.textContent = "More >";
    otherScrollLength = 0;
    k = 0;
    otherCard[k + 1].classList.replace("small", "medium");
    otherCard[k + 2].classList.replace("small", "large");
    otherCard[k + 3].classList.replace("medium", "large");
    otherCarousel.scroll(otherScrollLength, 0);
  }
  if (k === 2) {
    otherController.textContent = "< Back";
  }
}

otherButton.addEventListener("click", moreType);

/*                               FAVORITE                                        */

const favoriteCarousel = document.querySelector(".favorite .carousel"),
  favoriteCard = document.querySelector(".favorite .carousel div:first-child"),
  favoriteArrowLf = document.querySelector(
    ".favorite .controller button:first-child"
  ),
  favoriteArrowRg = document.querySelector(
    ".favorite .controller button:last-child"
  );

function leftScroll2() {
  if (
    favoriteCarousel.scrollLeft + favoriteCarousel.offsetWidth <
    favoriteCarousel.scrollWidth
  ) {
    favoriteCarousel.scrollLeft += favoriteCard.clientWidth + 20 + 4;
  }
}

function rightScroll2() {
  if (favoriteCarousel.scrollLeft > 0) {
    favoriteCarousel.scrollLeft -= favoriteCard.clientWidth + 20 + 4;
  }
}

favoriteArrowRg.addEventListener("click", leftScroll2);
favoriteArrowLf.addEventListener("click", rightScroll2);
