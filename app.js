// Page Loader

const pageLoader = function () {
  const loader = document.querySelector('.loader');

  window.addEventListener('load', () => {
    loader.classList.add('hidden');
    const tl = gsap.timeline(
      { paused: true },
      { defaults: { duration: 1.75 } }
    );

    const mqs = [
      window.matchMedia('(min-width: 600px)'),
      window.matchMedia('(min-width: 768px)'),
      window.matchMedia('(min-width: 1200px)'),
    ];

    if (mqs[2].matches) {
      tl.play();

      tl.from('.header__images', {
        // scale: 1.1,
        xPercent: -80,
        delay: 2.5,
        ease: 'back.inOut',
        duration: 1,
      });
      tl.from(
        '.heading--1',
        {
          opacity: 0,
          x: 100,
          ease: 'back',
          duration: 0.8,
        },
        '<95%'
      );
      tl.from(
        '#btn--header',
        {
          opacity: 0,
          y: 20,
        },
        '<85%'
      );
    }
  });
};

// Navigation

const navigationSwitch = function () {
  const burger = document.querySelector('.hamburger');
  const burgerText = document.querySelector('.hamburger__text');
  const nav = document.querySelector('.nav');
  const navListOverlay = document.querySelector('.nav__list--overlay');
  const navListWrapper = document.querySelector('.nav__list--wrapper');

  const navAriaExpandedState = function (state) {
    nav.querySelectorAll('[aria-expanded]').forEach((element) => {
      element.setAttribute('aria-expanded', state);
    });
  };

  const navTranslate = function (navOverlayPosition, navListPosition) {
    navListOverlay.style.transform = `translateX(${navOverlayPosition}%)`;
    navListWrapper.style.transform = `translateX(${navListPosition}%)`;
  };

  const toggleHam = function (e) {
    if (
      e.target.hasAttribute('aria-expanded') ||
      e.target.classList.contains('hamburger__line') ||
      e.target.classList.contains('nav__link')
    ) {
      const eState = burger.getAttribute('aria-expanded');

      if (eState === 'true' || e.target.classList.contains('nav__link')) {
        burger.classList.remove('toggleHam');
        burgerText.classList.add('hamburger__active');
        burgerText.classList.remove('hamburger__inactive');
        setTimeout(() => (burgerText.textContent = 'MENU'), 400);
        navTranslate(-150, -100);
        navAriaExpandedState(false);
      } else {
        burger.classList.add('toggleHam');
        burgerText.classList.remove('hamburger__active');
        burgerText.classList.add('hamburger__inactive');
        setTimeout(() => (burgerText.textContent = 'ZAMKNIJ'), 400);
        navTranslate(0, 0);
        navAriaExpandedState(true);
      }
    }
  };

  nav.addEventListener('click', toggleHam);
};

// Product section composition switch

