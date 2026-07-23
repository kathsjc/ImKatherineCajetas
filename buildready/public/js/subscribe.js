document.addEventListener("DOMContentLoaded", () => {
    const formElements = [
        { email: "email", button: "btn-submit" },
        { email: "cta-email", button: "btn-cta-submit" }
    ];

    formElements.forEach(({ email, button }) => {
        const emailInput = document.getElementById(email);
        const submitBtn = document.getElementById(button);

        if (!emailInput || !submitBtn) {
            console.error(`Missing elements: ${email} or ${button}`);
            return;
        }

        submitBtn.setAttribute('disabled', true);

        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim() !== "" && emailInput.validity.valid) {
                setValidState(submitBtn);
            } else {
                setInvalidState(submitBtn);
            }
        });

        // Prevent default on submit
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            emailInput.value = "";
            setInvalidState(submitBtn);
            console.log('submit!');
        });
    });

    function setValidState(button) {
        button.classList.remove('bg-orange/50', 'cursor-not-allowed');
        button.classList.add('bg-orange', 'cursor-pointer');
        button.removeAttribute('disabled');
    }

    function setInvalidState(button) {
        button.classList.add('bg-orange/50', 'cursor-not-allowed');
        button.classList.remove('bg-orange', 'cursor-pointer');
        button.setAttribute('disabled', true);
    }
});
