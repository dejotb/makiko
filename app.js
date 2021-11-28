"use strict";

// Navigation

const navigation = function () {
    const burger = document.querySelector('.hamburger')
    const burgerText = document.querySelector('.hamburger__text')
    const nav = document.querySelector('.nav')
    const navListOverlay = document.querySelector('.nav__list--overlay')
    const navListWrapper = document.querySelector('.nav__list--wrapper')

    const navAriaExpandedState = function (state) {
        nav.querySelectorAll('[aria-expanded]').forEach(element => {
            element.setAttribute('aria-expanded', state);
        })
    }

    const navTranslate = function (navOverlayPosition, navListPosition) {
        navListOverlay.style.transform = `translateX(${navOverlayPosition}%)`
        navListWrapper.style.transform = `translateX(${navListPosition}%)`
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



// Image docking


const products = document.querySelector('.products')
const image = document.querySelector('.img__scrolled');
// console.log(image);


const movingImage = function (entries) {
    let entry = entries[0];
    entries.forEach(entry => console.log(entry))
    if (!entry.isIntersecting) {
        // image.classList.add('header__img')
        image.classList.remove('img')
        image.classList.add('img__scrolled')
    } else {
        // image.classList.remove('header__img')
        image.classList.add('img')
        image.classList.remove('img__scrolled')
    }
}


const productsOptions = {
    root: null,
    threshold: [0.20],
    rootMargin: '0px',
}

const productsObserver = new IntersectionObserver(movingImage, productsOptions)

productsObserver.observe(products)


let lastKnownScrollPosition = 0

const productScroll = function() {
    window.addEventListener('scroll', function (e) {
        lastKnownScrollPosition = e.currentTarget.pageYOffset
        // console.log(lastKnownScrollPosition);
        // image.style.transform = `translateY('${lastKnownScrollPosition}px')`
        // image.style.transform = `translate3d(0, ${lastKnownScrollPosition/3 -400}px ,0) `
        image.style.transform = `scale(${lastKnownScrollPosition/500})`
        console.log(`-${1 + lastKnownScrollPosition/150}`);
        // image.style.transform = `martix(${lastKnownScrollPosition} -200px, 0, 0, ${lastKnownScrollPosition } -200px, 0,1 })`

    })

}

// productScroll()