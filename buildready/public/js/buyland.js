document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");  
    const arrow = document.querySelector(".select-arrow");
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const options = document.querySelectorAll(".dropdown-option");
    const input = document.querySelector(".select-input");
    const text = document.getElementById("drop-text");
    const hiddenInput = document.getElementById("selectedState");
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    const errorMessages = document.querySelectorAll(".error-form");
  
    errorMessages.forEach(error => error.classList.add("invisible"));
    inputs.forEach(input => input.classList.remove("border-red"));
  
    if (input.textContent.includes("Select State")) {
      input.classList.add("text-black/50");
    }
  
    dropdownMenu.classList.add("hidden");
  
    options.forEach(option => {
      option.addEventListener("click", (event) => {
        const selectedValue = event.target.getAttribute("data-value");
        text.textContent = selectedValue;
        hiddenInput.value = selectedValue;
        dropdownMenu.classList.add("hidden");
        input.classList.replace("text-black/50", "text-black");
        arrow.classList.toggle("scale-y-[-1]");
  
        const stateError = hiddenInput.nextElementSibling;
        if (stateError?.classList.contains("error-form")) {
          stateError.classList.add("invisible");
          stateError.classList.remove("md:my-[24px]");
          dropdownBtn.classList.remove("border-red", "text-red/30");
        }
      });
    });
  
    dropdownBtn.addEventListener("click", () => {
      dropdownMenu.classList.toggle("hidden");
      arrow.classList.toggle("scale-y-[-1]");
    });
  
    document.addEventListener("click", (event) => {
      if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });
  
    form.addEventListener("submit", (event) => {
      let isValid = true;
  
      inputs.forEach((input) => {
        const errorMessage = input.nextElementSibling;
        if (!input.checkValidity()) {
          isValid = false;
          errorMessage?.classList.replace("invisible", "md:my-[24px]");
          input.classList.add("border-red", "placeholder-red/50");
        } else {
          errorMessage?.classList.replace("md:my-[24px]", "invisible");
          input.classList.remove("border-red", "placeholder-red/50");
        }
      });
  
      const stateError = hiddenInput.nextElementSibling;
      if (!hiddenInput.value.trim()) {
        isValid = false;
        stateError?.classList.replace("invisible", "md:my-[24px]");
        dropdownBtn.classList.add("border-red", "text-red/30");
      } else {
        stateError?.classList.replace("md:my-[24px]", "invisible");
        dropdownBtn.classList.remove("border-red", "text-red/30");
      }
  
      if (!isValid) {
        event.preventDefault(); 
      } else {
        event.preventDefault();
        window.location.href = "./thank-you/";
      }
    });
  
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const errorMessage = input.nextElementSibling;
        errorMessage?.classList.replace("md:my-[24px]", "invisible");
        input.classList.remove("border-red", "placeholder-red/50");
      });
    });
  });
  