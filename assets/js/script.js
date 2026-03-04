    const form = document.getElementById('contact-form');

    // --- Utilidades ---
    function showError(fieldId, message) {
      const errorEl = document.getElementById(fieldId + '-error');
      const inputEl = document.getElementById(fieldId);
      if (errorEl) errorEl.textContent = message;
      if (inputEl) inputEl.classList.add('input-error');
    }

    function clearError(fieldId) {
      const errorEl = document.getElementById(fieldId + '-error');
      const inputEl = document.getElementById(fieldId);
      if (errorEl) errorEl.textContent = '';
      if (inputEl) inputEl.classList.remove('input-error');
    }

    function isValidEmail(email) {
      // Expresión regular básica para validar formato de email
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    // --- Validación en tiempo real (al salir del campo) ---
    const fields = ['nombre', 'ciudad', 'email', 'asunto', 'descripcion'];
    fields.forEach(function(fieldId) {
      const el = document.getElementById(fieldId);
      if (el) {
        el.addEventListener('blur', function() {
          validateField(fieldId);
        });
        el.addEventListener('input', function() {
          // Limpia el error mientras el usuario escribe (UX)
          if (el.classList.contains('input-error')) {
            validateField(fieldId);
          }
        });
      }
    });

    function validateField(fieldId) {
      const el = document.getElementById(fieldId);
      const value = el ? el.value.trim() : '';
      clearError(fieldId);

      if (fieldId === 'nombre') {
        if (value === '') {
          showError('nombre', 'El nombre es obligatorio.');
          return false;
        }
        if (value.length < 3) {
          showError('nombre', 'El nombre debe tener al menos 3 caracteres.');
          return false;
        }
      }

      if (fieldId === 'ciudad') {
        if (value === '') {
          showError('ciudad', 'La ciudad es obligatoria.');
          return false;
        }
      }

      if (fieldId === 'email') {
        if (value === '') {
          showError('email', 'El email es obligatorio.');
          return false;
        }
        if (!isValidEmail(value)) {
          showError('email', 'Ingresa un email con formato válido (ej: usuario@dominio.com).');
          return false;
        }
      }

      if (fieldId === 'asunto') {
        if (value === '') {
          showError('asunto', 'El asunto es obligatorio.');
          return false;
        }
      }

      if (fieldId === 'descripcion') {
        if (value === '') {
          showError('descripcion', 'La descripción es obligatoria.');
          return false;
        }
        if (value.length < 10) {
          showError('descripcion', 'La descripción debe tener al menos 10 caracteres.');
          return false;
        }
      }

      return true;
    }

    // --- Envío del formulario ---
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita el envío nativo

      // Valida todos los campos
      let isValid = true;
      fields.forEach(function(fieldId) {
        const fieldValid = validateField(fieldId);
        if (!fieldValid) isValid = false;
      });

      if (!isValid) {
        // Hace scroll al primer error visible
        const firstError = form.querySelector('.input-error');
        if (firstError) firstError.focus();
        return;
      }

      // Si todo está bien, muestra mensaje de éxito y reinicia el formulario
      const successMsg = document.getElementById('success-message');
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth' });
      form.reset();
    });