window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');

    if (window.scrollY > 10) {
        header.style.backgroundColor = 'rgba(72, 68, 76, 1)'; // Cambiar a opaco
    } else {
        header.style.backgroundColor = 'rgba(43, 39, 47, 0.75)'; // Volver a semitransparente
    }
});