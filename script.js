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

    // NAVEGACIÓN 

    btnContinuar.addEventListener('click', () => {
        if (validarPaso1()) {
            paso1.classList.add('d-none-custom');
            paso2.classList.remove('d-none-custom');
        }
    });

    btnAtras.addEventListener('click', () => {
        paso2.classList.add('d-none-custom');
        paso1.classList.remove('d-none-custom');
    });

    // ENVÍO DEL FORMULARIO

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validarPaso2()) {
            alert('¡Registro exitoso! Cumples con todas las políticas de Tapia\'s Store.');
            form.reset(); 
            
            paso2.classList.add('d-none-custom');
            paso1.classList.remove('d-none-custom');
            
            const inputs = form.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        }
    });

    //  FUNCIONES DE VALIDACIÓN 

    function validarPaso1() {
        let isValid = true;

        //  1. Validación Semántica para el Nombre
        const valorNombre = nombre.value.trim();
        const nombreNormalizado = valorNombre.toLowerCase();

        if (valorNombre.length < 3) {
            mostrarError(nombre, true, "El nombre debe tener al menos 3 caracteres.");
            isValid = false;
        } else if (nombreNormalizado === "punta arenas") {
            mostrarError(nombre, true, "El nombre de usuario no puede ser 'Punta Arenas'.");
            isValid = false;
        } else {
            mostrarError(nombre, false);
        }



        // 2. Sintáctica (Formato de correo)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo.value.trim())) {
            mostrarError(correo, true, "Ingresa un correo electrónico válido.");
            isValid = false;
        } else {
            mostrarError(correo, false);
        }

        // 3. Sintáctica: Min 8 chars, 1 mayúscula, 1 número)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
        if (!passwordRegex.test(password.value)) {
            mostrarError(password, true, "Debe tener al menos 8 caracteres, una mayúscula y un número.");
            isValid = false;
        } else {
            mostrarError(password, false);
        }

        // 4. Regla de Negocio (Las contraseñas coinciden)
        if (confirmPassword.value !== password.value || confirmPassword.value.length === 0) {
            mostrarError(confirmPassword, true, "Las contraseñas no coinciden.");
            isValid = false;
        } else {
            mostrarError(confirmPassword, false);
        }

        return isValid;
    }

    function validarPaso2() {
        let isValid = true;

        if (calle.value.trim() === '') {
            mostrarError(calle, true, "Por favor, ingresa tu dirección.");
            isValid = false;
        } else {
            mostrarError(calle, false);
        }

        if (comuna.value.trim() === '') {
            mostrarError(comuna, true, "Ingresa tu comuna.");
            isValid = false;
        } else {
            mostrarError(comuna, false);
        }

        const regionIngresada = region.value.trim().toLowerCase();
        const regionNormalizada = regionIngresada.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        const regionesPermitidas = ["valparaiso", "metropolitana"];

        if (regionIngresada === '') {
            mostrarError(region, true, "Ingresa tu región.");
            isValid = false;
        } else if (!regionesPermitidas.includes(regionNormalizada)) {
            mostrarError(region, true, "Lo sentimos, actualmente solo realizamos envíos a Valparaíso y la Región Metropolitana.");
            isValid = false;
        } else {
            mostrarError(region, false);
        }

        return isValid;
    }



    

    /**
     * @param {HTMLElement} input
     * @param {boolean} isError 
     * @param {string} mensaje 
     */
    function mostrarError(input, isError, mensaje = "") {
        const feedback = input.nextElementSibling; 

        if (isError) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            if (mensaje && feedback) {
                feedback.textContent = mensaje;
            }
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    }
});