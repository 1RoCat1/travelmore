const smoothScroll = () => {
  const links = document.querySelectorAll('.scroll-link');

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
};

smoothScroll();