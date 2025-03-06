import { SELECTORS } from 'Scripts/data/data';

let isActive = false;

const toggleMenu = () => {
  if (isActive) {
    SELECTORS.header.classList.remove('menu-opened');
    SELECTORS.menu.classList.remove('active');
    SELECTORS.menuButton.classList.remove('active');
    SELECTORS.body.classList.remove('overflow-hidden');
  } else {
    SELECTORS.header.classList.add('menu-opened');
    SELECTORS.menu.classList.add('active');
    SELECTORS.menuButton.classList.add('active');
    SELECTORS.body.classList.add('overflow-hidden');
  }
  isActive = !isActive;
}

const closeMenu = () => {
  SELECTORS.header.classList.remove('menu-opened');
  SELECTORS.menu.classList.remove('active');
  SELECTORS.menuButton.classList.remove('active');
  SELECTORS.body.classList.remove('overflow-hidden');
  isActive = false;
}

export { toggleMenu, closeMenu };