const compositionSwitch = function () {
  const box = document.querySelector('.products__box');
  const productDetails = document.querySelectorAll('.products__composition');
  const buttons = document.querySelectorAll('.products__buttons');

  const nutritionsOptions = {
    1: [
      '1811kJ',
      '433kcal',
      '17.8g',
      '3.2g',
      '59.3g',
      '6.9g',
      '3.2g',
      '11.7g',
      '0.04g',
    ],
    2: [
      '1673kJ',
      '400kcal',
      '11.3g',
      '2.7g',
      '67.9g',
      '8g',
      '4.2g',
      '10.2g',
      '0.04g',
    ],
    3: [
      '1524kJ',
      '365kcal',
      '6.85g',
      '2.2g',
      '68.1g',
      '6.4g',
      '2g',
      '8.7g',
      '6.63g',
    ],
  };

  const ingredientsGenerator = function (ingredient) {
    return `
    <div
        class="products__composition--ingredients"
      >
        <p class="pg">
        Składniki: mąka pszenna, <b>${ingredient}</b>, tłuszcz roślinny, cukier, drożdże,
        wodorotlenek sodu <br> (regulator kwasowości).
        </p>

      </div>
    </div>`;
  };

  const nutritientsGenerator = function (nutritionData) {
    return `
    <div
    class="products__composition--nutrition"
    >
    <table>

    <tbody>
      <tr>
        <th scope="row">
        <b>Wartość odżywcza w</b>
        </th>
        <td>100g</td>
      </tr>
      <tr>
        <th scope="row">Wartość energetyczna</th>
        <td>
          ${nutritionData[0]}
          <br />
          ${nutritionData[1]}
        </td>
      </tr>
      <tr>
        <th scope="row">
          Tłuszcz
        </th>
        <td>
        ${nutritionData[2]}
        </td>

      </tr>
      <tr>
      <th scope="row">
      w tym kwasy tłuszczowe nasycone
      </th>

      <td>${nutritionData[3]}</td>
      </tr>
      <tr>
        <th scope="row">
          Węglowodany
          <span class="th--sm">w tym cukry</span>
        </th>
        <td>
        ${nutritionData[4]}
        </td>
      </tr>
      <tr>
      <th scope="row">
        w tym cukry
        </th>
        <td>
          ${nutritionData[5]}
        </td>
      </tr>
      <tr>
        <th scope="row">Błonnik</th>
        <td>${nutritionData[6]}</td>
      </tr>
      <tr>
        <th scope="row">Białko</th>
        <td>${nutritionData[7]}</td>
      </tr>
      <tr>
        <th scope="row">Sól</th>
        <td>${nutritionData[8]}</td>
      </tr>
    </tbody>
    </table>
    </div>
    `;
  };

  const ingredientsOptions = {
    1: 'ziarno sezamowe (20%)',
    2: 'mak (3%)',
    3: 'sól (2%)',
  };

  productDetails.forEach((product, e) => {
    product.insertAdjacentHTML(
      'beforeend',
      nutritientsGenerator(
        nutritionsOptions[`${product.dataset.boxcomposition}`]
      )
    );
  });

  const switchData = function (e, HTMLOption) {
    e.target.classList.replace('opacity--half', 'opacity--full');
    [...e.target.parentElement.children].forEach((el) => {
      if (el !== e.target)
        el.classList.replace('opacity--full', 'opacity--half');
      e.target.parentElement.nextElementSibling.remove();
      e.target
        .closest('.products__composition')
        .insertAdjacentHTML('beforeend', HTMLOption);
      e.target.parentElement.nextElementSibling.classList.add('show');
    });
  };

  box.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('products__btn--nutritients') &&
      !e.target.parentElement.nextElementSibling.classList.contains(
        'products__composition--nutrition'
      )
    ) {
      switchData(
        e,
        nutritientsGenerator(
          nutritionsOptions[
            `${e.target
              .closest('[data-boxComposition]')
              .getAttribute('data-boxComposition')}`
          ]
        )
      );
    } else if (
      e.target.classList.contains('products__btn--ingredients') &&
      !e.target.parentElement.nextElementSibling.classList.contains(
        'products__composition--ingredients'
      )
    ) {
      switchData(
        e,
        ingredientsGenerator(
          ingredientsOptions[
            `${e.target
              .closest('[data-boxComposition]')
              .getAttribute('data-boxComposition')}`
          ]
        )
      );
    }
  });
};

// Form Modal handle

const modalOptions = function () {
  const form = document.querySelector('.contact__modal');
  const closeBtn = document.querySelector('#btn__form--close');
  const openBtn = document.querySelector('#btn__form--open');

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.classList.add('hidden');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      form.classList.add('hidden');
    } else return;
  });
};

// Products section images effects

const imagesEffects = function () {
  const productImages = document.querySelectorAll('.products__image');
  const productCards = document.querySelectorAll('.products__card');

  const revealProducts = function (entries, observer) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      entry.target.classList.add('animation--hide');
      entry.target.nextElementSibling.classList.remove('animation--move');
    } else {
      entry.target.classList.remove('animation--hide');
      entry.target.nextElementSibling.classList.add('animation--move');
      observer.unobserve(entry.target);
    }
  };

  const productsObserver = new IntersectionObserver(revealProducts, {
    root: null,
    threshold: 0.3,
  });

  productImages.forEach((product) => {
    product.classList.add('animation--hide');
    product.nextElementSibling.classList.remove('animation--move');
    productsObserver.observe(product);
  });
};

const callFunctions = function () {
  pageLoader(); // Page Loader

  navigationSwitch(); // Navigation

  compositionSwitch(); // Product section composition switch

  modalOptions(); // Form Modal handle

  imagesEffects(); // Products section images effects
};

callFunctions();
