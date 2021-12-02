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

  // navTranslate();

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

navigationSwitch();

// Image docking

const products = document.querySelector('.products');
const image = document.querySelector('.img__scrolled');
// console.log(image);

const movingImage = function (entries) {
  const entry = entries[0];
  // entries.forEach(entry => console.log(entry))
  if (!entry.isIntersecting) {
    // image.classList.add('header__img')
    image.classList.remove('img-1');
    image.classList.add('img__scrolled');
  } else {
    // image.classList.remove('header__img')
    image.classList.add('img-1');
    image.classList.remove('img__scrolled');
  }
};

const productsOptions = {
  root: null,
  threshold: [0.195],
  rootMargin: '0px',
};

const productsObserver = new IntersectionObserver(movingImage, productsOptions);

// productsObserver.observe(products);

let lastKnownScrollPosition = 0;

const productScroll = function () {
  window.addEventListener('scroll', (e) => {
    lastKnownScrollPosition = e.currentTarget.pageYOffset;
    // console.log(lastKnownScrollPosition);
    // image.style.transform = `translateY('${lastKnownScrollPosition}px')`
    // image.style.transform = `translate3d(0, ${lastKnownScrollPosition/3 -400}px ,0) `
    image.style.transform = `scale(${lastKnownScrollPosition / 500})`;
    console.log(`-${1 + lastKnownScrollPosition / 150}`);
    // image.style.transform = `martix(${lastKnownScrollPosition} -200px, 0, 0, ${lastKnownScrollPosition } -200px, 0,1 })`
  });
};

// productScroll()

// Product section composition switch

const compositionSwitch = function () {
  const box = document.querySelector('.products__box');
  const productDetails = document.querySelectorAll('.products__composition');

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
        class="show products__composition--ingredients"

      >
        <ul>
          <li>mąka pszenna,</li>
          <li>${ingredient},</li>
          <li>tłuszcz roślinny,</li>
          <li>cukier,</li>
          <li>drożdże,</li>
          <li>wodorotlenek sodu (regulator kwasowości).</li>
        </ul>
      </div>
    </div>`;
  };

  const nutritientsGenerator = function (nutritionData) {
    return `
    <div
    class="show products__composition--nutrition"
    >
    <table>

    <tbody>
      <tr>
        <th scope="row">
          Wartość odżywcza w
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
          <br />
          <span class="th--sm">w tym kwasy tłuszczowe nasycone</span>
        </th>
        <td>
        ${nutritionData[2]}
          <br />
          ${nutritionData[3]}
        </td>
      </tr>
      <tr>
        <th scope="row">
          Węglowodany
          <br />
          <span class="th--sm">w tym cukry</span>
        </th>
        <td>
        ${nutritionData[4]}
          <br />
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

  productDetails.forEach((product) => {
    product.insertAdjacentHTML(
      'beforeend',
      ingredientsGenerator(
        ingredientsOptions[`${product.dataset.boxcomposition}`]
      )
    );
  });

  const switchData = function (e, HTMLOption, cardType) {
    e.target.parentElement.querySelector(cardType).classList.add('hide');
    e.target.classList.replace('opacity--half', 'opacity--full');

    [...e.target.parentElement.children].forEach((el) => {
      if (el !== e.target)
        el.classList.replace('opacity--full', 'opacity--half');
      e.target.parentElement.querySelector(cardType).remove();
      e.target.parentElement.insertAdjacentHTML('beforeend', HTMLOption);
    });
  };

  box.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('products__btn--nutritients') &&
      !e.target.parentElement.querySelector('.products__composition--nutrition')
    ) {
      switchData(
        e,
        nutritientsGenerator(
          nutritionsOptions[`${e.target.parentElement.dataset.boxcomposition}`]
        ),
        '.products__composition--ingredients'
      );
    } else if (
      e.target.classList.contains('products__btn--ingredients') &&
      !e.target.parentElement.querySelector(
        '.products__composition--ingredients'
      )
    ) {
      switchData(
        e,
        ingredientsGenerator(
          ingredientsOptions[`${e.target.parentElement.dataset.boxcomposition}`]
        ),
        '.products__composition--nutrition'
      );
    }
  });
};

compositionSwitch();
