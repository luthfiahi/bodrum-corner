/* ============================================
   main.js — Entry Point
   Project: Bodrum Corner Official Website
   Coordinates all modules on DOM ready.
   Sources: PRD-005 §7
   Updated: Sprint 11 — defer-compatible init
   ============================================ */

/**
 * Main initialization — waits for DOM to be fully loaded,
 * then initializes all modules in the correct order.
 * With `defer`, scripts run after parsing but before DOMContentLoaded.
 * This fallback ensures init runs even if DOMContentLoaded already fired.
 */
function initApp() {

  /* Initialize Lucide icons (must run before other modules) */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* Initialize all feature modules */
  initAnimations();
  initGallery();
  initNavbar();

  /* Set dynamic copyright year in footer */
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

/* Use defer-safe init pattern */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
