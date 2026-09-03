// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    
    // Contenedores de los pasos
    const paso1 = document.getElementById('paso1');
    const paso2 = document.getElementById('paso2');
    
    // Botones de navegación
    const btnContinuar = document.getElementById('btnContinuar');
    const btnAtras = document.getElementById('btnAtras');

    // Elementos del Paso 1
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Elementos del Paso 2
    const calle = document.getElementById('calle');
    const comuna = document.getElementById('comuna');
    const region = document.getElementById('region');

    // --- NAVEGACIÓN ---

    // Botón Continuar (De Paso 1 a Paso 2)
    btnContinuar.addEventListener('click', () => {
        if (validarPaso1()) {
            // Si el paso 1 es válido, ocultamos el 1 y mostramos el 2
            paso1.classList.add('d-none-custom');
            paso2.classList.remove('d-none-custom');
        }
    });

    // Botón Atrás (De Paso 2 a Paso 1)
    btnAtras.addEventListener('click', () => {
        paso2.classList.add('d-none-custom');
        paso1.classList.remove('d-none-custom');
    });

    // --- ENVÍO DEL FORMULARIO ---

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Solo se envía si el Paso 1 y 2 está validado
        if (validarPaso2()) {
            alert('¡Registro exitoso! Datos listos para ser procesados.');
            form.reset(); 
            
            // Retornar al paso 1 visualmente tras limpiar el formulario
            paso2.classList.add('d-none-custom');
            paso1.classList.remove('d-none-custom');
            
            const inputs = form.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        }
    });

    // --- FUNCIONES DE VALIDACIÓN ---

    function validarPaso1() {
        let isValid = true;

        if (nombre.value.trim() === '') {
            mostrarError(nombre, true);
            isValid = false;
        } else {
            mostrarError(nombre, false);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo.value.trim())) {
            mostrarError(correo, true);
            isValid = false;
        } else {
            mostrarError(correo, false);
        }

        if (password.value.length < 6) {
            mostrarError(password, true);
            isValid = false;
        } else {
            mostrarError(password, false);
        }

        if (confirmPassword.value !== password.value || confirmPassword.value.length === 0) {
            mostrarError(confirmPassword, true);
            isValid = false;
        } else {
            mostrarError(confirmPassword, false);
        }

        return isValid;
    }

    function validarPaso2() {
        let isValid = true;

        if (calle.value.trim() === '') {
            mostrarError(calle, true);
            isValid = false;
        } else {
            mostrarError(calle, false);
        }

        if (comuna.value.trim() === '') {
            mostrarError(comuna, true);
            isValid = false;
        } else {
            mostrarError(comuna, false);
        }

        if (region.value.trim() === '') {
            mostrarError(region, true);
            isValid = false;
        } else {
            mostrarError(region, false);
        }

        return isValid;
    }

    /**
     * @param {HTMLElement} input
     * @param {boolean} isError
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