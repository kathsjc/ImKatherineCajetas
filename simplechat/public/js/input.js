const messageInput = document.getElementById('message-input');
const charCount = document.getElementById('char-count');
const messageSubmit = document.getElementById('message-submit');

document.querySelectorAll('.status-input button').forEach(btn => {
    btn.classList.add('opacity-[10%]');
});

document.querySelectorAll('input').forEach(input => {
    input.classList.add('text-active-text');
});

messageInput.addEventListener('input', updateCharCount);

function updateCharCount() {
    const currentLength = messageInput.value.length;
    if (charCount){
      charCount.textContent = `${currentLength}/160`;
    }

    if (currentLength>0){
        messageSubmit.classList.remove('opacity-[10%]');
        messageSubmit.classList.add('opacity-100');
    } else {
        messageSubmit.classList.add('opacity-[10%]');
        messageSubmit.classList.remove('opacity-100');
    }
}

function updateResponsiveButtons() {
    const isXL = window.matchMedia('(min-width: 1024px)').matches;
  
    document.querySelectorAll('.action-btn').forEach(button => {
      const xlText = button.dataset.textXl;
      const defaultText = button.dataset.textDefault;
      button.textContent = isXL ? xlText : defaultText;
    });
}
  
window.addEventListener('DOMContentLoaded', updateResponsiveButtons);
window.addEventListener('resize', updateResponsiveButtons);

const header = document.getElementById('header');
const overlay = document.getElementById('gradient-overlay');

const updateOverlayTop = () => {
  overlay.style.top = `${header.offsetHeight}px`;
};

updateOverlayTop();
window.addEventListener('resize', updateOverlayTop);