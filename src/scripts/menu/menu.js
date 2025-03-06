import { SELECTORS } from 'Scripts/data/data';
import { toggleMenu, closeMenu } from 'Scripts/menu/utils';

SELECTORS.menuButton.addEventListener('click', toggleMenu);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && SELECTORS.menu.classList.contains('active')) closeMenu();
});
