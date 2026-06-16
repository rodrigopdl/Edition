(function () {
    var initialized = false;

    function ensureMessageElement(form, selector, className) {
        var el = form.querySelector(selector);
        if (!el) {
            el = document.createElement('p');
            el.className = className;
            form.appendChild(el);
        }
        return el;
    }

    function showSuccess(successEl, errorEl) {
        if (successEl) {
            successEl.innerHTML = 'Casi listo. Revisá tu correo y confirmá la suscripción haciendo clic en el enlace que te envié. Si no lo ves, revisá spam o promociones.';
            successEl.style.display = 'block';
        }
        if (errorEl) errorEl.style.display = 'none';
    }

    function getButtonParts(button) {
        if (!button) return {};
        return {
            defaultSpan: button.querySelector('.default, .btn-text'),
            loaderSpan: button.querySelector('.loader, .btn-loader'),
            successSpan: button.querySelector('.success, .btn-success')
        };
    }

    function setButtonLoading(button) {
        if (!button) return;
        var parts = getButtonParts(button);
        if (!button.dataset.originalLabel) {
            button.dataset.originalLabel = button.textContent.trim();
        }
        button.classList.remove('is-success');
        button.classList.add('is-loading');
        if (parts.defaultSpan || parts.loaderSpan || parts.successSpan) {
            if (parts.defaultSpan) parts.defaultSpan.style.display = 'none';
            if (parts.successSpan) parts.successSpan.style.display = 'none';
            if (parts.loaderSpan) parts.loaderSpan.style.display = 'inline-flex';
        } else {
            button.textContent = 'Enviando…';
        }
        button.setAttribute('disabled', 'disabled');
    }

    function setButtonSuccess(button) {
        if (!button) return;
        var parts = getButtonParts(button);
        button.classList.remove('is-loading');
        button.classList.add('is-success');
        if (parts.defaultSpan || parts.loaderSpan || parts.successSpan) {
            if (parts.loaderSpan) parts.loaderSpan.style.display = 'none';
            if (parts.defaultSpan) parts.defaultSpan.style.display = 'none';
            if (parts.successSpan) parts.successSpan.style.display = 'inline-flex';
        } else {
            button.textContent = '¡Listo!';
        }
        // keep disabled on success
        button.setAttribute('disabled', 'disabled');
    }

    function setButtonIdle(button) {
        if (!button) return;
        var parts = getButtonParts(button);
        button.classList.remove('is-loading');
        button.classList.remove('is-success');
        if (parts.defaultSpan || parts.loaderSpan || parts.successSpan) {
            if (parts.loaderSpan) parts.loaderSpan.style.display = 'none';
            if (parts.successSpan) parts.successSpan.style.display = 'none';
            if (parts.defaultSpan) parts.defaultSpan.style.display = 'inline-flex';
        } else if (button.dataset.originalLabel) {
            button.textContent = button.dataset.originalLabel;
        }
        button.removeAttribute('disabled');
    }

    function bindForms() {
        if (initialized) return;
        var forms = document.querySelectorAll('[data-members-form]');
        if (!forms.length) return;

        forms.forEach(function (form) {
            if (form.__membersBound) return;
            form.__membersBound = true;

            var button = form.querySelector('button');
            var email = form.querySelector('input[data-members-email]');
            var error = ensureMessageElement(form, '.error-message', 'error-message');
            var success = ensureMessageElement(form, '.success-message', 'success-message');

            form.addEventListener('submit', function (event) {
                var portal = window.ghostPortal;
                var canUsePortalAPI = portal && typeof portal.sendMagicLink === 'function';

                if (canUsePortalAPI) {
                    event.preventDefault();
                    setButtonLoading(button);

                    var emailAddress = email && email.value ? email.value : '';
                    var name = '';

                    portal.sendMagicLink({ emailAddress: emailAddress, name: name }).then(function () {
                        showSuccess(success, error);
                        setButtonSuccess(button);
                    }).catch(function (err) {
                        setButtonIdle(button);

                        if (error) {
                            var msg = 'No se pudo completar la suscripción. Inténtalo de nuevo.';
                            if (err && typeof err.message === 'string') {
                                if (err.message.includes('already exists')) {
                                    msg = 'Este email ya está suscripto. ¡Gracias!';
                                } else if (err.message.includes('valid email')) {
                                    msg = 'Por favor, introduce una dirección de correo válida.';
                                }
                            }
                            error.innerHTML = msg;
                            error.style.display = 'block';
                        }
                        if (success) success.style.display = 'none';
                    });
                } else {
                    // Optimistic UI: show immediate success and mark button as success
                    showSuccess(success, error);
                    setButtonSuccess(button);
                    // Do not preventDefault to allow Portal to intercept and send the email
                }
            });

            if (email) {
                email.addEventListener('input', function () {
                    setButtonIdle(button);
                    if (error) error.style.display = 'none';
                    if (success) success.style.display = 'none';
                });
            }
        });

        initialized = true;
    }

    // Initialize when Portal is ready (correct target is window)
    window.addEventListener('portal-ready', bindForms);
    // Backward/alternate event name just in case
    window.addEventListener('ghost-portal-ready', bindForms);

    // If Portal is already available, initialize immediately
    if (window.ghostPortal) {
        bindForms();
    } else {
        // As a fallback, attempt after DOM is ready in case Portal loaded early/late
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(bindForms, 0);
        } else {
            document.addEventListener('DOMContentLoaded', bindForms);
        }
    }
})();
