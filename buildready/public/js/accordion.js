document.querySelectorAll('.accordion-item').forEach((item) => {
    const summary = item.querySelector('.accordion-header');
    const arrow = item.querySelector('.arrow-icon');
    
    item.setAttribute('open', '');

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      item.toggleAttribute('open');
      arrow.classList.toggle('scale-y-[-1]');
    });
  });