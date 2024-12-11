'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav_links = document.querySelector('.nav__links');
const nav_link = document.querySelectorAll('.nav__link');

const sections = document.querySelectorAll('.section');
const imgs = document.querySelectorAll('.features__img');

const tabsContainer = document.querySelector('.operations__tab-container');
const btnOperation = document.querySelectorAll('.operations__tab');
const tabsContents = document.querySelectorAll('.operations__content');

const scroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

scroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

nav_links.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    var link = e.target.getAttribute('href');
    document.querySelector(link).scrollIntoView({ behavior: 'smooth' });
  }
});

const handleOver = function (e, opacity) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    var link = e.target;
    var links = link.closest('.nav').querySelectorAll('.nav__link');
    var logo = link.closest('.nav').querySelector('img');

    links.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav_links.addEventListener('mouseover', function (e) {
  handleOver(e, 0.5);
});

nav_links.addEventListener('mouseout', function (e) {
  handleOver(e, 1);
});

var reveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) entry.target.classList.add('section--hidden');
  else {
    entry.target.classList.remove('section--hidden');
  }
};

const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

var reveal_img = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function (e) {
      entry.target.classList.remove('lazy-img');
      observer.unobserve(entry.target);
    });
  }
};

const imgsObserver = new IntersectionObserver(reveal_img, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgs.forEach(img => {
  imgsObserver.observe(img);
});

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  btnOperation.forEach(btn => btn.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  var number = clicked.getAttribute('data-tab');
  tabsContents.forEach(operation => {
    operation.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${number}`)
    .classList.add('operations__content--active');
});
