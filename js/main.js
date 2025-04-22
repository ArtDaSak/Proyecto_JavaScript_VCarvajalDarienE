window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');

    if (window.scrollY > 10) {
        header.style.background = 'linear-gradient(to bottom right, rgba(1, 1, 1), rgba(43, 39, 47))';
    } else {
        header.style.background = 'rgba(43, 39, 47, 0.50)'
    }
});