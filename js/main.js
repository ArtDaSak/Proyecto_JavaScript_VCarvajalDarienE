window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.header img');

    if (window.scrollY > 10) {
        header.style.background = 'linear-gradient(to bottom right, rgba(43, 39, 47), rgba(1, 1, 1))';
        logo.src = './assets/img/logos/textLogo/textLogoColumbiaBlue.png';
    } else {
        header.style.background = 'rgba(43, 39, 47, 0.50)';
        logo.src = './assets/img/logos/textLogo/textLogoFireEngineRed.png';
    }
});