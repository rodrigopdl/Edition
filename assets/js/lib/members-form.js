document.addEventListener('ghost-portal-ready', function () {
    const forms = document.querySelectorAll('[data-members-form]');

    forms.forEach(function (form) {
        const button = form.querySelector('button');
        const email = form.querySelector('input[data-members-email]');
        const error = form.querySelector('.error-message');
        const success = form.querySelector('.success-message');

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            button.setAttribute('disabled', 'disabled');

            const portal = window.ghostPortal;
            const emailAddress = email.value;
            const name = '';

            portal.sendMagicLink({emailAddress, name}).then(() => {
                if (success) {
                    success.innerHTML = '¡Genial! Revisa tu correo para completar la suscripción.';
                    success.style.display = 'block';
                }
                if (error) {
                    error.style.display = 'none';
                }
                // Keep button disabled on success to prevent re-submission
            }).catch((err) => {
                button.removeAttribute('disabled');

                if (error) {
                    if (err.message.includes('already exists')) {
                        error.innerHTML = 'Este email ya está suscripto. ¡Gracias!';
                    } else if (err.message.includes('valid email')) {
                        error.innerHTML = 'Por favor, introduce una dirección de correo válida.';
                    } else {
                        error.innerHTML = 'No se pudo completar la suscripción. Inténtalo de nuevo.';
                    }
                    error.style.display = 'block';
                }
                if (success) {
                    success.style.display = 'none';
                }
            });
        });

        email.addEventListener('input', function () {
            button.removeAttribute('disabled');

            if (error) {
                error.style.display = 'none';
            }
            if (success) {
                success.style.display = 'none';
            }
        });
    });
});
