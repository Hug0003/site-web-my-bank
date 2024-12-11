'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const scroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const btn2 = document.querySelector('.operations__tab--2');
const section2 = document.querySelector('#section--2');

const links = document.querySelectorAll('.nav__link');
const nav_links = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const cookie = document.createElement('div');
cookie.classList.add('cookie-message');
cookie.innerHTML =
  "accept cookies to allow acces to your data <button class='btn btn--close-cookie'> Go it !! </button> ";

header.prepend(cookie);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    cookie.remove();
  });

cookie.style.height =
  Number.parseFloat(getComputedStyle(cookie).height) + 10 + 'px';

scroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

nav_links.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  const number = clicked.getAttribute('data-tab');
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${number}`)
    .classList.add('operations__content--active');
});

const header_ = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickNAVav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickNAVav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header_);

const allSection = document.querySelectorAll('.section');

const reveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) entry.target.classList.add('section--hidden');
  else entry.target.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

const imgs = document.querySelectorAll('.features__img');

const imgReveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function (e) {
      entry.target.classList.remove('lazy-img');
    });
  }
};

const imgObserver = new IntersectionObserver(imgReveal, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgs.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
let btnRight = document.querySelector('.slider__btn--right');
let btnLeft = document.querySelector('.slider__btn--left');
let curSlide = 0;
let maxSlide = slides.length - 1;
let minSlide = 0;
let dotContainer = document.querySelector('.dots');

const creatDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

let goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

let nextSlide = function () {
  if (curSlide === maxSlide) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};

let previousSlide = function () {
  if (curSlide === minSlide) curSlide = maxSlide;
  else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  creatDots();
  goToSlide(0);
  activateDot(0);
};

init();
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') previousSlide();
  else if (e.key === 'ArrowRight') nextSlide();
  else return;
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

document.addEventListener('DOMContentLoaded', function (e) {
  setTimeout(function () {
    console.log('yes');
    openModal(e);
  }, 3000);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
