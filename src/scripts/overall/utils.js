import {SELECTORS} from 'Scripts/data/data';

function padString(value) {
  return value < 10 ? `0${value}` : value.toString();
}

const getCurrentYear = () => {
  const date = new Date();
  const currentYears = document.querySelectorAll('.current-year');

  currentYears.forEach((item) => {
    item.textContent = `${date.getFullYear()}`;
  });
};

function scrollToBlock() {
  document.querySelectorAll("a[href*='#']").forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();

      const href = this.getAttribute('href');
      const targetId = href.includes('/#') ? href.split('/#')[1] : href.substring(1);
      const targetElement = document.getElementById(targetId);
      const headerHeight = SELECTORS?.header?.offsetHeight || 0;

      console.log('Clicked link:', href);
      console.log('Extracted target ID:', targetId);
      console.log('Found target element:', targetElement);

      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        console.log('Scrolling to:', targetPosition);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Обновляем URL без перезагрузки
        history.pushState(null, null, `#${targetId}`);
      } else {
        console.warn(`⚠️ Блок с id="${targetId}" не найден! Проверь HTML.`);
      }
    });
  });
}


function scrollToLocation() {
  const hash = window.location.hash.substring(1);
  const targetElement = document.getElementById(hash);
  const headerHeight = SELECTORS.header?.offsetHeight || 0;

  if (targetElement) {
    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
}

export {
  padString,
  getCurrentYear,
  scrollToBlock,
  scrollToLocation,
};
