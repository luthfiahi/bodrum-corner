/* ============================================
   animation.js — Scroll-triggered Animations
   Project: Bodrum Corner Official Website
   Uses Intersection Observer API
   Sources: PRD-004 §16, PRD-005 §7
   ============================================ */

/**
 * initAnimations — Sets up Intersection Observer to trigger
 * fade-in and slide-up animations when elements enter the viewport.
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}
