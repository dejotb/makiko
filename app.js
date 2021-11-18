const burger = document.querySelector('.hamburger')
const burgerLine = document.querySelector('.hamburger__line')
const burgerText = document.querySelector('.hamburger__text')
const navListWrapper = document.querySelector('.nav__list--wrapper')
const navList = document.querySelector('.nav__list')
const nav = document.querySelector('.nav')





// toggle hamburger


// console.log([...e.currentTarget.children].some(item => item.hasAttribute('aria-expanded')));
    // console.log(e.target.classList.contains('nav__link'));



const toggleHam = function (e) {
    console.log(e.target.hasAttribute('aria-expanded'));
    if (e.target.hasAttribute('aria-expanded') || e.target.classList.contains('nav__link')) {
        const eState = e.target.getAttribute('aria-expanded')

        if (eState == 'true' || e.target.classList.contains('nav__link')) {
            burger.classList.remove('toggleHam')
            navListWrapper.style.transform = 'translateX(-250%)'
            navList.style.transform = 'translateX(-100%)'
            burgerText.classList.add('hamburger__active')
            burgerText.classList.remove('hamburger__inactive')
            setTimeout( () => burgerText.textContent = 'MENU', 400)



            nav.querySelectorAll('[aria-expanded]').forEach(element => {
                element.setAttribute('aria-expanded', false);
            });

        } else {
            burger.classList.add('toggleHam')
            navListWrapper.style.transform = 'translateX(0)'
            navList.style.transform = 'translateX(0)'
            burgerText.classList.remove('hamburger__active')
            burgerText.classList.add('hamburger__inactive')
            setTimeout( () => burgerText.textContent = 'ZAMKNIJ', 400)

            nav.querySelectorAll('[aria-expanded]').forEach(element => {
                element.setAttribute('aria-expanded', true);
            });

        }
    }

}

nav.addEventListener('click', toggleHam)
// burger.addEventListener('click', toggleHam)

