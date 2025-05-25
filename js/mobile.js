document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.getElementById('overlay');

    let scrollPosition = 0;

    burgerBtn.addEventListener('click', () => {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        mobileMenu.classList.add('active');
        overlay.style.display = 'block';

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.style.display = 'none';

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';

        window.scrollTo(0, scrollPosition);
    });

    // Дополнительно — клик по оверлею тоже закрывает меню
    overlay.addEventListener('click', () => {
        closeBtn.click();
    });
});
