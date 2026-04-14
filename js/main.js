/* =========================================================
   main.js – Portfolio interactions
   ========================================================= */

(function () {
  'use strict';

  /* -------------------------------------------------------
     1. NAVBAR – scroll & highlight
  ------------------------------------------------------- */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    // Sticky style
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back-to-top visibility
    const btt = document.getElementById('back-to-top');
    if (btt) {
      if (window.scrollY > 400) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    }

    // Active nav link
    let currentSection = '';
    document.querySelectorAll('section[id]').forEach(function (sec) {
      const sectionTop = sec.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });

    // Reveal elements
    revealElements();

    // Animate skill bars once visible
    animateSkillBars();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* -------------------------------------------------------
     2. SMOOTH SCROLL for nav links & buttons
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        // Close mobile menu if open
        closeMenu();
        var offset = navbar ? navbar.offsetHeight : 70;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* -------------------------------------------------------
     3. MOBILE HAMBURGER MENU
  ------------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('nav-menu');

  function closeMenu() {
    if (hamburger && navMenu) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a nav link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (hamburger && navMenu && navMenu.classList.contains('open')) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
      }
    }
  });

  /* -------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
  ------------------------------------------------------- */
  function revealElements() {
    var elements = document.querySelectorAll('.reveal');
    elements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  /* -------------------------------------------------------
     5. SKILL BAR ANIMATIONS (trigger once)
  ------------------------------------------------------- */
  var skillBarsAnimated = false;

  function animateSkillBars() {
    if (skillBarsAnimated) return;
    var section = document.getElementById('skills');
    if (!section) return;
    var rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      document.querySelectorAll('.skill-fill').forEach(function (bar) {
        var width = bar.getAttribute('data-width') || '0';
        bar.style.width = width + '%';
      });
      skillBarsAnimated = true;
    }
  }

  /* -------------------------------------------------------
     6. PROJECT CARD EXPAND / COLLAPSE
  ------------------------------------------------------- */
  document.querySelectorAll('.btn-expand').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card    = btn.closest('.project-card');
      var details = card ? card.querySelector('.project-details') : null;
      if (!details) return;

      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));

      var textSpan = btn.querySelector('.expand-text');
      if (expanded) {
        details.classList.remove('open');
        if (textSpan) textSpan.textContent = 'Show Details';
      } else {
        details.classList.add('open');
        if (textSpan) textSpan.textContent = 'Hide Details';
      }
    });
  });

  /* -------------------------------------------------------
     7. BACK TO TOP
  ------------------------------------------------------- */
  var bttBtn = document.getElementById('back-to-top');
  if (bttBtn) {
    bttBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------------------
     8. HERO PARTICLES
  ------------------------------------------------------- */
  var particleContainer = document.getElementById('particles');
  if (particleContainer) {
    var count = 18;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      var size = Math.random() * 6 + 3;
      p.style.cssText = [
        'width:'     + size + 'px',
        'height:'    + size + 'px',
        'left:'      + Math.random() * 100 + '%',
        'top:'       + Math.random() * 100 + '%',
        'animation-duration:' + (Math.random() * 6 + 5) + 's',
        'animation-delay:'    + (Math.random() * 4) + 's',
        'opacity:'   + (Math.random() * 0.4 + 0.1)
      ].join(';');
      particleContainer.appendChild(p);
    }
  }

  /* -------------------------------------------------------
     9. CONTACT FORM – intercept & show feedback
  ------------------------------------------------------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Let the mailto: action proceed; just give user feedback
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Opening email client…';
        setTimeout(function () {
          btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        }, 3000);
      }
    });
  }

})();
