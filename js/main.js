// ===== SMARTFUTURE MAIN JS =====

// Sticky navbar
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  // Close on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// Active nav link
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// Scroll reveal animation
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .why-card, .resource-card, .uni-card, .result-course-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Animate counter
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString() + (el.dataset.suffix || '');
    }
  }, 16);
}

// Run counters when visible
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.counter));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
});

// Contact form handler (basic)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<span class="loading-spinner" style="width:20px;height:20px;border-width:2px;display:inline-block;"></span>';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '✅ Message Sent!';
      btn.style.background = 'var(--green)';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}