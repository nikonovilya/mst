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
      // const targetId = this.getAttribute('href').substring(1);
      const targetId = this.getAttribute('href');
      const targetElement = document.getElementById(targetId);
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
