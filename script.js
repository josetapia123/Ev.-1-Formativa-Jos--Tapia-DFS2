// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');

    form.addEventListener('submit', function(event) {
        // Prevenir el envío automático del formulario
        event.preventDefault();
        
        // Bandera para rastrear si el formulario es válido
        let isValid = true;

        // Captura de elementos
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        // 1. Validación del Nombre (No puede estar vacío)
        if (nombre.value.trim() === '') {
            mostrarError(nombre, true);
            isValid = false;
        } else {
            mostrarError(nombre, false);
        }

        // 2. Validación del Correo (Formato válido mediante expresión regular)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo.value.trim())) {
            mostrarError(correo, true);
            isValid = false;
        } else {
            mostrarError(correo, false);
        }

        // 3. Validación de Contraseña (Mínimo 6 caracteres)
        if (password.value.length < 6) {
            mostrarError(password, true);
            isValid = false;
        } else {
            mostrarError(password, false);
        }

        // 4. Validación de Confirmación de Contraseña (Deben coincidir)
        if (confirmPassword.value !== password.value || confirmPassword.value.length === 0) {
            mostrarError(confirmPassword, true);
            isValid = false;
        } else {
            mostrarError(confirmPassword, false);
        }

        // Si todas las validaciones pasan, se puede procesar el registro
        if (isValid) {
            alert('¡Registro exitoso! Datos listos para ser procesados.');
            form.reset(); // Limpia el formulario tras el éxito
            // Aquí podrías integrar un fetch/API call en el futuro
        }
    });

    /**
     * Función auxiliar para agregar o quitar las clases de error visual de Bootstrap
     * @param {HTMLElement} input - El campo de entrada a validar
     * @param {boolean} isError - Determina si se debe mostrar el error
     */
    function mostrarError(input, isError) {
        if (isError) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    }
});