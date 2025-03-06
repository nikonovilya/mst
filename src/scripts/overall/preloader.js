import { SELECTORS } from 'Scripts/data/data';
import { scrollToLocation } from 'Scripts/overall/utils';

function hidePreloaderAfterLoad() {
  SELECTORS.pageWrapper.classList.add('visibility-hidden');

  window.addEventListener('load', () => {
    SELECTORS.preloader.classList.add('visibility-hidden');
    setTimeout(() => {
      SELECTORS.pageWrapper.classList.remove('visibility-hidden');
      scrollToLocation();
    }, 500);
  });
}

hidePreloaderAfterLoad();
