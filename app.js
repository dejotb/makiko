"use strict";

// Navigation

const navigation = function () {
    const burger = document.querySelector('.hamburger')
    const burgerText = document.querySelector('.hamburger__text')
    const nav = document.querySelector('.nav')
    const navListOverlay = document.querySelector('.nav__list--overlay')
    const navList = document.querySelector('.nav__list')

    const navAriaExpandedState = function (state) {
        nav.querySelectorAll('[aria-expanded]').forEach(element => {
            element.setAttribute('aria-expanded', state);
        })
    }

    const navTranslate = function (navOverlayPosition, navListPosition) {
        navListOverlay.style.transform = 'translateX(-150%)'
        navList.style.transform = 'translateX(-100%)'
        navListOverlay.style.transform = `translateX(${navOverlayPosition}%)`
        navList.style.transform = `translateX(${navListPosition}%)`
    }

    navTranslate()

    const toggleHam = function (e) {
        if (e.target.hasAttribute('aria-expanded') || e.target.classList.contains('hamburger__line') || e.target.classList.contains('nav__link')) {
            const eState = burger.getAttribute('aria-expanded')

            if (eState === 'true' || e.target.classList.contains('nav__link')) {
                burger.classList.remove('toggleHam')
                burgerText.classList.add('hamburger__active')
                burgerText.classList.remove('hamburger__inactive')
                setTimeout( () => burgerText.textContent = 'MENU', 400)
                navTranslate(-150, -100)
                navAriaExpandedState(false)

            } else {
                burger.classList.add('toggleHam')
                burgerText.classList.remove('hamburger__active')
                burgerText.classList.add('hamburger__inactive')
                setTimeout( () => burgerText.textContent = 'ZAMKNIJ', 400)
                navTranslate(0, 0)
                navAriaExpandedState(true)
            }
        }
    }

    nav.addEventListener('click', toggleHam)
}

navigation()