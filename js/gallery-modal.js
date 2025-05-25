document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-grid img');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.closebtn');
    const body = document.body;
  
  
    images.forEach(img => {
      img.addEventListener('click', () => {
        // Показываем модалку только если ширина экрана до 768px
        if (window.innerWidth <= 768) {
          modalImage.src = img.src;
          modalImage.alt = img.alt;
          modalOverlay.style.display = 'flex';
          body.style.overflow = 'hidden';
        }
      });
    });
  
    modalClose.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
      modalImage.src = '';
      modalImage.alt = '';
      body.style.overflow = '';
    });
  
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalClose.click();
      }
    });
  });
  