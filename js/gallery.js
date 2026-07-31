/* ============================================
   gallery.js — Gallery & Lightbox
   Project: Bodrum Corner Official Website
   Handles: open/close, prev/next, keyboard nav
   Sources: PRD-004 §7, PRD-005 §7
   ============================================ */

/**
 * initGallery — Sets up gallery item click handlers
 * and lightbox navigation (mouse + keyboard).
 */
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (!galleryItems.length || !lightbox) return;

  let currentIndex = 0;
  const images = [];

  /* Collect all gallery image sources */
  galleryItems.forEach((item) => {
    const img = item.querySelector('img');
    if (img) {
      images.push({
        src: img.src,
        alt: img.alt
      });
    }
  });

  /**
   * openGallery — Displays the lightbox at the given index.
   * @param {number} index — The image index to show.
   */
  function openGallery(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * closeGallery — Hides the lightbox and restores scrolling.
   */
  function closeGallery() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * updateLightboxImage — Updates the lightbox image src and alt.
   */
  function updateLightboxImage() {
    if (!images[currentIndex]) return;
    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;
  }

  /**
   * showNext — Navigates to the next image (wraps around).
   */
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  /**
   * showPrev — Navigates to the previous image (wraps around).
   */
  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  /* Event: Click on gallery item to open lightbox */
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index, 10);
      openGallery(index);
    });
  });

  /* Event: Close lightbox */
  lightboxClose.addEventListener('click', closeGallery);

  /* Event: Click on overlay (outside image) to close */
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeGallery();
    }
  });

  /* Event: Prev/Next buttons */
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  /* Event: Keyboard navigation */
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeGallery();
        break;
      case 'ArrowRight':
        showNext();
        break;
      case 'ArrowLeft':
        showPrev();
        break;
    }
  });
}
