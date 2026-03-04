    const form = document.getElementById('contact-form');


    function showError(fieldId, message) {
      const errorEl = document.getElementById(fieldId + '-error');
      const inputEl = document.getElementById(fieldId);
      if (errorEl){ errorEl.textContent = message;}
      else if (inputEl){ inputEl.classList.add('input-error');}
    }

    function clearError(fieldId) {
      const errorEl = document.getElementById(fieldId + '-error');
      const inputEl = document.getElementById(fieldId);
      if (errorEl) errorEl.textContent = '';
      if (inputEl) inputEl.classList.remove('input-error');
    }

    function isValidEmail(email) {

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }


var fields = ['nombre', 'ciudad', 'email', 'asunto', 'descripcion'];
for (var i = 0; i < fields.length; i++) {
  (function(fieldId) {
    var el = document.getElementById(fieldId);
    if (el) {
      el.onblur = function() {
        validateField(fieldId);
      };
      el.oninput = function() {
        if (el.classList.contains('input-error')) {
          validateField(fieldId);
        }
      };
    }
  })(fields[i]);
}

    function validateField(fieldId) {
      var el = document.getElementById(fieldId);
      var value = '';
      if (el) {
        value = el.value.trim();
      }
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
    form.onsubmit = function(event) {
      // Valida todos los campos
      var isValid = true;
      for (var j = 0; j < fields.length; j++) {
        var fieldValid = validateField(fields[j]);
        if (!fieldValid) {
          isValid = false;
        }
      }

      if (!isValid) {
        // Hace scroll al primer error visible
        var firstError = form.querySelector('.input-error');
        if (firstError) {
          firstError.focus();
        }
        return false; // cancela envío
      }

      // Si todo está bien, muestra mensaje de éxito y reinicia el formulario
      var successMsg = document.getElementById('success-message');
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth' });
      form.reset();
      return true; // permite envío
    };