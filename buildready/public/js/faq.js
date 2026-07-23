document.querySelectorAll('.accordion-item').forEach((item) => {
    const summary = item.querySelector('.accordion-header');
    const arrow = item.querySelector('.arrow-icon');
    
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      item.toggleAttribute('open');
      arrow.classList.toggle('scale-y-[-1]');
    });

    document.addEventListener('click', (event) => {
        if (!item.contains(event.target)) {
            item.removeAttribute('open');
            arrow.classList.remove('scale-y-[-1]');
        }
    });
});