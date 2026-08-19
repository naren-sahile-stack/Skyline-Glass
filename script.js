(function () {
  'use strict';
  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  var backToTop = document.getElementById('backToTop');
  var openFormBtn = document.getElementById('openFormBtn');
  var bidForm = document.getElementById('bidForm');
  var formStatus = document.getElementById('formStatus');

  /* Sticky header */
  function onScroll() {
    var scrolled = window.scrollY > 12;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Active nav link */
  var sections = Array.from(document.querySelectorAll('section[id]'));
  var navLinks = Array.from(mainNav.querySelectorAll('a'));
  function setActiveLink() {
    var scrollPos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) current = section;
    });
    navLinks.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + current.id;
      link.classList.toggle('active', match);
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* Back to top */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Reveal on scroll */
  var revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Form toggle */
  if (openFormBtn && bidForm) {
    openFormBtn.addEventListener('click', function () {
      bidForm.hidden = !bidForm.hidden;
      bidForm.classList.toggle('active', !bidForm.hidden);
      openFormBtn.setAttribute('aria-expanded', String(!bidForm.hidden));
      if (!bidForm.hidden) {
        bidForm.querySelector('input').focus();
        bidForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    bidForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!bidForm.checkValidity()) { bidForm.reportValidity(); return; }
      formStatus.textContent = 'Thanks! Your request has been noted. We will reach out at Advisor@skg23.com shortly.';
      bidForm.reset();
    });
  }
})();