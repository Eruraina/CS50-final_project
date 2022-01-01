const navList = document.querySelector('.nav__list');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', () => {
    const visibility = navList.getAttribute('data-visible');

    if (visibility === 'false') {
        navList.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
    } else {
        navList.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
    }
});