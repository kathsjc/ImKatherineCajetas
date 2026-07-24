document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtnLLM = document.getElementById('dropdownBtnLLM');
    const dropdownMenuLLM = document.getElementById('dropdownMenuLLM');
    const selectedTextLLM = document.getElementById('selectedTextLLM');
    const selectedLLM = document.getElementById('selectedLLM');
    const arrowIconLLM = dropdownBtnLLM.querySelector('.select-arrow');

    const dropdownBtnModel = document.getElementById('dropdownBtnModel');
    const dropdownMenuModel = document.getElementById('dropdownMenuModel');
    const selectedTextModel = document.getElementById('selectedTextModel');
    const selectedModel = document.getElementById('selectedModel');
    const arrowIconModel = dropdownBtnModel.querySelector('.select-arrow');

    const displayInput = document.getElementById('api-key');
    const toggleBtn = document.getElementById('toggle-visibility');

    let realValue = '';
    let revealed = false;

    function getMaskedValue(str) {
      const visibleStart = 6;
      const visibleEnd = 4;

      if (str.length <= visibleStart + visibleEnd) {
        return str; 
    }

      const start = str.slice(0, visibleStart);
      const end = str.slice(-visibleEnd);
      const masked = '*'.repeat(str.length - visibleStart - visibleEnd);
      return `${start}${masked}${end}`;
      }

    function updateDisplay() {
      const pos = displayInput.selectionStart;
      displayInput.value = revealed ? realValue : getMaskedValue(realValue);
      setTimeout(() => displayInput.setSelectionRange(pos, pos), 0);
    }

    displayInput.addEventListener('input', (e) => {
      const input = e.target.value;
      let updated = '';
      let i = 0;

      for (let j = 0; j < input.length; j++) {
        const ch = input[j];

        if (ch !== '*') {
          updated += ch;
          i++;
        } else {
          if (realValue[i]) {
            updated += realValue[i];
            i++;
          }
        }
      }

      realValue = updated;
      updateDisplay();
    });

    toggleBtn.addEventListener('click', () => {
      revealed = !revealed;

      toggleBtn.querySelector('img').src = revealed
        ? '../images/eye.svg'
        : '../images/eye-off.svg';

      updateDisplay();
    });

    updateDisplay();
  
    function toggleDropdown(dropdownMenu, arrowIcon) {
      const isOpen = dropdownMenu.style.display === 'block';
      dropdownMenu.style.display = isOpen ? 'none' : 'block';
      arrowIcon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      dropdownBtnLLM.style.borderBottomLeftRadius = isOpen ? '8px' : '0';
      dropdownBtnLLM.style.borderBottomRightRadius = isOpen ? '8px' : '0';
      dropdownBtnModel.style.borderBottomLeftRadius = isOpen ? '8px' : '0';
      dropdownBtnModel.style.borderBottomRightRadius = isOpen ? '8px' : '0';
    }

    dropdownBtnLLM.addEventListener('click', () => {
      toggleDropdown(dropdownMenuLLM, arrowIconLLM);
    });

    dropdownBtnModel.addEventListener('click', () => {
      toggleDropdown(dropdownMenuModel, arrowIconModel);
    });

    document.querySelectorAll('#dropdownMenuLLM .dropdown-option').forEach(option => {
      option.addEventListener('click', () => {
        const newValue = option.getAttribute('data-value');
        const currentValue = selectedTextLLM.textContent;

        option.textContent = currentValue;
        option.setAttribute('data-value', currentValue);

        selectedTextLLM.textContent = newValue;
        selectedLLM.value = newValue;

        dropdownMenuLLM.style.display = 'none';
        arrowIconLLM.style.transform = 'rotate(0deg)';
      });
    });

    document.querySelectorAll('#dropdownMenuModel .dropdown-option').forEach(option => {
      option.addEventListener('click', () => {
        const newValue = option.getAttribute('data-value');
        const currentValue = selectedTextModel.textContent;

        option.textContent = currentValue;
        option.setAttribute('data-value', currentValue);

        selectedTextModel.textContent = newValue;
        selectedModel.value = newValue;

        dropdownMenuModel.style.display = 'none';
        arrowIconModel.style.transform = 'rotate(0deg)';
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdownBtnLLM.contains(e.target) && !dropdownBtnModel.contains(e.target) && 
          !dropdownMenuLLM.contains(e.target) && !dropdownMenuModel.contains(e.target)) {
        dropdownMenuLLM.style.display = 'none';
        dropdownMenuModel.style.display = 'none';
        arrowIconLLM.style.transform = 'rotate(0deg)';
        arrowIconModel.style.transform = 'rotate(0deg)';
      }
    });

    document.querySelector('header h1').addEventListener('click', function() {
      window.location.href = './home';
    }); 
    
    const updateBtn = document.getElementById('update-btn');
    const updateToast = document.getElementById('update-toast');
    updateToast.classList.add('hidden');
    updateBtn.addEventListener('click', function() {
      updateToast.classList.remove('hidden');
      setTimeout(() => {
        updateToast.classList.add('hidden');
      }, 2000);
    });
});
