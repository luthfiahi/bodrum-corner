/* ============================================
   navbar.js — Navbar Logic
   Project: Bodrum Corner Official Website
   Handles: sticky scroll, mobile toggle, active menu,
            smooth scroll, reviews slider
   Sources: PRD-003 §4, PRD-004 §3, PRD-005 §7
   ============================================ */

/**
 * initNavbar — Sets up navbar scroll behavior, mobile menu toggle,
 * active menu tracking via Intersection Observer, and smooth scroll.
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbarToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const desktopLinks = document.querySelectorAll('.navbar-link');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (!navbar) return;

  /* ——— Sticky Scroll Background ——— */
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ——— Mobile Menu Toggle ——— */
  function toggleMobileMenu() {
    navbarToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navbarToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navbarToggle) {
    navbarToggle.addEventListener('click', toggleMobileMenu);
  }

  /* ——— Smooth Scroll ——— */
  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    closeMobileMenu();

    const navbarHeight = navbar.offsetHeight;
    const targetPosition = target.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /* Attach smooth scroll to all nav links */
  const allLinks = [...desktopLinks, ...mobileLinks];
  allLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      if (sectionId) {
        scrollToSection(sectionId);
      }
    });
  });

  /* Also handle CTA buttons and footer links that use #href */
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.navbar-link):not(.mobile-menu-link):not(.footer-link)');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
      }
    });
  });

  /* ——— Active Menu Tracking ——— */
  const sections = document.querySelectorAll('main section[id]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveLink(sectionId);
        }
      });
    },
    {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  /**
   * setActiveLink — Updates the active class on nav links
   * for both desktop and mobile menus.
   * @param {string} sectionId — The ID of the currently visible section.
   */
  function setActiveLink(sectionId) {
    desktopLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
    mobileLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
  }

  /* ——— Reviews Slider ——— */
  initReviewsSlider();
}

/**
 * initReviewsSlider — Sets up auto-sliding and manual navigation
 * for the reviews section.
 */
function initReviewsSlider() {
  const reviewsSlider = document.getElementById('reviewsSlider');
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewsPrev = document.getElementById('reviewsPrev');
  const reviewsNext = document.getElementById('reviewsNext');

  if (!reviewsSlider || !reviewsTrack) return;

  const reviewCards = reviewsTrack.querySelectorAll('.review-card');
  if (!reviewCards.length) return;

  let currentSlide = 0;
  let slidesToShow = 1;
  let autoSlideInterval = null;

  /**
   * calculateSlidesToShow — Determines how many review cards
   * to show based on viewport width.
   */
  function calculateSlidesToShow() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  /**
   * updateSlider — Moves the track to show the current slide.
   */
  function updateSlider() {
    slidesToShow = calculateSlidesToShow();
    const maxSlide = Math.max(0, reviewCards.length - slidesToShow);

    if (currentSlide > maxSlide) {
      currentSlide = maxSlide;
    }

    const cardWidth = reviewCards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(reviewsTrack).gap, 10) || 24;
    const offset = currentSlide * (cardWidth + gap);

    reviewsTrack.style.transform = `translateX(-${offset}px)`;
  }

  /**
   * goToSlide — Navigates to a specific slide index.
   * @param {number} index — Target slide index.
   */
  function goToSlide(index) {
    const maxSlide = Math.max(0, reviewCards.length - slidesToShow);
    currentSlide = Math.max(0, Math.min(index, maxSlide));
    updateSlider();
  }

  /**
   * startAutoSlide — Starts the automatic slide timer.
   */
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
      const maxSlide = Math.max(0, reviewCards.length - slidesToShow);
      if (currentSlide >= maxSlide) {
        goToSlide(0);
      } else {
        goToSlide(currentSlide + 1);
      }
    }, 5000);
  }

  /**
   * stopAutoSlide — Stops the automatic slide timer.
   */
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  /* Event: Prev/Next buttons */
  if (reviewsPrev) {
    reviewsPrev.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      startAutoSlide();
    });
  }

  if (reviewsNext) {
    reviewsNext.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      startAutoSlide();
    });
  }

  /* Event: Pause auto-slide on hover */
  reviewsSlider.addEventListener('mouseenter', stopAutoSlide);
  reviewsSlider.addEventListener('mouseleave', startAutoSlide);

  /* Event: Recalculate on window resize */
  window.addEventListener('resize', () => {
    updateSlider();
  });

  /* Initialize */
  updateSlider();
  startAutoSlide();
}
